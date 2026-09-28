import { useEffect, useState } from "react";
import Api from "../service/Api.tsx";
import Card from "../components/Card";
import { NavLink, useNavigate } from "react-router";
import { useAppSelector } from "../Storee/hooks.tsx";

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

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
const navigate = useNavigate();
const user = useAppSelector((state)=>state.auth.user)
console.log(user)
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await Api.get("/products");

        setProducts(response.data.data.user.products);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <main className="m-10 bg-[var(--background)] p-10">

      {/* ================= HERO ================= */}
      <section className="px-6 py-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-3xl bg-[#e3e2d6] px-8 py-12 md:grid-cols-2 md:px-12 lg:px-16">

          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[var(--muted)]">
              Thoughtfully found, ready for a new home
            </p>

            <h1 className="max-w-xl text-4xl leading-tight text-[var(--dark)] md:text-5xl lg:text-6xl">
              Good things find their next place.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[var(--muted)]">
              Discover unique products from independent sellers and find
              something worth bringing home.
            </p>

            <button onClick={()=>navigate("/listings")}
             className="mt-8 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
              Explore Listings →
            </button>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex h-[280px] w-full max-w-[430px] items-center justify-center rounded-2xl bg-[#f3f0e8] p-5">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#d4d8cb]">
                <p className="text-sm text-[var(--muted)]">
                <img src="https://i.pinimg.com/736x/d6/5b/ff/d65bff75949dd7036348c2e3640a0041.jpg" 
                className="rounded-xl p-2" alt="" />
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                Featured
              </p>

              <h2 className="text-3xl text-[var(--dark)] md:text-4xl">
                Find your next favourite
              </h2>
            </div>

            <button  onClick={() => navigate("/listings")}
            className="hidden text-sm text-[var(--muted)] hover:text-[var(--primary)] md:block">

              View all listings →
            </button>
          </div>
          <p className="p-2"></p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {products.slice(0, 4).map((product) => (
              <Card
                key={product._id}
                product={product}
              />
            ))}

          </div>

        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
     <section className="border-y border-[var(--border)] bg-[var(--card)] px-6 py-14">
  <div className="mx-auto max-w-7xl">

    <div className="mb-8">
      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
        Explore
      </p>
      <h2 className="text-3xl text-[var(--dark)]">
        Shop by category
      </h2>
    </div>
<p className=""></p>


  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
  {categories.map((category) => (
    <NavLink
      key={category.name}
      to={`/listings?category=${category.name}`}
      className="group relative h-48 overflow-hidden rounded-2xl border border-[var(--border)]"
    >
      <img
        src={category.image}
        alt={category.name}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/25" />

      <h3 className="absolute bottom-5 left-5 text-xl font-medium text-white">
        {category.name}
      </h3>
    </NavLink>
  ))}
</div>

  </div>
</section>

      {/* ================= BROWSE ================= */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                Browse
              </p>

              <h2 className="text-3xl text-[var(--dark)]">
                Browse all listings
              </h2>
            </div>
<div className="mb-5"></div>
  

          </div>
  <div className="flex flex-wrap items-center justify-between gap-2 p-2">
  {["All", "Furniture", "Lighting", "Decor"].map((category) => (
    <NavLink
      key={category}
      to={
        category === "All"
          ? "/listings"
          : `/listings?category=${category}`
      }
      className={({ isActive }) =>
        `rounded-full border px-5 py-2 text-sm transition ${
          isActive
            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
            : "border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--primary)]"
        }`
      }
    >
      {category}
    </NavLink>
  ))}
</div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (
              <Card
                key={product._id}
                product={product}
              />
            ))}

          </div>

        </div>
      </section>

    </main>
  );
};

export default Home;