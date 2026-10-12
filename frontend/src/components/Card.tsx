import { NavLink } from "react-router";

type CardProps = {
  product: {
    _id: string;
    name: string;
    category: string;
    price: {
      amount: number;
      currency: string;
    };
    images: string[];
  };
};

const Card = ({ product }: CardProps) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--background)]">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {product.category}
          </p>

          <h3 className="mt-2 line-clamp-1 text-lg font-medium text-[var(--dark)]" title={product.name}>
            {product.name}
          </h3>

          <p className="mt-2 text-base font-bold text-[var(--dark)]">
            {product.price.currency} {product.price.amount}
          </p>
        </div>

        <NavLink
          to={`/listings/${product._id}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--terracotta)]"
        >
          View Details <span aria-hidden="true">→</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Card;