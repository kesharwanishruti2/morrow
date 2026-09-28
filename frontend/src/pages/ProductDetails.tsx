import { useState } from "react";
import { useLoaderData } from "react-router";

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: {
    amount: number;
    currency: string;
  };
  stock: number;
  images: string[];
};

const ProductDetails = () => {
  const product = useLoaderData() as Product;

const [selectedImage, setSelectedImage] = useState(
  product.images?.[0]
);

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Product Card */}
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm">

          <div className="grid md:grid-cols-2">

            {/* Image */}
            {/* Images */}
<div className="p-4 md:p-6">

  {/* Main Image */}
  <div className="aspect-square overflow-hidden rounded-2xl bg-[var(--background)]">
    <img
      src={selectedImage}
      alt={product.name}
      className="h-full w-full object-cover"
    />
  </div>

  {/* Thumbnails */}
  <div className="mt-4 grid grid-cols-3 gap-3">
    {product.images.map((image, index) => (
      <button
        key={image}
        onClick={() => setSelectedImage(image)}
        className={`aspect-square overflow-hidden rounded-xl border-2 ${
          selectedImage === image
            ? "border-[var(--primary)]"
            : "border-[var(--border)]"
        }`}
      >
        <img
          src={image}
          alt={`${product.name} ${index + 1}`}
          className="h-full w-full object-cover"
        />
      </button>
    ))}
  </div>

</div>

            {/* Product Information */}
            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12">

              {/* Category */}
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--muted)]">
                {product.category}
              </p>

              {/* Name */}
              <h1 className="mt-3 text-4xl font-semibold capitalize text-[var(--dark)]">
                {product.name}
              </h1>

              {/* Price */}
              <p className="mt-4 text-2xl font-medium text-[var(--primary)]">
                {product.price.currency} {product.price.amount}
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-[var(--border)]" />

              {/* Description */}
              <div>
                <p className="mb-2 text-sm font-medium text-[var(--dark)]">
                  Description
                </p>

                <p className="max-w-lg text-sm leading-7 text-[var(--muted)]">
                  {product.description}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-6">
                {product.stock > 0 ? (
                  <p className="text-sm font-medium text-[var(--success)]">
                    ✓ In Stock — {product.stock} available
                  </p>
                ) : (
                  <p className="text-sm font-medium text-[var(--danger)]">
                    Out of Stock
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                disabled={product.stock === 0}
                className="mt-7 w-full rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[var(--dark)] disabled:cursor-not-allowed disabled:opacity-50 md:w-fit md:min-w-44"
              >
                Add to Cart
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;