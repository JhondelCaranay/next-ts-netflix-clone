import Roles from "@/lib/roles";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);
    await Roles(req, res, { allowed_roles: ["ALL"] });

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
