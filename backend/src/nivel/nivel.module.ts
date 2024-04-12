import { Module } from '@nestjs/common';
import { NivelController } from './nivel.controller';
import { NivelService } from './nivel.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [NivelController],
    providers: [NivelService, PrismaService],
})
export class NivelModule {}
