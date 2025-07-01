// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock fetch API globally
global.fetch = jest.fn().mockImplementation(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({})
  })
);

// Mock window.confirm
window.confirm = jest.fn().mockImplementation(() => true);

// Mock window.alert
window.alert = jest.fn();

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  init: jest.fn(),
  send: jest.fn().mockResolvedValue({ status: 200, text: 'OK' }),
}));

// Mock AOS
jest.mock('aos', () => ({
  init: jest.fn(),
  refresh: jest.fn(),
}));

// Mock the API module
jest.mock('./utils/api', () => ({
  getContacts: jest.fn().mockResolvedValue({
    data: [],
    pagination: { page: 1, limit: 10, total: 0 }
  }),
  getContact: jest.fn().mockResolvedValue({}),
  updateContact: jest.fn().mockResolvedValue({}),
  deleteContact: jest.fn().mockResolvedValue({ success: true }),
  sendContactForm: jest.fn().mockResolvedValue({ success: true }),
  login: jest.fn().mockResolvedValue({ success: true }),
  logout: jest.fn().mockResolvedValue({ success: true }),
  getCurrentUser: jest.fn().mockResolvedValue(null),
  getPrograms: jest.fn().mockResolvedValue([]),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: function MockDiv(props) { return props.children || null; },
    section: function MockSection(props) { return props.children || null; },
    h1: function MockH1(props) { return props.children || null; },
    p: function MockP(props) { return props.children || null; },
    span: function MockSpan(props) { return props.children || null; },
    img: function MockImg() { return null; },
  },
  useScroll: () => ({ scrollYProgress: { onChange: jest.fn() } }),
  useTransform: jest.fn(),
  AnimatePresence: function MockAnimatePresence(props) { return props.children || null; },
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
}));
