import { NavLink } from 'react-router';

type CardProps = {
     product: {
    _id:string
    name: string;
    category: string;
    price: {
      amount: number;
      currency: string;
    };
    images: string[];
  };
}

const Card = ({product}: CardProps) => {
  return (
  <div className='overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition hover:-translate-y-1 hover:shadow-md'>
   <div className='aspect-[4/3] overflow-hidden bg-[var(--background)]'>
   <img src={product.images[0]} alt="product.name" />
   </div>
   <div className='p-5'>

      <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          {product.category}
        </p>

      <h3 className="mt-2 truncate text-lg font-medium text-[var(--dark)]">
          {product.name}
        </h3>
       <p className="mt-3 text-base font-semibold text-[var(--dark)]">
          {product.price.currency} {product.price.amount}
        </p>
    <NavLink
          to={`/listings/${product._id}`}
          className="mt-4 inline-block text-sm font-medium text-[var(--primary)] transition hover:text-[var(--terracotta)]"
        >
          View Details →
        </NavLink>

      </div>
  </div>
  )
}

export default Card