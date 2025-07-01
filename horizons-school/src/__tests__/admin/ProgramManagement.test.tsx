import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import ProgramManagement from '../../pages/admin/ProgramManagement';
import { getPrograms } from '../../utils/api';

// Mock the API functions
jest.mock('../../utils/api', () => ({
  getPrograms: jest.fn(),
  createProgram: jest.fn(),
  updateProgram: jest.fn(),
  deleteProgram: jest.fn()
}));

describe('ProgramManagement Component', () => {
  const mockPrograms = [
    {
      _id: '1',
      title: 'Management Program',
      description: 'Learn management skills',
      category: 'Management',
      duration: '2 years',
      level: 'Bac+3',
      image: 'management.jpg',
      isActive: true,
      isFeatured: true,
      createdAt: '2023-06-15T10:30:00.000Z',
      updatedAt: '2023-06-15T10:30:00.000Z'
    },
    {
      _id: '2',
      title: 'Finance Program',
      description: 'Learn finance skills',
      category: 'Finance',
      duration: '1 year',
      level: 'Bac+4',
      image: 'finance.jpg',
      isActive: true,
      isFeatured: false,
      createdAt: '2023-06-16T14:20:00.000Z',
      updatedAt: '2023-06-16T14:20:00.000Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful API responses
    (getPrograms as jest.Mock).mockResolvedValue(mockPrograms);
  });

  test('renders program management page and displays programs after loading', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <ProgramManagement />
        </BrowserRouter>
      );
    });
    
    // Check for loading indicator initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    // Check if the program management UI is displayed
    expect(screen.getByText(/program management/i)).toBeInTheDocument();
    expect(screen.getByText(/add program/i)).toBeInTheDocument();
    
    // Check if the program table is displayed
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    
    // Check if program items are displayed
    expect(screen.getByText('Management Program')).toBeInTheDocument();
    expect(screen.getByText('Finance Program')).toBeInTheDocument();
  });
}); 