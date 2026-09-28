import { NavLink } from "react-router";

const categories = [
  {
    name: "Furniture",
    image: "/images/furniture.png",
  },
  {
    name: "Lighting",
    image: "/images/Light.png",
  },
  {
    name: "Decor",
    image: "/images/decor.png",
  },
  {
    name: "Ceramics",
    image: "/images/cermos.png",
  },
];

const Categories = () => {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            MORROW
          </p>

          <h1 className="mt-2 text-4xl font-medium text-[var(--dark)]">
            Categories
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Browse products by category
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <NavLink
              key={category.name}
              to={`/listings?category=${encodeURIComponent(category.name)}`}
              className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <div className="flex items-center justify-between px-5 py-4">
                <h2 className="text-base font-medium text-[var(--dark)]">
                  {category.name}
                </h2>

                <span className="text-[var(--muted)] transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </NavLink>
          ))}
        </div>

      </div>
    </main>
  );
};

export default Categories;