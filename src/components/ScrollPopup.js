import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const ScrollPopup = () => {
  const [open, setOpen] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight * 1.5; // Adjust the trigger height as needed
      if (!triggered && window.scrollY > triggerHeight) {
        setOpen(true);
        setTriggered(true);
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
    }, 500); // Delay adding the event listener by 500ms

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggered]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Request a Callback</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" required margin="normal" />
          <TextField fullWidth label="Email" name="email" type="email" required margin="normal" />
          <TextField fullWidth label="Phone" name="phone" required margin="normal" />
          <TextField fullWidth label="Message" name="message" multiline rows={4} margin="normal" />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScrollPopup;
