import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Api from "../../service/Api";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [stock, setStock] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Api.get(`/products/${id}`);

        const product = response.data.data.product;

        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(String(product.price.amount));
        setCurrency(product.price.currency);
        setStock(String(product.stock));
      } catch (error: any) {
        console.log("FETCH PRODUCT ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load listing"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setError("");

  try {
    const data = {
      name,
      description,
      category,
      price: {
        amount: Number(price),
        currency,
      },
      stock: Number(stock),
    };

    await Api.put(`/products/${id}`, data);

    navigate("/mylistings");
  } catch (error: any) {
    console.log("UPDATE LISTING ERROR:", error);
    console.log("BACKEND RESPONSE:", error.response?.data);

    setError(
      error.response?.data?.message ||
        "Failed to update listing"
    );
  }
};

  if (loading) {
    return (
      <div className="p-10 text-sm text-[var(--muted)]">
        Loading listing...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="flex h-16 items-center border-b border-[var(--border)] bg-[#FCFAF6] px-10">
        <p className="text-xs text-[var(--muted)]">
          My Space / Edit Listing
        </p>
      </header>

      <main className="px-10 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Manage
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#29463C]">
              Edit Listing
            </h1>

            <p className="mt-3 text-sm text-[var(--muted)]">
              Update your listing information.
            </p>
          </div>

          {error && (
            <p className="mb-5 rounded-xl bg-[#FCE8E6] px-4 py-3 text-sm text-[var(--danger)]">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none"
              >
                <option value="">Select category</option>
                <option value="furniture">Furniture</option>
                <option value="lighting">Lighting</option>
                <option value="decor">Decor</option>
                <option value="ceramics">Ceramics</option>
              </select>
            </div>

            {/* Price */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Stock
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-[#29463C] px-7 py-3 text-sm font-medium text-white hover:bg-[#20382F]"
            >
              Update Listing
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditListing;