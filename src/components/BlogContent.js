import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const BlogContent = ({ introduction, sections }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="body1" 
        paragraph 
        sx={{ 
          fontSize: '1.2rem', 
          lineHeight: 1.8, 
          wordWrap: 'break-word', 
          textAlign: 'left' 
        }} 
        dangerouslySetInnerHTML={{ __html: introduction }} 
      />
      <Divider sx={{ my: 4 }} />
      {sections.map((section, index) => (
        <Box key={section.id} id={`section-${index}`} sx={{ mb: 4 }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: 2, 
              wordWrap: 'break-word', 
              textAlign: 'left',
              fontSize: '2rem' // Adjusted for consistency
            }}
          >
            {section.title}
          </Typography>
          {section.image && (
            <Box sx={{ my: 3, borderRadius: 2, overflow: 'hidden' }}>
              <img 
                src={URL.createObjectURL(section.image)} 
                alt={`Section ${index + 1}`} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  objectFit: 'contain', 
                  maxHeight: '300px' 
                }} 
              />
            </Box>
          )}
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1.2rem', // Adjusted for consistency
              lineHeight: 1.8, 
              wordWrap: 'break-word',
              textAlign: 'left', 
              '& img': { maxWidth: '100%', height: 'auto' } 
            }} 
            dangerouslySetInnerHTML={{ __html: section.description }} 
          />
        </Box>
      ))}
    </Box>
  );
};

export default BlogContent;
