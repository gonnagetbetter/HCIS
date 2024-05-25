import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './cache/cache.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { CustomersModule } from './customers/customers.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { BookingModule } from './booking/booking.module';
import { MikroOrmCoreModule } from '@mikro-orm/nestjs/mikro-orm-core.module';
import defineConfig from './mikro-orm.config';

@Module({
  imports: [
    CacheModule,
    OrganizationsModule,
    CustomersModule,
    HotelsModule,
    RoomsModule,
    BookingModule,
    MikroOrmCoreModule.forRoot(defineConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
