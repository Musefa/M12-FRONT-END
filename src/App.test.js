import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter

describe('HomePage', () => {
  test('renders HomePage component', () => {
    render(<HomePage />);

    const title = screen.getByText(/Gestió de reunions/i);
    expect(title).toBeInTheDocument();

    const image = screen.getByAltText(/Home/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('kellogsFPD.jpg');
  });
});

describe('Header', () => {
  test('renders Header', () => {
    render(
      <UserProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </UserProvider>
    );

    const loginText = screen.getByText(/Iniciar sessió/i);
    expect(loginText).toBeInTheDocument();

    const image = screen.getByAltText(/Home/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('bannerVidal.png');
  });
});
