import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';

// Mock fetch directly for this component
const mockFetchResponse = {
  success: true,
  data: {
    newsCount: 5,
    teamCount: 10,
    contactCount: 20,
    visitorCount: 1000
  }
};

describe('Admin Dashboard Component', () => {
  beforeEach(() => {
    // Reset and setup the fetch mock
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockFetchResponse)
    });
  });

  test('renders dashboard page', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    // Check if the dashboard content is rendered
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    
    // Check if stats are displayed
    await waitFor(() => {
      const pageContent = document.body.textContent || '';
      expect(pageContent).toMatch(/5/); // News count
      expect(pageContent).toMatch(/10/); // Team count
      expect(pageContent).toMatch(/20/); // Contact count
    });
  });
}); 