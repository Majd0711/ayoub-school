import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';

// Create a mock AuthContext
const mockAuthContext = {
  isAuthenticated: true,
  loading: false,
  user: { _id: '123', name: 'Test User', email: 'test@example.com', role: 'admin' },
  login: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn()
};

// Mock the useAuth hook
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext
}));

// Mock components for testing
const MockDashboard = () => <div>Dashboard Content</div>;

describe('ProtectedRoute Component', () => {
  test('renders children when user is authenticated', () => {
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <MockDashboard />
        </ProtectedRoute>
      </BrowserRouter>
    );

    // Check if the protected content is rendered
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
  });
}); 