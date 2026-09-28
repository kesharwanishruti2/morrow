import Api from "../service/Api.tsx";

const productDetailsLoader = async ({
  params,
}: {
  params: { id?: string };
}) => {
  const response = await Api.get(`/products/${params.id}`);

  return response.data.data.product;
};

export default productDetailsLoader;