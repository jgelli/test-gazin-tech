import { Module } from '@nestjs/common';
import { DesenvolvedorController } from './desenvolvedor.controller';
import { DesenvolvedorService } from './desenvolvedor.service';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [DesenvolvedorController],
    providers: [DesenvolvedorService, PrismaService],
})
export class DesenvolvedorModule {}
