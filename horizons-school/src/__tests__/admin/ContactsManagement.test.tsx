import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ContactsManagement from '../../pages/admin/ContactsManagement';
import { getContacts } from '../../utils/api';

// Mock the API functions
jest.mock('../../utils/api', () => ({
  getContacts: jest.fn(),
  getContact: jest.fn(),
  updateContact: jest.fn(),
  deleteContact: jest.fn()
}));

describe('ContactsManagement Component', () => {
  const mockContacts = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      subject: 'Information Request',
      message: 'I need more information about your programs',
      status: 'new',
      isArchived: false,
      createdAt: '2023-06-15T10:30:00.000Z'
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987654321',
      subject: 'Application',
      message: 'I want to apply for the management program',
      status: 'in-progress',
      isArchived: false,
      createdAt: '2023-06-16T14:20:00.000Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful API responses
    (getContacts as jest.Mock).mockResolvedValue({
      data: mockContacts,
      pagination: { page: 1, limit: 10, total: 2 }
    });
  });

  test('renders contact management page', async () => {
    let component: RenderResult;
    
    await act(async () => {
      component = render(<ContactsManagement />);
    });
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    // Check if the page has loaded
    await waitFor(() => {
      const pageContent = document.body.textContent || '';
      expect(pageContent).toMatch(/contact|message/i);
      expect(pageContent).toMatch(/search|recherche/i);
      expect(pageContent).toMatch(/filter|filtre/i);
    });
    
    // Check if contact data is displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });
  });
}); 