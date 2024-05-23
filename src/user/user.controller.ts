import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body('email') email: string): Promise<User> {
        return this.userService.createUser(email);
    }

    @Get(':email')
    async getUserByEmail(@Param('email') email: string): Promise<User | null> {
        return this.userService.getUserByEmail(email);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
