import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import NewsManagement from '../../pages/admin/NewsManagement';
import { getNews } from '../../utils/api';

// Mock the API functions
jest.mock('../../utils/api', () => ({
  getNews: jest.fn(),
  createNews: jest.fn(),
  updateNews: jest.fn(),
  deleteNews: jest.fn(),
  toggleNewsActive: jest.fn(),
  toggleNewsFeatured: jest.fn()
}));

describe('NewsManagement Component', () => {
  const mockNews = [
    {
      _id: '1',
      title: 'School Opening Ceremony',
      content: 'Join us for the grand opening ceremony of our new campus.',
      summary: 'Grand opening of new campus',
      type: 'event',
      image: 'event.jpg',
      isActive: true,
      isFeatured: true,
      createdAt: '2023-06-15T10:30:00.000Z',
      updatedAt: '2023-06-15T10:30:00.000Z'
    },
    {
      _id: '2',
      title: 'New Program Launch',
      content: 'We are excited to announce our new finance program.',
      summary: 'Launch of new finance program',
      type: 'news',
      image: 'news.jpg',
      isActive: true,
      isFeatured: false,
      createdAt: '2023-06-16T14:20:00.000Z',
      updatedAt: '2023-06-16T14:20:00.000Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful API responses
    (getNews as jest.Mock).mockResolvedValue(mockNews);
  });

  test('renders news management page and displays news after loading', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <NewsManagement />
        </BrowserRouter>
      );
    });
    
    // Check for loading indicator initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    // Check if the news management UI is displayed
    expect(screen.getByText(/news management/i)).toBeInTheDocument();
    expect(screen.getByText(/add news/i)).toBeInTheDocument();
    
    // Check if the news table is displayed
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    
    // Check if news items are displayed
    expect(screen.getByText('School Opening Ceremony')).toBeInTheDocument();
    expect(screen.getByText('New Program Launch')).toBeInTheDocument();
  });
}); 