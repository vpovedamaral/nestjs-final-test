import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../infrastructure/database/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async addTask(
        name: string,
        userId: number,
        priority: number,
    ): Promise<Task> {
        return this.prisma.task.create({ data: { name, userId, priority } });
    }

    async getTaskByName(name: string): Promise<Task | null> {
        return this.prisma.task.findFirst({ where: { name } });
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        return this.prisma.task.findMany({ where: { userId } });
    }

    async resetData(): Promise<void> {
        await this.prisma.task.deleteMany({});
    }
}
