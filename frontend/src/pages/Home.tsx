import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Api from "../service/Api";
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
  { name: "Furniture", image: "/images/furniture.png" },
  { name: "Lighting", image: "/images/Light.png" },
  { name: "Decor", image: "/images/decor.png" },
  { name: "Ceramics", image: "/images/cermos.png" },
];

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await Api.get("/products");
        setProducts(response.data.data.user.products ?? []);
      } catch {
        setError("Products load nahi ho paaye. Dobara try karein.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* 1. Hero Section */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl bg-[#e3e2d6] px-6 py-10 sm:px-10 md:grid-cols-2 md:px-12 md:py-14">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
              Thoughtfully found, ready for a new home
            </p>

            <h1 className="max-w-xl text-4xl font-bold leading-tight text-[var(--dark)] sm:text-5xl lg:text-6xl">
              Good things find their next place.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[var(--muted)]">
              Discover unique products from independent sellers and find
              something worth bringing home.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/listings")}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--dark)] hover:shadow-md"
              >
                Explore Listings <span aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/category")}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                Browse Categories
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="https://i.pinimg.com/736x/d6/5b/ff/d65bff75949dd7036348c2e3640a0041.jpg"
              alt="Thoughtfully selected home decor"
              className="h-64 w-full max-w-[430px] rounded-2xl object-cover shadow-sm sm:h-80"
            />
          </div>
        </div>
      </section>

      {/* 2. Shop by Category */}
      <section className="border-y border-[var(--border)] bg-[var(--card)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                Explore
              </p>
              <h2 className="text-3xl font-bold text-[var(--dark)]">
                Shop by category
              </h2>
            </div>

            <NavLink
              to="/category"
              className="hidden text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--primary)] md:inline-flex md:items-center md:gap-1"
            >
              All categories <span aria-hidden="true">→</span>
            </NavLink>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <NavLink
                key={category.name}
                to={`/listings?category=${encodeURIComponent(category.name)}`}
                className="group relative h-48 overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm transition hover:shadow-md"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-colors group-hover:from-black/70" />
                <h3 className="absolute bottom-5 left-5 text-xl font-semibold text-white">
                  {category.name}
                </h3>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                Curated Selection
              </p>
              <h2 className="text-3xl font-bold text-[var(--dark)] md:text-4xl">
                Featured products
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/listings")}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--primary)] inline-flex items-center gap-1"
            >
              View all listings <span aria-hidden="true">→</span>
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--card)]"
                />
              ))}
            </div>
          ) : error ? (
            <p className="rounded-xl border border-[var(--danger)]/20 bg-[var(--danger)]/5 py-8 text-center text-sm text-[var(--danger)]">
              {error}
            </p>
          ) : products.length === 0 ? (
            <p className="rounded-xl border border-[var(--border)] bg-[var(--card)] py-8 text-center text-sm text-[var(--muted)]">
              Abhi koi product available nahi hai.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.slice(0, 8).map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Seller Call to Action */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center sm:p-12 lg:p-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
            Become a Seller
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--dark)] sm:text-4xl">
            Have pieces ready for their next story?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--muted)]">
            List your pre-loved furniture, unique decor, and vintage gems on Morrow in minutes.
          </p>
          <button
            type="button"
            onClick={() => navigate("/listings/add")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--dark)] hover:shadow-md"
          >
            Start Selling Now <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;