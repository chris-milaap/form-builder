import React from 'react';
import { Container, Box, Typography, TextField, Grid, Card, CardContent, CardMedia, Radio, RadioGroup, FormControlLabel, Button, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CustomButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  borderRadius: '25px',
  textTransform: 'none',
  fontWeight: 'bold',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
  },
}));

const placeholderBanners = [
  { id: 'banner1', name: 'Banner 1', image: 'https://via.placeholder.com/800x200?text=Banner+1' },
  { id: 'banner2', name: 'Banner 2', image: 'https://via.placeholder.com/800x200?text=Banner+2' },
  { id: 'banner3', name: 'Banner 3', image: 'https://via.placeholder.com/800x200?text=Banner+3' },
];

const placeholderForms = [
  { id: 'form1', name: 'Form 1', image: 'https://via.placeholder.com/300x200?text=Form+1' },
  { id: 'form2', name: 'Form 2', image: 'https://via.placeholder.com/300x200?text=Form+2' },
  { id: 'form3', name: 'Form 3', image: 'https://via.placeholder.com/300x200?text=Form+3' },
];

function FormBannerSelection({ formDetails, setFormDetails, onNext, onBack }) {
  const handleInputChange = (field) => (event) => {
    setFormDetails(prev => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <CustomButton startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mr: 2 }}>
          Back to Editor
        </CustomButton>
        <Typography variant="h2">Blog Configuration</Typography>
      </Box>
      
      {/* Banner Selection */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>Select Banner</Typography>
        <RadioGroup
          aria-label="banner-selection"
          name="banner-selection"
          value={formDetails.selectedBanner}
          onChange={handleInputChange('selectedBanner')}
        >
          <Grid container spacing={2}>
            {placeholderBanners.map((banner) => (
              <Grid item xs={12} key={banner.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="100"
                    image={banner.image}
                    alt={banner.name}
                  />
                  <CardContent>
                    <FormControlLabel
                      value={banner.id}
                      control={<Radio />}
                      label={banner.name}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </Box>

      {/* Banner Details */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>Banner Details</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={formDetails.bannerCopy}
          onChange={handleInputChange('bannerCopy')}
          placeholder="Enter your banner copy here"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          value={formDetails.ctaText}
          onChange={handleInputChange('ctaText')}
          placeholder="Enter your call-to-action text here"
        />
      </Box>

      {/* Form Selection */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>Select Form</Typography>
        <RadioGroup
          aria-label="form-selection"
          name="form-selection"
          value={formDetails.selectedForm}
          onChange={handleInputChange('selectedForm')}
        >
          <Grid container spacing={2}>
            {placeholderForms.map((form) => (
              <Grid item xs={12} sm={4} key={form.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={form.image}
                    alt={form.name}
                  />
                  <CardContent>
                    <FormControlLabel
                      value={form.id}
                      control={<Radio />}
                      label={form.name}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </Box>

      {/* Blog Metadata */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>Blog Metadata</Typography>
        <TextField
          fullWidth
          label="Blog Title"
          value={formDetails.blogTitle}
          onChange={handleInputChange('blogTitle')}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Author"
          value={formDetails.author}
          onChange={handleInputChange('author')}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Publication Date"
          type="date"
          value={formDetails.publicationDate}
          onChange={handleInputChange('publicationDate')}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Tags"
          value={formDetails.tags}
          onChange={handleInputChange('tags')}
          placeholder="Enter tags separated by commas"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Blog Description"
          value={formDetails.blogDescription}
          onChange={handleInputChange('blogDescription')}
          placeholder="Enter a short description of your blog"
        />
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CustomButton variant="outlined" onClick={onBack} startIcon={<ArrowBackIcon />}>
          Back
        </CustomButton>
        <CustomButton variant="contained" onClick={onNext}>
          Next
        </CustomButton>
      </Box>
    </Container>
  );
}

export default FormBannerSelection;