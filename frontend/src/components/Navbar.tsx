
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

  const categoryLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full border px-4 py-2 text-sm transition-colors ${
      isActive
        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
        : "border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--primary)]"
    }`;

  return (
    <main className="min-h-screen bg-[var(--background)]">

      {/* Hero */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl bg-[#e3e2d6] px-6 py-10 sm:px-10 md:grid-cols-2 md:px-12 md:py-14">

          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
              Thoughtfully found, ready for a new home
            </p>

            <h1 className="max-w-xl text-4xl leading-tight text-[var(--dark)] sm:text-5xl lg:text-6xl">
              Good things find their next place.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[var(--muted)]">
              Discover unique products from independent sellers and find
              something worth bringing home.
            </p>

            <button
              type="button"
              onClick={() => navigate("/listings")}
              className="mt-8 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Explore Listings{" "}
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="https://i.pinimg.com/736x/d6/5b/ff/d65bff75949dd7036348c2e3640a0041.jpg"
              alt="Thoughtfully selected home decor"
              className="h-64 w-full max-w-[430px] rounded-2xl object-cover sm:h-72"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                Featured
              </p>

              <h2 className="text-3xl text-[var(--dark)] md:text-4xl">
                Find your next favourite
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/listings")}
              className="hidden text-sm text-[var(--muted)] transition-colors hover:text-[var(--primary)] md:block"
            >
              View all listings{" "}
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {loading ? (
            <p className="py-8 text-[var(--muted)]">
              Loading products…
            </p>
          ) : error ? (
            <p className="py-8 text-[var(--danger)]">
              {error}
            </p>
          ) : products.length === 0 ? (
            <p className="py-8 text-[var(--muted)]">
              Abhi koi product available nahi hai.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <Card
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-[var(--border)] bg-[var(--card)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Explore
            </p>

            <h2 className="text-3xl text-[var(--dark)]">
              Shop by category
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <NavLink
                key={category.name}
                to={`/listings?category=${encodeURIComponent(
                  category.name
                )}`}
                className="group relative h-48 overflow-hidden rounded-2xl border border-[var(--border)]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />

                <h3 className="absolute bottom-5 left-5 text-xl font-medium text-white">
                  {category.name}
                </h3>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Listings */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-6">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Browse
            </p>

            <h2 className="text-3xl text-[var(--dark)]">
              Browse all listings
            </h2>
          </div>

          <nav
            aria-label="Filter listings by category"
            className="mb-8 flex flex-wrap gap-2"
          >
            {["All", "Furniture", "Lighting", "Decor"].map((category) => (
              <NavLink
                key={category}
                to={
                  category === "All"
                    ? "/listings"
                    : `/listings?category=${encodeURIComponent(category)}`
                }
                end={category === "All"}
                className={categoryLinkClass}
              >
                {category}
              </NavLink>
            ))}
          </nav>

          {loading ? (
            <p className="py-8 text-[var(--muted)]">
              Loading products…
            </p>
          ) : error ? (
            <p className="py-8 text-[var(--danger)]">
              {error}
            </p>
          ) : products.length === 0 ? (
            <p className="py-8 text-[var(--muted)]">
              Abhi koi product available nahi hai.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Card
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
};

export default Home;
