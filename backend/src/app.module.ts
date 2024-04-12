import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NivelModule } from './nivel/nivel.module';

@Module({
    imports: [ConfigModule.forRoot(), NivelModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
