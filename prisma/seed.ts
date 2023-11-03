import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.create({
        data: {
            email: "alice@example.com",
            password: await bcrypt.hash("password", 10)
        }
    });
    const bob = await prisma.user.create({
        data: {
            email: "bob@example.com",
            password: await bcrypt.hash("password", 10)
        }
    });
    console.log({ alice, bob })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
