import React, { useState, useCallback } from 'react';
import { Button, TextField, Container, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Section from './Section';
import FormPreview from './FormPreview';

function FormBuilder() {
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
        <Button onClick={togglePreviewMode} variant="contained" sx={{ mb: 2 }}>
          Back to Edit
        </Button>
        <FormPreview formDetails={formDetails} sections={sections} />
      </Box>
    );
  }

  return (
    <Container component="form" onSubmit={handleSubmit} sx={{ padding: 3, backgroundColor: '#fff', boxShadow: '0 3px 5px rgba(0,0,0,0.1)', borderRadius: '8px', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Form Builder</Typography>
      
      {/* Title */}
      <TextField
        fullWidth
        label="Title"
        margin="normal"
        value={formDetails.title}
        onChange={(e) => handleFormChange('title', e.target.value)}
      />

      {/* Banner Image */}
      <Box sx={{ mt: 2, mb: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="banner-image-upload"
          type="file"
          onChange={handleBannerImageUpload}
        />
        <label htmlFor="banner-image-upload">
          <Button variant="contained" component="span">
            Upload Banner Image
          </Button>
        </label>
        {formDetails.bannerImagePreview && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <img 
              src={formDetails.bannerImagePreview} 
              alt="Banner preview" 
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} 
            />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>{formDetails.bannerImage.name}</Typography>
            <IconButton onClick={removeBannerImage} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Introduction Text */}
      <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', mt: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Introduction</Typography>
        <Editor
          editorState={introductionState}
          onEditorStateChange={handleIntroductionChange}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
          }}
          editorStyle={{ height: '200px', padding: '0 10px' }}
        />
      </Box>

      {/* Tags */}
      <TextField
        fullWidth
        label="Tags"
        margin="normal"
        value={formDetails.tags}
        onChange={(e) => handleFormChange('tags', e.target.value)}
      />

      {/* Sections */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Sections</Typography>
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
      
      <Button onClick={addSection} variant="contained" sx={{ mt: 2 }}>
        Add Section
      </Button>
      <Button onClick={togglePreviewMode} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
        Preview
      </Button>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, ml: 2 }}>
        Publish
      </Button>
    </Container>
  );
}

export default FormBuilder;