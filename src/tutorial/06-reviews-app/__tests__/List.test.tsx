import { render, screen } from '@testing-library/react';
import List from '../List';
import { Review } from '../Sandbox';

const mockReviews: Review[] = [
  {
    email: 'test@test.com',
    rating: '4',
    text: 'Great product',
  },
  {
    email: 'example@example.com',
    rating: '5',
    text: 'Nice surprise!',
  },
];

describe('List Component', () => {
  test('renders heading', () => {
    render(<List reviews={[]} />);
    expect(
      screen.getByRole('heading', { level: 2, name: /reviews/i })
    ).toBeInTheDocument();
  });

  test('display "No reviews yet" when reviews array is empty', () => {
    render(<List reviews={[]} />);
    expect(screen.getByText('No reviews yet')).toBeInTheDocument();
  });

  test('renders reviews correctly when provided', () => {
    render(<List reviews={mockReviews} />);
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      expect(screen.getAllByRole('article')).toHaveLength(2);
    });
  });
});
