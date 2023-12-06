// pages/api/hello.js
import { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  // .use(someMiddleware())
  .get((req, res) => {
    res.send("GET");
  })
  .post((req, res) => {
    res.json({ message: "POST" });
  })
  .put(async (req, res) => {
    res.send("PUT");
  })
  .delete(async (req, res) => {
    res.end("DELETE");
  });

export default handler;