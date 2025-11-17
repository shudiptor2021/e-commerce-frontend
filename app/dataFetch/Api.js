import axios from "axios";

const api = axios.create({
  // baseURL
  baseURL: "https://dummyjson.com",
});

// get all product by pagination

export const fetchProducts = async (pageNumber, limit) => {
  // pagination
  // const limit = 12;
  const skip = (pageNumber - 1) * limit;
  const res = await api.get(`/products/?limit=${limit}&skip=${skip}`);

  const { products, total } = res.data;

  return { products, totalPages: Math.ceil(total / limit) };
};
// -----------------------------------------------------------------

// get all products by infinite scroll
export const fetchAllProducts = async ({ pageParam = 1 }) => {
  const limit = 8;
  const skip = (pageParam -1 ) * limit
  const res = await api.get(`/products/?limit=${limit}&skip=${skip}`);
const { products } = res.data;
// console.log("Fetching with start:", pageParam)
  const hasMore = products.length === limit;
return { products , nextCursor: hasMore ? pageParam + limit : undefined };
};

// get all product by Search

export const fetchSearchProducts = async (query) => {
  const res = await api.get(`/products/search?q=${query}`);
  return res?.data?.products;
};

// get single product
export const fetchProduct = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res?.data;
};

// get all category name

export const fetchAllCategory = async () => {
  const res = await api.get("/products/categories");
  return res.data;
};

// get items by category

export const fetchCategoryItem = async (slug) => {
  const res = await api.get(`/products/category/${slug}`);
  return res.data;
};

// get all flash sale product

export const fetchFlashSaleProducts = async () => {
  const res = await api.get(`/products`);
  return res?.data?.products;
};

// get all best salling product

export const fetchBestSale = async () => {
  const res = await api.get(`/products/?limit=4&skip=10`);
  return res?.data?.products;
};



