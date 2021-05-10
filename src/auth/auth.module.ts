import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from 'src/user/user.model';

@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
