import { IsNumber } from 'class-validator';

export class FindHotelArgs {
  @IsNumber()
  oganizationId: number;
}
