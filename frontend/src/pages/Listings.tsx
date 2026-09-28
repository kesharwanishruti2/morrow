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

  const selectedCategory = searchParams.get("category") || "";

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            Marketplace
          </p>

          <h1 className="mt-2 text-4xl font-medium text-[var(--dark)]">
            All Listings
          </h1>
        </div>

        {/* SEARCH */}
     <input
  type="text"
  placeholder="Search products..."
  value={searchParams.get("search") || ""}
  onChange={(e) => {
    const search = e.target.value;

    const params: Record<string, string> = {};

    const category = searchParams.get("category");

    if (category) {
      params.category = category;
    }

    if (search) {
      params.search = search;
    }

    setSearchParams(params);
  }}
  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)] md:max-w-md"
/>
 <p className="p-2"></p>
        {/* CATEGORY BUTTONS */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive =
              selectedCategory === category.value;

            return (
              <button
                key={category.label}
                onClick={() => {
                  if (category.value === "") {
                    setSearchParams({});
                  } else {
                    setSearchParams({
                      category: category.value,
                    });
                  }
                }}
                className={`rounded-full border px-5 py-2 text-sm transition ${
                  isActive
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--primary)]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
<p className="p-2"></p>
        {/* PRODUCTS */}
        {products.length === 0 ? (
          <p className="text-[var(--muted)]">
            No products found.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Card
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default Listings;