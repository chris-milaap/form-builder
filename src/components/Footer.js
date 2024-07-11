import React from 'react';
import { Box, Typography, List, ListItem, Link, Button, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', p: 4, mt: 4 }}>
      <Grid container spacing={4}>
        {/* Left Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Milaap</Typography>
          <List>
            <ListItem disableGutters>
              <Link href="#" underline="none" color="inherit">About us</Link>
            </ListItem>
            <ListItem disableGutters>
              <Link href="#" underline="none" color="inherit">Press and media</Link>
            </ListItem>
            <ListItem disableGutters>
              <Link href="#" underline="none" color="inherit">Team</Link>
            </ListItem>
            <ListItem disableGutters>
              <Link href="#" underline="none" color="inherit">Careers</Link>
            </ListItem>
            <ListItem disableGutters>
              <Link href="#" underline="none" color="inherit">Contact</Link>
            </ListItem>
            <ListItem disableGutters>
              <Link href="#" underline="none" color="inherit">Thank you</Link>
            </ListItem>
            <ListItem disableGutters>
              <Link href="#" underline="none" color="inherit">Resources</Link>
            </ListItem>
          </List>
        </Grid>

        {/* Middle Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Indian office address</Typography>
          <Typography variant="body2" color="textSecondary">
            Milaap Social Ventures India Pvt. Ltd.
            <br />
            Nextcoworks JP Nagar - Coworking Space
            <br />
            JP Nagar Aahankar Plaza, Bk circle, Nayak Layout, 8th Phase, J. P. Nagar,
            <br />
            Bangalore, Karnataka, India 560078
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Supported by</Typography>
          <img src="https://www.visa.com/images/merchant/logos/visa_mastercard_logo.jpg" alt="Supported by" style={{ maxWidth: '100px' }} />
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <Button variant="contained" sx={{ mb: 2, backgroundColor: '#9c3353', '&:hover': { backgroundColor: '#7a2941' } }}>
            Start a fundraiser
          </Button>
          <Box sx={{ mb: 2 }}>
            <Link href="#" underline="none" color="inherit" sx={{ mr: 2 }}>Pricing</Link>
            <Link href="#" underline="none" color="inherit" sx={{ mr: 2 }}>Reviews</Link>
            <Link href="#" underline="none" color="inherit">FAQs and tips</Link>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary">Find us on</Typography>
            <IconButton color="inherit" href="#"><FacebookIcon /></IconButton>
            <IconButton color="inherit" href="#"><TwitterIcon /></IconButton>
            <IconButton color="inherit" href="#"><LinkedInIcon /></IconButton>
            <IconButton color="inherit" href="#"><YouTubeIcon /></IconButton>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>Set up, manage and promote your fundraiser with Milaap app</Typography>
            <Link href="#" underline="none">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ maxWidth: '150px', marginRight: '10px' }} />
            </Link>
            <Link href="#" underline="none">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Available_on_the_App_Store_%28black%29.png" alt="App Store" style={{ maxWidth: '150px' }} />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
