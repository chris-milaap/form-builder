import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Section({ section, updateSection, removeSection }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (section.description) {
      const blocksFromHtml = htmlToDraft(section.description);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [section.description]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const content = state.getCurrentContent();
    const rawContent = convertToRaw(content);
    
    // Convert the raw content to HTML
    const html = draftToHtml(rawContent);
    
    // Update the section with the new HTML content
    updateSection(section.id, 'description', html);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    updateSection(section.id, 'image', file);
  };

  return (
    <Box sx={{
      margin: '20px 0', 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '4px',
      backgroundColor: section.isCTA ? '#f0f0f0' : 'white'
    }}>
      <TextField
        fullWidth
        label="Section Title"
        value={section.title}
        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
        margin="normal"
        disabled={section.isCTA}
      />
      <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', mt: 2, mb: 2 }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
          }}
          editorStyle={{ height: '200px', padding: '0 10px' }}
          readOnly={section.isCTA}
        />
      </Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id={`section-image-upload-${section.id}`}
        type="file"
        onChange={handleImageUpload}
      />
      <label htmlFor={`section-image-upload-${section.id}`}>
        <Button variant="contained" component="span" disabled={section.isCTA}>
          Upload Section Image
        </Button>
      </label>
      {section.image && <p>{section.image.name}</p>}
      {!section.isCTA && (
        <Button variant="outlined" color="secondary" onClick={() => removeSection(section.id)} sx={{ mt: 2, ml: 2 }}>
          Remove Section
        </Button>
      )}
    </Box>
  );
}

export default Section;