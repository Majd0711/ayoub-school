import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/admin/Login';
import { login } from '../../utils/api';

// Mock the API module
jest.mock('../../utils/api', () => ({
  login: jest.fn()
}));

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Admin Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (login as jest.Mock).mockResolvedValue({
      success: true,
      user: { _id: '123', email: 'admin@example.com', name: 'Admin', role: 'admin' }
    });
  });

  test('renders login form', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
    });
    
    // Wait for component to fully render
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    // Check if form title is present
    expect(screen.getByText(/admin|login|connexion/i)).toBeInTheDocument();
    
    // Check if form elements are present - using more reliable selectors
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
    
    const passwordInput = document.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
    
    const loginButton = screen.getByRole('button');
    expect(loginButton).toBeInTheDocument();
  });
}); 