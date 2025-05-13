import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sandbox from '../Sandbox';
import { getFormElements } from './Form.test';

describe('Reviews App', () => {
  test('Render Reviews App title', () => {
    render(<Sandbox />);
    expect(
      screen.getByRole('heading', { level: 1, name: /reviews app/i })
    ).toBeInTheDocument();
  });

  test('Add a new review when form is submitted', async () => {
    const user = userEvent.setup();
    render(<Sandbox />);
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    await user.type(emailInput, 'test@example.com');
    await user.selectOptions(ratingSelect, '5');
    await user.type(textArea, 'Great Product');
    await user.click(submitButton);

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Great Product')).toBeInTheDocument();
  });

  test('Alternative - Add a new review when form is submitted', async () => {
    const user = userEvent.setup();
    render(<Sandbox />);

    const reviews = screen.queryAllByRole('article');
    expect(reviews).toHaveLength(0);

    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    await user.type(emailInput, 'test@example.com');
    await user.selectOptions(ratingSelect, '5');
    await user.type(textArea, 'Great Product');
    await user.click(submitButton);

    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
});
