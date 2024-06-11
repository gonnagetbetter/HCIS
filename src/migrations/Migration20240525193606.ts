import { Migration } from '@mikro-orm/migrations';

export class Migration20240525193606 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "organization" ("id" serial primary key, "name" varchar(255) not null, "role" text check ("role" in (\'WORKER\', \'OWNER\')) not null, "password_hash" varchar(255) not null, "password_salt" varchar(255) not null);',
    );
    this.addSql(
      'alter table "organization" add constraint "organization_name_unique" unique ("name");',
    );

    this.addSql(
      'create table "hotel" ("id" serial primary key, "name" varchar(255) not null, "organization_id" int not null, "booking_id" int not null);',
    );
    this.addSql(
      'alter table "hotel" add constraint "hotel_booking_id_unique" unique ("booking_id");',
    );

    this.addSql(
      'create table "booking" ("id" serial primary key, "check_in" timestamptz not null, "check_out" timestamptz not null, "hotel_id" int not null);',
    );
    this.addSql(
      'alter table "booking" add constraint "booking_hotel_id_unique" unique ("hotel_id");',
    );

    this.addSql(
      'create table "customer" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "booking_id" int not null);',
    );

    this.addSql(
      'create table "rooms" ("id" serial primary key, "room_number" int not null, "price_per_night" int not null, "hotel_id" int not null, "booking_id" int not null);',
    );

    this.addSql(
      'alter table "hotel" add constraint "hotel_organization_id_foreign" foreign key ("organization_id") references "organization" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "hotel" add constraint "hotel_booking_id_foreign" foreign key ("booking_id") references "booking" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "booking" add constraint "booking_hotel_id_foreign" foreign key ("hotel_id") references "hotel" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "customer" add constraint "customer_booking_id_foreign" foreign key ("booking_id") references "booking" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "rooms" add constraint "rooms_hotel_id_foreign" foreign key ("hotel_id") references "hotel" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "rooms" add constraint "rooms_booking_id_foreign" foreign key ("booking_id") references "booking" ("id") on update cascade;',
    );
  }
}
