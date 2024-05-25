import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Room } from './entities/room.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Room])],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
