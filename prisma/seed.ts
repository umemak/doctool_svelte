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
    const carol = await prisma.user.create({
        data: {
            email: "carol@example.com",
            password: await bcrypt.hash("password", 10)
        }
    });
    const article = await prisma.article.create({
        data: {
            title: "Test Article",
            description: "Test Description",
            path: "test-article",
            authorId: alice.id,
            allow_external: true,
            show_from: new Date(),
            show_until: new Date(),
            reviews: {
                create: {
                    reviewerId: bob.id,
                    body: "Test Review"
                }
            }
        }
    });
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
