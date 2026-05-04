import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  window.history.pushState({}, '', '/university-timetabling-demo/');
  render(<App />);
  const linkElement = screen.getByText(/Simple Timetable with Simble/i);
  expect(linkElement).toBeInTheDocument();
});
