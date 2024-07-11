import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const TOC = ({ sections }) => {
  const handleScroll = (event, index) => {
    event.preventDefault();
    const section = document.getElementById(`section-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Table of Contents
      </Typography>
      <List>
        {sections.map((section, index) => (
          <ListItem button component="a" href={`#section-${index}`} key={section.id} onClick={(event) => handleScroll(event, index)}>
            <ListItemText primary={section.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TOC;
