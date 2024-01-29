import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') { //declaring to only use this func for POST req
        return res.status(405).end();
    }

    try {
        const { email, username, name, password } = req.body; //from the register form

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword,
            }
        })
        
    } catch (error) {
        console.error(error);
        return res.status(400).end();
    }
}