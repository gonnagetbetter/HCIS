import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  roomNumber: number;

  @IsNumber()
  @IsNotEmpty()
  pricePerNight: number;

  @IsNumber()
  @IsNotEmpty()
  hotelId: number;

  @IsNumber()
  @IsNotEmpty()
  bookingId: number;
}
