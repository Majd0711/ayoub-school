import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

// Mock dependencies are already set up in setupTests.ts

describe('Home Component', () => {
  test('renders home page with hero section', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
    });
    
    // Wait for component to fully render
    await waitFor(() => {
      expect(document.querySelector('.hero-section')).not.toBeNull();
    });
    
    // Check if hero section is present with more flexible text matching
    const heroHeading = await screen.findByRole('heading', { level: 1 });
    expect(heroHeading.textContent).toMatch(/horizons/i);
    
    // Look for any CTA button with more flexible matching
    const ctaButtons = await screen.findAllByRole('link');
    const ctaButton = ctaButtons.find(button => 
      button.textContent?.toLowerCase().includes('découvrir') || 
      button.textContent?.toLowerCase().includes('discover')
    );
    expect(ctaButton).toBeDefined();
  });
}); 