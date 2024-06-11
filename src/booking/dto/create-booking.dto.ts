import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsDate()
  @IsNotEmpty()
  checkIn: Date;

  @IsDate()
  @IsNotEmpty()
  checkOut: Date;

  @IsNumber()
  @IsNotEmpty()
  hotelId: number;

  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsNumber()
  @IsNotEmpty()
  customerId: number;
}
