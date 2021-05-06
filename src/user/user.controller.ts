import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post()
    async createUser(@Body() userDoc){
        const response = await this.userService.create(userDoc);
        return response;
    }
}
