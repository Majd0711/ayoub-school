import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Mock dependencies are already set up in setupTests.ts

describe('Navbar Component', () => {
  test('renders navbar with logo and navigation links', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );
    });
    
    // Wait for component to fully render
    await waitFor(() => {
      expect(document.querySelector('.navbar')).not.toBeNull();
    });
    
    // Check if the brand text is present
    const brandText = await screen.findByText(/HORIZONS SCHOOL/i);
    expect(brandText).toBeInTheDocument();
    
    // Check if navigation links are present using findByText which works better with async
    const accueilLink = await screen.findByText(/accueil/i);
    expect(accueilLink).toBeInTheDocument();
    
    const aboutLink = await screen.findByText(/à propos/i);
    expect(aboutLink).toBeInTheDocument();
    
    const programsLink = await screen.findByText(/programmes/i);
    expect(programsLink).toBeInTheDocument();
    
    const newsLink = await screen.findByText(/actualités/i);
    expect(newsLink).toBeInTheDocument();
    
    const contactLink = await screen.findByText(/contact/i);
    expect(contactLink).toBeInTheDocument();
  });
}); 