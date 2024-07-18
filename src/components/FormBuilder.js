import React, { useState, useCallback, useEffect } from 'react';
import { TextField, Container, Box, Typography, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Section from './Section';
import FormBannerSelection from './FormBannerSelection';
import FormPreview from './FormPreview';

const CustomButton = styled('button')(({ theme }) => ({
  padding: '10px 20px',
  borderRadius: '25px',
  border: 'none',
  textTransform: 'none',
  fontWeight: 'bold',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
  },
  '&.contained': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&.outlined': {
    backgroundColor: 'transparent',
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(156, 51, 83, 0.04)',
    },
  },
}));

function FormBuilder({ author }) {
  const [formDetails, setFormDetails] = useState({
    blogTitle: '',
    author: author,
    publicationDate: '',
    tags: '',
    blogDescription: '',
    selectedBanner: '',
    bannerCopy: '',
    ctaText: '',
    selectedForm: '',
    introduction: '',
  });
  const [sections, setSections] = useState([]);
  const [introductionState, setIntroductionState] = useState(EditorState.createEmpty());
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Add the initial mandatory section when the component mounts
    if (sections.length === 0) {
      addSection();
    }
  }, []);

  const handleFormChange = (field, value) => {
    setFormDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleIntroductionChange = (state) => {
    setIntroductionState(state);
    handleFormChange('introduction', draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  const addSection = useCallback((e) => {
    // Prevent default form submission
    if (e) e.preventDefault();
    
    const newSection = {
      id: `section-${Date.now()}`,
      title: '',
      description: '',
      image: null
    };
    setSections(prevSections => [...prevSections, newSection]);
  }, []);

  const updateSection = useCallback((id, field, value) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  }, []);

  const removeSection = useCallback(id => {
    setSections(prev => {
      if (prev.length > 1) {
        return prev.filter(section => section.id !== id);
      }
      return prev; // Don't remove if it's the last section
    });
  }, []);

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;

    setSections(prev => {
      const items = Array.from(prev);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      return items;
    });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    // Logic to save the form data
    console.log('Form Details:', formDetails);
    console.log('Sections:', sections);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  if (currentStep === 2) {
    return <FormBannerSelection 
      formDetails={formDetails} 
      setFormDetails={setFormDetails} 
      onNext={handleNext}
      onBack={handleBack}
    />;
  }

  if (currentStep === 3) {
    return <FormPreview formDetails={formDetails} sections={sections} />;
  }

  return (
    <Container maxWidth="lg">
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{ 
          padding: { xs: 2, md: 3 }, 
          backgroundColor: 'background.paper', 
          boxShadow: '0 3px 5px rgba(0,0,0,0.1)', 
          borderRadius: '8px', 
          mt: { xs: 2, md: 4 } 
        }}
      >
        <Typography variant="h2" gutterBottom>Blog Content Builder</Typography>
        <Typography variant="h4" gutterBottom>Welcome, {author}!</Typography>
        
        <TextField
          fullWidth
          label="Blog Title"
          margin="normal"
          value={formDetails.blogTitle}
          onChange={(e) => handleFormChange('blogTitle', e.target.value)}
        />

        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '4px', mt: 2, mb: 2, p: 2 }}>
          <Typography variant="h4" sx={{ mb: 1 }}>Introduction</Typography>
          <Editor
            editorState={introductionState}
            onEditorStateChange={handleIntroductionChange}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
            }}
            editorStyle={{ height: '200px', padding: '10px' }}
          />
        </Box>

        <Typography variant="h3" sx={{ mt: { xs: 3, md: 4 }, mb: 2 }}>Sections</Typography>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Section
                          key={section.id}
                          section={section}
                          updateSection={updateSection}
                          removeSection={removeSection}
                          isRemovable={sections.length > 1}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <CustomButton type="button" className="contained" onClick={addSection}>
            Add Section
          </CustomButton>
          <CustomButton type="button" className="outlined" onClick={handleSave}>
            Save
          </CustomButton>
          <CustomButton type="button" className="contained" onClick={handleNext}>
            Next
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
}

export default FormBuilder;