import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import React from 'react';

// Mock Framer Motion since it can be problematic in JSDOM
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { onChange: vi.fn() } }),
  useTransform: () => ({}),
  useSpring: () => ({}),
}));



describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Check for some key text that should be in the App
    // Based on Hero component usually having the main title
    const heroTitle = screen.getByRole('heading', { level: 1 });
    expect(heroTitle).toBeDefined();
  });

  it('contains the Navbar', () => {
    render(<App />);
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeDefined();
  });
});
