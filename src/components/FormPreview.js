import React from 'react';
import { Typography, Box, Container, Paper, Grid } from '@mui/material';
import BlogLayout from './BlogLayout';
import BlogHeader from './BlogHeader';
import BlogContent from './BlogContent';
import TOC from './TOC';
import Footer from './Footer';

function FormPreview({ formDetails, sections }) {
  const readingTime = Math.ceil((formDetails.introduction.split(' ').length + 
    sections.reduce((acc, section) => acc + section.description.split(' ').length, 0)) / 200);

  return (
    <BlogLayout>
      <BlogHeader title={formDetails.title} readingTime={readingTime} logo="/logo.png" />
      
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, my: 4 }}>
          <Typography variant="h1" gutterBottom sx={{ 
            fontSize: { xs: '2rem', md: '2.5rem' }, 
            fontWeight: 'bold', 
            textAlign: 'center',
            wordWrap: 'break-word'
          }}>
            {formDetails.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
            By {formDetails.author} • {readingTime} min read
          </Typography>
          
          {formDetails.bannerImagePreview && (
            <Box sx={{ my: 3, borderRadius: 2, overflow: 'hidden', maxHeight: '400px', display: 'flex', justifyContent: 'center' }}>
              <img 
                src={formDetails.bannerImagePreview} 
                alt="Banner" 
                style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }} 
              />
            </Box>
          )}

          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1.2rem', 
              lineHeight: 1.8, 
              mt: 3, 
              mb: 4,
              textAlign: 'left' 
            }} 
            dangerouslySetInnerHTML={{ __html: formDetails.introduction }} 
          />

          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <TOC sections={sections} />
            </Grid>
            <Grid item xs={12} md={9}>
              <BlogContent sections={sections} />
            </Grid>
          </Grid>

          <Box sx={{ width: '100%', mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>Tags:</Typography>
            <Typography variant="body2" sx={{ textAlign: 'left' }}>{formDetails.tags}</Typography>
          </Box>
        </Paper>
      </Container>

      <Footer />
    </BlogLayout>
  );
}

export default FormPreview;