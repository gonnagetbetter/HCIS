import { IsNumber } from 'class-validator';

export class FindRoomArgs {
  @IsNumber()
  hotelId?: number;
}
