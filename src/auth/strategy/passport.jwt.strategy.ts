import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPayload } from 'src/user/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from "../../user/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel("User") private readonly userModel : Model<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "mechant mechant"
    });

  
  }

  async validate(payload: UserPayload) {
    const user = await this.userModel.findOne({email:payload.email}).select(['-password']).exec();
    if(!user) throw new UnauthorizedException();
   
    return user;
  }
}