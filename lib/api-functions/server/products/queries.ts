
import Product from "@/lib/api-functions/server/products/model";
//interface for type
interface ProductData {
  image: URL,
  title: string,
  description?: string,
  price: number,
  quantity: number
}
export const fetchProducts = async (query:Record<string,any> = {}):Promise<ProductData[]> => {
  return await Product.find(query).exec();
};

export const fetchProduct = async (id:string | string[]) => {
  return await Product.findById(id).exec();
};

export const add = async (data:ProductData) => {
  const newProduct = new Product(data);
  const result = await newProduct.save();
  return result;
};

export const update = async (id:string | string[], updates:Partial<ProductData>) => {
  return await Product.updateOne({ _id: id }, updates);
};

export const remove = async (id:string | string[]) => {
  return await Product.deleteOne({ _id: id });
};
