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

const MyListings = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this listing?"
  );

  if (!confirmed) return;

  try {
    await Api.delete(`/products/${id}`);

    setProducts((prev) =>
      prev.filter((product) => product._id !== id)
    );
  } catch (error: any) {
    console.log("DELETE ERROR:", error);

    alert(
      error.response?.data?.message ||
        "Failed to delete listing"
    );
  }
};

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* TOPBAR */}
      <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[#FCFAF6] px-10">
        <p className="text-xs text-[var(--muted)]">
          My Space / My Listings
        </p>

        <button
          onClick={() => navigate("/listings/add")}
          className="rounded-full bg-[#29463C] px-6 py-3 text-xs font-medium text-white transition hover:bg-[#20382F]"
        >
          + Add a listing
        </button>
      </header>

      {/* CONTENT */}
      <main className="px-10 py-10">

        <div className="mx-auto max-w-7xl">

          {/* HEADING */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Manage
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#29463C]">
              My Listings
            </h1>

            <p className="mt-3 text-sm text-[var(--muted)]">
              Manage your products and inventory.
            </p>
          </div>
         <p className="p-2"> </p>
          {/* SEARCH */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search listings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm outline-none transition focus:border-[#29463C] md:max-w-md"
            />
          </div>
          <div className="p-2"></div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">

            {/* HEADER */}
            <div className="hidden grid-cols-5 border-b border-[var(--border)] bg-[#FCFAF6] px-6 py-4 text-xs font-medium text-[var(--muted)] md:grid">
              <span>Product</span>
              <span>Category</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Actions</span>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="px-6 py-12 text-center text-sm text-[var(--muted)]">
                Loading listings...
              </div>
            )}

            {/* EMPTY */}
            {!loading && filteredProducts.length === 0 && (
              <div className="px-6 py-14 text-center">
                <h2 className="font-serif text-xl text-[#29463C]">
                  No listings found
                </h2>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  Add your first listing to get started.
                </p>
              </div>
            )}

            {/* PRODUCTS */}
            {!loading &&
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="grid gap-4 border-b border-[var(--border)] px-6 py-5 last:border-b-0 md:grid-cols-5 md:items-center"
                >

                  {/* PRODUCT */}
                  <div>
                    <p className="text-sm font-medium text-[#29463C]">
                      {product.name}
                    </p>
                  </div>

                  {/* CATEGORY */}
                  <div>
                    <span className="text-xs text-[var(--muted)]">
                      {product.category}
                    </span>
                  </div>

                  {/* PRICE */}
                  <div>
                    <span className="text-sm text-[var(--text)]">
                      {product.price.currency === "INR" ? "₹" : product.price.currency}
                      {product.price.amount}
                    </span>
                  </div>

                  {/* STOCK */}
                  <div>
                    <span
                      className={`text-sm ${
                        product.stock === 0
                          ? "text-[var(--danger)]"
                          : "text-[var(--success)]"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        navigate(`/listings/${product._id}/edit`)
                      }
                      className="text-xs font-medium text-[#29463C] hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-xs font-medium text-[var(--danger)] hover:underline"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}
          </div>

        </div>

      </main>
    </div>
  );
};

export default MyListings;