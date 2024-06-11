import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const existing = await this.usersService.findOne({
      username: dto.username,
    });

    if (existing) {
      throw new BadRequestException('User already exists');
    }

    const newUser = new User();
    newUser.username = dto.username;
    newUser.role = dto.role;

    newUser.passwordHash = await bcrypt.hash(dto.password, 10);

    await this.usersService.createOne(newUser);

    return {
      success: true,
    };
  }

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOne({
      username,
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      role: user.role,
      tokenType: 'access',
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
