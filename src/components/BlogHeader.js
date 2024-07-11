import React from 'react';
import { Box, Button, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const BlogHeader = ({ title, readingTime }) => {
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px' }} />
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<PhoneIcon />} 
          sx={{ backgroundColor: '#9c3353', '&:hover': { backgroundColor: '#691A47' } }}
        >
          Request a Callback
        </Button>
      </Box>
      <Divider />
    </Box>
  );
};

export default BlogHeader;
