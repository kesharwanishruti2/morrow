import Api from "../service/Api.tsx";

const productDetailsLoader = async ({
  params,
}: {
  params: { id?: string };
}) => {
  try {
    const response = await Api.get(`/products/${params.id}`);

    return response.data?.data?.product || null;
  } catch (error) {
    console.error("Failed to load product details:", error);
    return null;
  }
};

export default productDetailsLoader;