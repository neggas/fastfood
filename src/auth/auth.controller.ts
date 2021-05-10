import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialDto } from './DTO/user-credential';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}
   @Post("login")
   async login(@Body() userCredential:UserCredentialDto){
       const response = await this.authService.login(userCredential);
       return response;
   }
}
