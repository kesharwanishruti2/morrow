import Api from "../service/Api.tsx";

const loader = async ({ request }: { request: Request }) => {
  try {
    const url = new URL(request.url);

    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");

    const response = await Api.get("/products", {
      params: {
        ...(category && { category }),
        ...(search && { search }),
      },
    });

    return response.data?.data?.user?.products || [];
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
};

export default loader;