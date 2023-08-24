import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const slugs = req.query.slug || ["/"];
  const url: string =
    typeof slugs === "string" ? `/${slugs}` : `/${slugs.join("/")}`;
  console.log(
    `method: ${req.method}, query: ${JSON.stringify(req.query)}, url: ${url}`,
  );
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
