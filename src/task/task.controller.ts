import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

function idUserEstValide(userId: number): boolean {
    return !isNaN(userId) && Number.isInteger(userId) && userId >= 0;
}

function priorityEstValide(priority: number): boolean {
    return !isNaN(priority) && Number.isInteger(priority) && priority > 0;
}

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        const { name, userId, priority } = createTaskDto;

        if (!name || !userId || !priority) {
            throw new BadRequestException('Tous les champs sont requis');
        }
        const parsedPriority = parseInt(priority);
        const parsedUserId = parseInt(userId);
        if (!idUserEstValide(parsedUserId)) {
            throw new BadRequestException('User id invalide');
        }

        if (!priorityEstValide(parsedPriority)) {
            throw new BadRequestException(
                'La priorité doit être un entier positif',
            );
        }

        return this.taskService.addTask(name, parsedUserId, parsedPriority);
    }

    @Get('user/:userId')
    getUserTasks(@Param('userId') userId: string) {
        const parsedUserId = parseInt(userId);

        if (!idUserEstValide(parsedUserId)) {
            throw new BadRequestException('User id invalide');
        }

        return this.taskService.getUserTasks(parsedUserId);
    }
}
