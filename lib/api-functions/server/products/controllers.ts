import { addProductSchema, updateProductSchema } from "@/lib/validation/";
import {DeleteResult,} from 'mongodb'
import{UpdateWriteOpResult} from 'mongoose'
import {
  fetchProduct,
  fetchProducts,
  add,
  update,
  remove,
} from "@/lib/api-functions/server/products/queries";
import { NextApiRequest, NextApiResponse } from 'next';



//interface needs adding for types
const getProducts = async (req:NextApiRequest, res:NextApiResponse):Promise<void> => {
  const { id } = req.query;
  console.log("🚀 ~ file: controllers.js:9 ~ getProducts ~ id:", id);

  try {
    let data = [];
    if (id) {
      data = await fetchProduct(id);
    } else {
      data = await fetchProducts();
    }
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addProduct = async (req:NextApiRequest, res:NextApiResponse, isAdmin:boolean) => {
  let productData = { ...req.body };

  if (productData.image === "") {
    delete productData.image;
  }
  console.info(productData);

  try {
 productData = await addProductSchema.validate(productData);   
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }

  try {
    const result = await add(productData);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const updateProduct = async (req:NextApiRequest, res:NextApiResponse, isAdmin:boolean) => {
  const { id } = req.query;
  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "No id provided to update" });
  }

  let updates = { ...req.body };

  try {
    updates = await updateProductSchema.validate(updates);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }

  try {
    const result:UpdateWriteOpResult = await update(id, updates);
    if (result.modifiedCount === 0) return res.status(404).send({ message: "Not Found" });
    return res.status(200).send({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const removeProduct = async (req:NextApiRequest, res:NextApiResponse) => {
  const { id } = req.query;
  console.log("🚀 ~ file: controllers.js:99 ~ removeProduct ~ id:", id);

  if (!id) {
    return res.status(400).json({ message: "No id provided to delete" });
  }

  const query = {
    _id: id,
  };

  // if (!isAdmin) {
  //   query.owner = req.user.sub;
  // }

  try {
    const result:DeleteResult = await remove(id);
    if (result.deletedCount === 0) return res.status(404).send({ message: "Not Found" });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export { getProducts, addProduct, updateProduct, removeProduct };
