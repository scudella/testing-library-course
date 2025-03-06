import { render, screen, logRoles, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sandbox from './Sandbox';

describe('04-user interactions', () => {
  it('should have a count of 0 initially', () => {
    const { container } = render(<Sandbox />);
    screen.debug();
    logRoles(container);

    const count = screen.getByText(/count : 0/i);
    expect(count).toBeInTheDocument();
  });

  it('should increment and decrement count using fireEvent', () => {
    render(<Sandbox />);

    const increaseButton = screen.getByRole('button', { name: /increase/i });
    const decreaseButton = screen.getByRole('button', { name: /decrease/i });
    expect(screen.getByText(/count : 0/i)).toBeInTheDocument();

    fireEvent.click(increaseButton);
    expect(screen.getByText(/count : 1/i)).toBeInTheDocument();

    fireEvent.click(decreaseButton);
    expect(screen.getByText(/count : 0/i)).toBeInTheDocument();
  });

  it('should increment and decrement count using userEvent', async () => {
    render(<Sandbox />);
    const user = userEvent.setup();

    const increaseButton = screen.getByRole('button', { name: /increase/i });
    const decreaseButton = screen.getByRole('button', { name: /decrease/i });
    expect(screen.getByText(/count : 0/i)).toBeInTheDocument();

    await user.click(increaseButton);
    expect(screen.getByText(/count : 1/i)).toBeInTheDocument();

    await user.click(decreaseButton);
    expect(screen.getByText(/count : 0/i)).toBeInTheDocument();
  });

  it('toggles between unlike and like buttons when clicked', async () => {
    render(<Sandbox />);
    const user = userEvent.setup();

    const unlikeButton = screen.getByRole('button', { name: 'unlike button' });
    expect(unlikeButton).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: 'like button' })
    ).not.toBeInTheDocument();

    await user.click(unlikeButton);
    const likeButton = screen.getByRole('button', { name: 'like button' });
    expect(likeButton).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'unlike button' })
    ).not.toBeInTheDocument();
  });
});
