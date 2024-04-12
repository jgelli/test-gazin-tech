import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function createSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('Desenvolvedores API')
        .setDescription('Api de Desenvolvedores para teste Gazin Tech')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    createSwagger(app);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true, transform: true }));

    await app.listen(3000);
}
bootstrap();
