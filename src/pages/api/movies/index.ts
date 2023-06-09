import prisma from "@/lib/prisma";
import Roles from "@/lib/roles";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req, res);
    await Roles(req, res, { allowed_roles: ["ALL"] });

    const movies = await prisma.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).end();
  }
}
