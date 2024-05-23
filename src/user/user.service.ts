import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService {
    private prisma = new PrismaClient();

    async createUser(email: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                email,
            },
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async deleteUser(id: number): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
