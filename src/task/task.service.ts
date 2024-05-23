import { Injectable } from '@nestjs/common';
import { PrismaClient, Task } from '@prisma/client';

@Injectable()
export class TaskService {
    private prisma = new PrismaClient();

    async createTask(
        name: string,
        priority: number,
        userId: number,
    ): Promise<Task> {
        return this.prisma.task.create({
            data: {
                name,
                priority,
                userId,
            },
        });
    }

    async getTasksByUserId(userId: number): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: {
                userId,
            },
        });
    }

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async deleteTask(id: number): Promise<void> {
        await this.prisma.task.delete({
            where: {
                id,
            },
        });
    }
}
