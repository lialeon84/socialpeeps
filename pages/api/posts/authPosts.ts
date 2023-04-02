import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(401).json({ message: "Please sign in to create a post." })
    }

    if (req.method === "GET") {
        try {
            const data = await prisma.user.findUnique({
                where:{ email: session?.user?.email },
                include: {
                    posts: {
                        orderBy: {
                            createdAt: "desc",
                        },
                        include: {
                            comment: true,
                        },
                    },
                },
            })

            return res.status(200).json(data)
        } catch (err) {
            res.status(403).json({ err: "Error has occurred while making a post" })
        }
    }
}