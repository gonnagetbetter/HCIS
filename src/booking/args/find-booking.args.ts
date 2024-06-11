import { IsNumber, IsOptional } from 'class-validator';

export class FindBookingArgs {
  @IsNumber()
  @IsOptional()
  hotelId?: number;

  @IsNumber()
  @IsOptional()
  roomId?: number;

  @IsNumber()
  @IsOptional()
  customerId?: number;
}
