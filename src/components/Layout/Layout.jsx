// src/components/layout/Layout.jsx
import React from 'react';
import { Box } from '@mui/material';
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

      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center', // center horizontally
          alignItems: 'center', // center vertically
          py: 4,
          px: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '900px', // 🔧 
            backgroundColor: 'white',
            borderRadius: 3,
            boxShadow: 2,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // centers content inside
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
