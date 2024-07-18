import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

function Section({ section, updateSection, removeSection, isRemovable }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (section.description) {
      const blocksFromHtml = htmlToDraft(section.description);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }

    if (section.image && typeof section.image === 'object') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(section.image);
    } else if (typeof section.image === 'string') {
      setImagePreview(section.image);
    }
  }, [section.description, section.image]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const content = state.getCurrentContent();
    const rawContent = convertToRaw(content);
    const html = draftToHtml(rawContent);
    updateSection(section.id, 'description', html);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        updateSection(section.id, 'image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    updateSection(section.id, 'image', null);
  };

  return (
    <Box sx={{
      margin: { xs: '15px 0', md: '30px 0' }, 
      padding: { xs: 2, md: 3 }, 
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: '6px',
      backgroundColor: 'background.paper'
    }}>
      <TextField
        fullWidth
        label="Section Title"
        value={section.title}
        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
        margin="normal"
      />

      <Box sx={{ mt: 2, mb: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id={`section-image-upload-${section.id}`}
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor={`section-image-upload-${section.id}`}>
          <CustomButton 
            className="contained" 
            component="span" 
            onClick={() => document.getElementById(`section-image-upload-${section.id}`).click()}
          >
            Upload Section Image
          </CustomButton>
        </label>
        {imagePreview && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <img 
              src={imagePreview} 
              alt="Section preview" 
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} 
            />
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {section.image instanceof File ? section.image.name : 'Uploaded image'}
            </Typography>
            <IconButton onClick={removeImage} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '4px', mt: 2, mb: 2, p: 2 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Section Content</Typography>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
          }}
          editorStyle={{ height: '200px', padding: '10px' }}
        />
      </Box>

      {isRemovable && (
        <CustomButton className="outlined" onClick={() => removeSection(section.id)} sx={{ mt: 2 }}>
          Remove Section
        </CustomButton>
      )}
    </Box>
  );
}

export default Section;