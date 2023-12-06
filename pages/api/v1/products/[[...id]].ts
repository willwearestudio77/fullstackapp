// pages/api/hello.js
import { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";
import { getProducts, addProduct, updateProduct, removeProduct } from '@/lib/api-functions/server/products/controllers'
const baseRoute = "/api/v1/products/:id?"
const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
  attachParams:true,
})

  // .use(someMiddleware())
  .get(baseRoute,async(req, res) => {
    getProducts(req,res);
  })
  .post(baseRoute,async(req, res,next) => {
    addProduct(req,res,next);
  })
  .put(baseRoute,async(req, res,next) => {
    updateProduct(req,res,next);
  })
  .delete(baseRoute,async(req, res) => {
    removeProduct(req,res)
  });

export default handler;

//params not being passed 