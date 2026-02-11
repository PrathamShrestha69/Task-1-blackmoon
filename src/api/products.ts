export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}
