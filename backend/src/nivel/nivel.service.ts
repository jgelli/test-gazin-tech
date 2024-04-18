import { PrismaService } from '../prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NivelEntity } from './entities/nivel.entity';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';

@Injectable()
export class NivelService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<NivelEntity[]> {
        const niveis = await this.prisma.nivel.findMany();

        if (!niveis?.length) {
            throw new NotFoundException();
        }

        return niveis;
    }

    async findOne(id: number): Promise<NivelEntity | null> {
        const nivel = await this.prisma.nivel.findUnique({
            where: {
                id,
            },
        });
        if (!nivel) {
            throw new NotFoundException();
        }
        return nivel;
    }

    async create(data: CreateNivelDto): Promise<NivelEntity> {
        return this.prisma.nivel.create({
            data,
        });
    }

    async update(params: { id: number; data: UpdateNivelDto }): Promise<NivelEntity> {
        const { id, data } = params;
        return this.prisma.nivel.update({
            data,
            where: {
                id: id,
            },
        });
    }

    async delete(id: number): Promise<void> {
        const desenvolvedores = await this.prisma.desenvolvedor.findMany({
            where: {
                nivelId: id,
            },
        });

        if (desenvolvedores?.length) {
            throw new BadRequestException(
                'It is not possible to delete this level. There developers in this level.',
            );
        }

        await this.prisma.nivel.delete({
            where: {
                id,
            },
        });
    }
}
