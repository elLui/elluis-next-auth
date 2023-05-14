import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";


interface RequestBody {
    username: string;
    password: string;
}

export async function POST(request: Request ) {
    const body: RequestBody = await request.json();

    const user = await prisma.user.findFirst({
        where: {
            email: body.username,
        },
    });

    // if user exists and password matches
    if (user && (await bcrypt.compare( body.password, user.password))) {
        const { password, ...userWithoutPass } = user;
        return new Response(JSON.stringify(userWithoutPassword));
    } else return new Response(JSON.stringify(null));



}