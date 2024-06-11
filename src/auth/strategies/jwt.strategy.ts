import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { config } from '../../config';
import { Strategy } from 'passport-jwt';
import { UserMeta } from '../types/user-meta.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  validate(payload: any): UserMeta {
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
