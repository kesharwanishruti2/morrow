import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Api from "../../service/Api";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: {
    amount: number;
    currency: string;
  };
  stock: number;
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await Api.get("/products");

      setProducts(response.data.data.user.products);
    } catch (error) {
      console.log("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.stock > 0
  ).length;

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* TOPBAR */}
      <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[#FCFAF6] px-10">
        <p className="text-xs text-[var(--muted)]">
          My Space / Overview
        </p>

        <button
          onClick={() => navigate("/listings/add")}
          className="rounded-full bg-[#29463C] px-6 py-3 text-xs font-medium text-white transition hover:bg-[#20382F]"
        >
          + Add a listing
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="px-10 py-10">
        <div className="mx-auto max-w-7xl">

          {/* GREETING */}
          <section className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Seller Dashboard
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#29463C]">
              Good morning, Seller
            </h1>

            <p className="mt-3 text-sm text-[var(--muted)]">
              Manage your listings and products from here.
            </p>
          </section>
          <div className="p-2"></div>

          {/* STATS */}
          <section className="mb-12 grid gap-6 md:grid-cols-3">

            {/* MY LISTINGS */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7">
              <p className="text-xs text-[var(--muted)]">
                My Listings
              </p>

              <h2 className="mt-4 font-serif text-4xl text-[#29463C]">
                {loading ? "..." : totalProducts}
              </h2>

              <p className="mt-3 text-xs text-[var(--muted)]">
                Total listings
              </p>
            </div>

            {/* ACTIVE */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7">
              <p className="text-xs text-[var(--muted)]">
                Active
              </p>

              <h2 className="mt-4 font-serif text-4xl text-[#29463C]">
                {loading ? "..." : activeProducts}
              </h2>

              <p className="mt-3 text-xs text-[var(--muted)]">
                Currently available
              </p>
            </div>

            {/* TOTAL PRODUCTS */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7">
              <p className="text-xs text-[var(--muted)]">
                Total Products
              </p>

              <h2 className="mt-4 font-serif text-4xl text-[#29463C]">
                {loading ? "..." : totalProducts}
              </h2>

              <p className="mt-3 text-xs text-[var(--muted)]">
                Products in your space
              </p>
            </div>

          </section>
          <p className="p-2"></p>

          {/* QUICK ACTION */}
          <section className="mb-12">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Quick Action
            </p>
            <p className="p-2"></p>
            <button
              onClick={() => navigate("/listings/add")}
              className="flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[#E9E6D9] px-8 py-7 text-left transition hover:bg-[#E2DFD2]"
            >
              <div>
                <h2 className="font-serif text-xl text-[#29463C]">
                  Add a new listing
                </h2>

                <p className="mt-2 text-xs text-[var(--muted)]">
                  Share a new product with the Morrow community.
                </p>
              </div>

              <span className="text-xl text-[#29463C]">
                →
              </span>
            </button>
          </section>
          <p className="p-2"></p>

          {/* YOUR LISTINGS */}
          <section>

            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#29463C]">
                  Your Listings
                </h2>

                <p className="mt-2 text-xs text-[var(--muted)]">
                  Manage your products.
                </p>
              </div>

              <button
                onClick={() => navigate("/mylistings")}
                className="text-xs font-medium text-[#29463C] transition hover:underline"
              >
                See all →
              </button>
            </div>

            {/* EMPTY STATE */}
            {!loading && products.length === 0 && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-14 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E6EDE5] text-xl text-[#29463C]">
                  +
                </div>

                <h3 className="mt-5 font-serif text-xl text-[#29463C]">
                  No listings yet
                </h3>

                <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-[var(--muted)]">
                  You haven't added any listings yet. Start by creating
                  your first product.
                </p>

                <button
                  onClick={() => navigate("/listings/add")}
                  className="mt-6 rounded-full bg-[#29463C] px-6 py-3 text-xs font-medium text-white transition hover:bg-[#20382F]"
                >
                  + Add your first listing
                </button>

              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-14 text-center">
                <p className="text-sm text-[var(--muted)]">
                  Loading listings...
                </p>
              </div>
            )}
           <p className="p-2"></p>
            {/* PRODUCTS EXIST */}
            {!loading && products.length > 0 && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
                <p className="text-sm text-[var(--muted)]">
                  You currently have{" "}
                  <span className="font-medium text-[#29463C]">
                    {products.length}
                  </span>{" "}
                  listing(s).
                </p>

                <button
                  onClick={() => navigate("/mylistings")}
                  className="mt-4 text-xs font-medium text-[#29463C] hover:underline"
                >
                  Manage your listings →
                </button>
              </div>
            )}

          </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;