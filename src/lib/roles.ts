import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "./prisma";
import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

type AutorizeType = {
  // array of roles enum
  allowed_roles: ("ALL" | Role)[];
};

const Roles = async (req: NextApiRequest, res: NextApiResponse, roles: AutorizeType) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user.email) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Not signed in" });
  }

  if (
    (session && !roles.allowed_roles.includes("ALL")) ||
    roles.allowed_roles.includes(session.user.role)
  ) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Not authorized" });
  }
};

export default Roles;
