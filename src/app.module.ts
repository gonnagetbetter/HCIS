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
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import defineConfig from './mikro-orm.config';
import { JwtModule } from '@nestjs/jwt';
import { config } from './config';

@Module({
  imports: [
    CacheModule,
    OrganizationsModule,
    CustomersModule,
    HotelsModule,
    RoomsModule,
    BookingModule,
    MikroOrmCoreModule.forRoot(defineConfig),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
