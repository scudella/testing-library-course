import { type Review } from './Sandbox';
import { FaRegStar } from 'react-icons/fa';

type ListProps = {
  reviews: Review[];
};

const List = ({ reviews }: ListProps) => {
  return (
    <div className='mt-8'>
      <h2 className='text-xl font-bold mb-4'>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review, index) => {
          return (
            <article key={index} className='border p-4 mb-4'>
              <div className='font-bold'>{review.email}</div>
              <div className='text-yellow-500 inline-flex'>
                {Array.from({ length: Number(review.rating) }).map(
                  (_, index) => (
                    <FaRegStar key={index} />
                  )
                )}
              </div>
              <p className='mt-2'>{review.text}</p>
            </article>
          );
        })
      )}
    </div>
  );
};
export default List;
