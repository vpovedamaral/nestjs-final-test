import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

function emailEstValide(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        const { email } = createUserDto;

        if (!email) {
            throw new BadRequestException('Email is required');
        }

        if (!emailEstValide(email)) {
            throw new BadRequestException('Invalid email format');
        }

        return this.userService.addUser(email);
    }
}
