// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  name: string;
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
    res.status(200).end()
 
}

export default handler;
