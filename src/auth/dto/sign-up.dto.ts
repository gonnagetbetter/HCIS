import { Roles } from '../../users/enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Roles })
  @IsEnum(Roles)
  role: Roles = Roles.CUSTOMER;
}
