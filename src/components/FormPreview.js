import React from 'react';
import { Typography, Box, Paper, Button } from '@mui/material';
import BlogLayout from './BlogLayout';
import BlogHeader from './BlogHeader';
import BlogContent from './BlogContent';
import TOC from './TOC';
import Footer from './Footer';

function FormPreview({ formDetails, sections }) {
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const totalContent = `${formDetails.title} ${formDetails.introduction} ${sections.map(s => `${s.title} ${s.description}`).join(' ')}`;
  const readingTime = calculateReadingTime(totalContent);

  return (
    <>
      <BlogLayout>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ flex: 1, pr: 2 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%' }}>
              <BlogHeader title={formDetails.title} readingTime={readingTime} />
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 1, wordWrap: 'break-word' }}>
                  {formDetails.title}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom color="textSecondary">
                  {readingTime} min read
                </Typography>
              </Box>
              {formDetails.bannerImage && (
                <Box sx={{ my: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <img 
                    src={URL.createObjectURL(formDetails.bannerImage)} 
                    alt="Banner" 
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      objectFit: 'contain', 
                      maxHeight: '500px' 
                    }} 
                  />
                </Box>
              )}
              <TOC sections={sections} />
              <BlogContent introduction={formDetails.introduction} sections={sections} />
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button variant="contained" sx={{ backgroundColor: '#9c3353', '&:hover': { backgroundColor: '#7a2941' } }}>
                  Start a fundraiser
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </BlogLayout>
      <Footer />
    </>
  );
}

export default FormPreview;
