import {
    Controller,
    Post,
    Body,
    HttpStatus,
    HttpCode,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body('email') email: string) {
        try {
            const user = await this.userService.addUser(email);
            return user;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('User already exists.');
            }
            throw new BadRequestException('Invalid request.');
        }
    }
}
