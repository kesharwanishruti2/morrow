import { useLoaderData, useSearchParams } from "react-router";
import Card from "../components/Card";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: {
    amount: number;
    currency: string;
  };
  images: string[];
};

const categories = [
  { label: "All", value: "" },
  { label: "Furniture", value: "Furniture" },
  { label: "Lighting", value: "Lighting" },
  { label: "Decor", value: "Decor" },
  { label: "Ceramics", value: "Ceramics" },
];

const Listings = () => {
  const products = useLoaderData() as Product[];
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "";
  const searchValue = searchParams.get("search") ?? "";

  const updateCategory = (category: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (category) {
      nextParams.set("category", category);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams);
  };

  const updateSearch = (search: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (search) {
      nextParams.set("search", search);
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
            Marketplace
          </p>

          <h1 className="mt-2 text-3xl font-medium text-[var(--dark)] sm:text-4xl">
            All Listings
          </h1>
        </header>

        <div className="mb-6">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            placeholder="Search products..."
            value={searchValue}
            onChange={(event) => updateSearch(event.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 sm:max-w-md"
          />
        </div>

        <nav
          aria-label="Filter listings by category"
          className="mb-8 flex flex-wrap gap-2"
        >
          {categories.map((category) => {
            const isActive =
              selectedCategory.toLowerCase() === category.value.toLowerCase();

            return (
              <button
                key={category.value || "all"}
                type="button"
                aria-pressed={isActive}
                onClick={() => updateCategory(category.value)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--primary)]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </nav>

        {products.length === 0 ? (
          <p className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-8 text-center text-[var(--muted)]">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Listings;