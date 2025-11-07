// src/components/layout/Layout.jsx
import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f7f8fa',
      }}
    >
      <Navbar />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flex: 1,
          py: 6,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          {children}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
