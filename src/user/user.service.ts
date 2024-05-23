import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addUser(email: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                email,
            },
        });
    }

    async getUser(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async resetData(): Promise<void> {
        await this.prisma.user.deleteMany();
    }
}
