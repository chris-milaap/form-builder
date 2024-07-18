import React from 'react';
import { Box, Divider, styled } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

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
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

const BlogHeader = ({ title, readingTime, logo }) => {
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <img src={logo} alt="Logo" style={{ height: '40px' }} />
        <CustomButton 
          className="contained"
          startIcon={<PhoneIcon />}
          sx={{ backgroundColor: '#9c3353', '&:hover': { backgroundColor: '#691A47' } }}
        >
          Request a Callback
        </CustomButton>
      </Box>
      <Divider />
    </Box>
  );
};

export default BlogHeader;