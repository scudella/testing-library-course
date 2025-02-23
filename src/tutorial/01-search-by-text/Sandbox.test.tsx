import { render, screen } from '@testing-library/react';
import Sandbox from './Sandbox';

describe('01-search-by-text', () => {
  it('demonstrates different query methods', async () => {
    render(<Sandbox />);
    screen.debug();

    const heading = screen.getByText('React Testing Library Examples');

    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();

    const phoneRegEx = /\d{3}-\d{3}-\d{4}/;
    const phoneText = screen.getByText(phoneRegEx);
    expect(phoneText).toBeInTheDocument();

    const errorMessage = screen.queryByText('Error Message');
    expect(errorMessage).not.toBeInTheDocument();

    const items = screen.getAllByText('Item 1');
    expect(items).toHaveLength(4);

    const asyncMessage = await screen.findByText('Async message');
    expect(asyncMessage).toBeInTheDocument();
  });
});
