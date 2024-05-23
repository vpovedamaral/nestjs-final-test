import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    HttpStatus,
    HttpCode,
    BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':userId')
    async getUserTasks(@Param('userId') userId: string) {
        if (isNaN(+userId)) {
            throw new BadRequestException('Invalid userId.');
        }
        const tasks = await this.taskService.getUserTasks(+userId);
        return tasks;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createTask(@Body() taskData: any) {
        const { name, userId, priority } = taskData;
        if (
            !name ||
            !userId ||
            !priority ||
            isNaN(+userId) ||
            isNaN(+priority)
        ) {
            throw new BadRequestException('Invalid task data.');
        }
        const task = await this.taskService.addTask(name, +userId, +priority);
        return task;
    }
}
