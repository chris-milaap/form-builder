import React from 'react';
import { Box, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const TOC = ({ sections }) => {
  const handleScroll = (event, index) => {
    event.preventDefault();
    const section = document.getElementById(`section-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        Table of Contents
      </Typography>
      <List disablePadding>
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            <ListItem 
              button 
              component="a" 
              href={`#section-${index}`} 
              onClick={(event) => handleScroll(event, index)}
              sx={{ 
                py: 1.5,
                '&:hover': { 
                  bgcolor: 'action.hover' 
                } 
              }}
            >
              <ListItemText 
                primary={section.title} 
                primaryTypographyProps={{ 
                  variant: 'body2',
                  fontWeight: 'medium'
                }} 
              />
            </ListItem>
            {index < sections.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default TOC;