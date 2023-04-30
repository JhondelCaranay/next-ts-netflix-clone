import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import Roles from "@/lib/roles";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req, res);
    await Roles(req, res, { allowed_roles: ["ALL"] });

    const moviesCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
