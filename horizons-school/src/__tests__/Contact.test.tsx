import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Contact from '../pages/Contact';

// Mock dependencies
jest.mock('@emailjs/browser', () => ({
  init: jest.fn(),
  send: jest.fn().mockResolvedValue({ status: 200, text: 'OK' }),
}));

jest.mock('../utils/api', () => ({
  sendContactForm: jest.fn().mockResolvedValue({ success: true }),
}));

// Mock AOS to avoid animation-related issues
jest.mock('aos', () => ({
  init: jest.fn(),
  refresh: jest.fn(),
}));

describe('Contact Component', () => {
  test('renders contact page with form', async () => {
    let component: RenderResult;
    
    await act(async () => {
      component = render(<Contact />);
    });
    
    // Wait for component to fully render
    await waitFor(() => {
      expect(document.querySelector('.contact-page')).not.toBeNull();
    });
    
    // Check if page title is present with more flexible matching
    expect(screen.getByText(/contactez/i)).toBeInTheDocument();
    
    // Check if contact information section is present
    const coordonneesHeading = screen.getByRole('heading', { name: /coordonnées/i });
    expect(coordonneesHeading).toBeInTheDocument();
    
    // Check if form section is present
    const formHeading = screen.getByRole('heading', { name: /envoyez.*message/i });
    expect(formHeading).toBeInTheDocument();
    
    // Check if map section is present
    const mapHeading = screen.getByRole('heading', { name: /emplacement/i });
    expect(mapHeading).toBeInTheDocument();
  });
}); 