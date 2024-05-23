import { Injectable } from '@nestjs/common';
import { PrismaClient, Task } from '@prisma/client';

@Injectable()
export class TaskService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<Task> {
        return this.prisma.task.create({
            data: {
                name,
                priority,
                userId,
            },
        });
    }

    async getTaskByName(name: string): Promise<Task | null> {
        const task = await this.prisma.task.findFirst({
            where: {
                name,
            },
        });
        return task;
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: {
                userId,
            },
        });
    }

    async resetData(): Promise<void> {
        await this.prisma.task.deleteMany();
    }
}
