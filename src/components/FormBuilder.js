import React, { useState, useCallback } from 'react';
import { TextField, Container, Box, Typography, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Section from './Section';
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
    title: '',
    tags: '',
    introduction: '',
    bannerImage: null,
    bannerImagePreview: null
  });
  const [sections, setSections] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [introductionState, setIntroductionState] = useState(EditorState.createEmpty());

  const handleFormChange = (field, value) => {
    setFormDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleIntroductionChange = (state) => {
    setIntroductionState(state);
    handleFormChange('introduction', draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  const handleBannerImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormDetails(prev => ({ 
          ...prev, 
          bannerImage: file,
          bannerImagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBannerImage = () => {
    setFormDetails(prev => ({
      ...prev,
      bannerImage: null,
      bannerImagePreview: null
    }));
  };

  const addSection = useCallback(() => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: '',
      description: '',
      image: null
    };
    setSections(prev => [...prev, newSection]);
  }, []);

  const updateSection = useCallback((id, field, value) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  }, []);

  const removeSection = useCallback(id => {
    setSections(prev => prev.filter(section => section.id !== id));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Details:', formDetails);
    console.log('Sections:', sections);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  if (isPreviewMode) {
    return (
      <Box>
        <CustomButton className="contained" onClick={togglePreviewMode} sx={{ mb: 2 }}>
          Back to Edit
        </CustomButton>
        <FormPreview formDetails={formDetails} sections={sections} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" component="form" onSubmit={handleSubmit} sx={{ 
      padding: { xs: 2, md: 3 }, 
      backgroundColor: 'background.paper', 
      boxShadow: '0 3px 5px rgba(0,0,0,0.1)', 
      borderRadius: '8px', 
      mt: { xs: 2, md: 4 } 
    }}>
      <Typography variant="h2" gutterBottom>Form Builder</Typography>
      <Typography variant="h4" gutterBottom>Welcome, {author}!</Typography>
      
      <TextField
        fullWidth
        label="Title"
        margin="normal"
        value={formDetails.title}
        onChange={(e) => handleFormChange('title', e.target.value)}
      />

      <Box sx={{ mt: 2, mb: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="banner-image-upload"
          type="file"
          onChange={handleBannerImageUpload}
        />
        <label htmlFor="banner-image-upload">
          <CustomButton className="contained" component="span" onClick={() => document.getElementById('banner-image-upload').click()}>
            Upload Banner Image
          </CustomButton>
        </label>
        {formDetails.bannerImagePreview && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <img 
              src={formDetails.bannerImagePreview} 
              alt="Banner preview" 
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} 
            />
            <Typography variant="body1" sx={{ flexGrow: 1 }}>{formDetails.bannerImage.name}</Typography>
            <IconButton onClick={removeBannerImage} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </Box>

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

      <TextField
        fullWidth
        label="Tags"
        margin="normal"
        value={formDetails.tags}
        onChange={(e) => handleFormChange('tags', e.target.value)}
      />

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
        <CustomButton className="contained" onClick={addSection}>
          Add Section
        </CustomButton>
        <CustomButton className="outlined" onClick={togglePreviewMode}>
          Preview
        </CustomButton>
        <CustomButton className="contained" type="submit">
          Publish
        </CustomButton>
      </Box>
    </Container>
  );
}

export default FormBuilder;