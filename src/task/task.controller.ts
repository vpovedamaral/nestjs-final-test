import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async createTask(
        @Body('name') name: string,
        @Body('priority') priority: number,
        @Body('userId') userId: number,
    ): Promise<Task> {
        return this.taskService.createTask(name, priority, userId);
    }

    @Get(':userId')
    async getTasksByUserId(@Param('userId') userId: number): Promise<Task[]> {
        return this.taskService.getTasksByUserId(userId);
    }

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    }
}
