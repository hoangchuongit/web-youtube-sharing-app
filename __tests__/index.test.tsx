import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: 'Youtube sharing',
    });

    expect(heading).toBeInTheDocument();
  });
});

