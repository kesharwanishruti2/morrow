import { useState } from "react";
import { useNavigate } from "react-router";
import Api from "../../service/Api";

const AddListing = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);

      formData.append(
        "price",
        JSON.stringify({
          amount: Number(price),
          currency: currency,
        })
      );

      formData.append("stock", stock);

      if (images) {
        Array.from(images).forEach((image) => {
          formData.append("images", image);
        });
      }

      await Api.post("/products", formData);

      navigate("/mylistings");
    } catch (error: any) {
      console.log("CREATE LISTING ERROR:", error);
      console.log("BACKEND RESPONSE:", error.response?.data);
      console.log(
        "VALIDATION ERRORS JSON:",
        JSON.stringify(error.response?.data?.errors, null, 2)
      );

      setError("Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* TOPBAR */}
      <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[#FCFAF6] px-10">
        <p className="text-xs text-[var(--muted)]">
          My Space / Add Listing
        </p>

        <button
          onClick={() => navigate("/mylistings")}
          className="text-xs text-[var(--muted)] hover:text-[#29463C]"
        >
          Cancel
        </button>
      </header>

      {/* MAIN */}
      <main className="px-10 py-10">
        <div className="mx-auto max-w-3xl">

          {/* HEADING */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Create
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#29463C]">
              Add a listing
            </h1>

            <p className="mt-3 text-sm text-[var(--muted)]">
              Add a new product to your Morrow store.
            </p>
          </div>
         <div className="p-2"></div>
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8"
          >

            {/* NAME */}
            <div className="mb-6">
              <label className="mb-2 block text-xs font-medium text-[#29463C]">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[#FCFAF6] px-4 py-3 text-sm outline-none focus:border-[#29463C]"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-6">
              <label className="mb-2 block text-xs font-medium text-[#29463C]">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product"
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[#FCFAF6] px-4 py-3 text-sm outline-none focus:border-[#29463C]"
              />
            </div>

            {/* CATEGORY */}
            <div className="mb-6">
              <label className="mb-2 block text-xs font-medium text-[#29463C]">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[#FCFAF6] px-4 py-3 text-sm outline-none focus:border-[#29463C]"
              >
                <option value="">Select category</option>
                <option value="furniture">Furniture</option>
                <option value="lighting">Lighting</option>
                <option value="decor">Decor</option>
                <option value="ceramics">Ceramics</option>
              </select>
            </div>

            {/* PRICE + CURRENCY */}
            <div className="mb-6 grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-xs font-medium text-[#29463C]">
                  Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="2000"
                  min="0"
                  required
                  className="w-full rounded-xl border border-[var(--border)] bg-[#FCFAF6] px-4 py-3 text-sm outline-none focus:border-[#29463C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-[#29463C]">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[#FCFAF6] px-4 py-3 text-sm outline-none focus:border-[#29463C]"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>

            </div>

            {/* STOCK */}
            <div className="mb-6">
              <label className="mb-2 block text-xs font-medium text-[#29463C]">
                Stock
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                min="0"
                required
                className="w-full rounded-xl border border-[var(--border)] bg-[#FCFAF6] px-4 py-3 text-sm outline-none focus:border-[#29463C]"
              />
            </div>

            {/* IMAGES */}
            <div className="mb-8">
              <label className="mb-2 block text-xs font-medium text-[#29463C]">
                Images
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="w-full rounded-xl border border-[var(--border)] bg-[#FCFAF6] px-4 py-3 text-sm"
              />

              <p className="mt-2 text-xs text-[var(--muted)]">
                You can upload up to 3 images.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <p className="mb-5 rounded-xl bg-[#F9E7E5] px-4 py-3 text-xs text-[var(--danger)]">
                {error}
              </p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#29463C] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#20382F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Listing"}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default AddListing;