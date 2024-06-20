import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  bookingId: number;

  @IsNumber()
  @IsNotEmpty()
  roomId: number;
}
