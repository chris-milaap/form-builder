import React from 'react';
import { Box, Container } from '@mui/material';

const BlogLayout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {children}
      </Box>
    </Container>
  );
};

export default BlogLayout;
