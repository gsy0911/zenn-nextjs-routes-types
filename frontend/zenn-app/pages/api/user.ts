// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
  id: string;
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "GET") {
    res.status(200).json({ status: "success", id: "1", name: "Alice" });
  } else if (req.method === "POST") {
    res.status(200).json({ status: "success", id: "2", name: "Bob" });
  } else if (req.method === "PUT") {
    res.status(200).json({ status: "success", id: "3", name: "Eve" });
  } else if (req.method === "DELETE") {
    res.status(200).json({ status: "success", id: "4", name: "Mallory" });
  }
}
