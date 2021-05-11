import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async allUsers(){
        const response = await this.userService.AllUsers();
        return response;
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getSingleUser(@Param('id') userId:string){
        const response = await this.userService.userById(userId);
        return response;
    }

    @Post()
    async createUser(@Body() userDoc){
        const response = await this.userService.create(userDoc);
        return response;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async bannUser(@Param('id') userId:String){
        const response = this.userService.deleteOne(userId);
        return response;
    }


    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Param('id') userId, @Body() userDoc){
        const response = this.userService.updateUser(userId,userDoc);
        return response;
    }

}
