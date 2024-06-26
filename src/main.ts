import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const payload = {
          message: 'Bad Request',
          fails: {},
        };

        for (const error of errors) {
          payload.fails[error.property] = Object.values(error.constraints);
        }
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
