import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NivelModule } from './nivel/nivel.module';
import { DesenvolvedorModule } from './desenvolvedor/desenvolvedor.module';

@Module({
    imports: [ConfigModule.forRoot(), NivelModule, DesenvolvedorModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
