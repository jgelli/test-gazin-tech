import { PrismaService } from 'src/prisma.service';
import { CreateDesenvolvedorDto } from './dto/create-desenvolvedor.dto';
import { UpdateDesenvolvedorDto } from './dto/update-desenvolvedor.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DesenvolvedorEntity } from './entities/desenvolvedor.entity';

@Injectable()
export class DesenvolvedorService {
    constructor(private prisma: PrismaService) {}

    async findAll(
        page: number,
        perPage: number,
    ): Promise<{ hasNext: boolean; desenvolvedores: DesenvolvedorEntity[] }> {
        const skip = (page - 1) * perPage;

        const [desenvolvedores, total] = await Promise.all([
            this.prisma.desenvolvedor.findMany({
                include: {
                    nivel: true,
                },
                skip,
                take: perPage,
            }),
            this.prisma.desenvolvedor.count(),
        ]);

        if (!desenvolvedores?.length) {
            throw new NotFoundException();
        }

        const hasNext = page * perPage < total;

        return { hasNext, desenvolvedores };
    }

    async findOne(id: number): Promise<DesenvolvedorEntity | null> {
        const desenvolvedor = await this.prisma.desenvolvedor.findUnique({
            where: {
                id,
            },
            include: {
                nivel: true,
            },
        });

        if (!desenvolvedor) {
            throw new NotFoundException();
        }

        return desenvolvedor;
    }

    async create(data: CreateDesenvolvedorDto): Promise<DesenvolvedorEntity> {
        const { nivelId } = data;

        const nivel = await this.prisma.nivel.findUnique({ where: { id: nivelId } });

        if (!nivel) {
            throw new NotFoundException(`Theres no level with id: ${nivelId}`);
        }

        return this.prisma.desenvolvedor.create({
            data,
        });
    }

    async update(params: {
        id: number;
        data: UpdateDesenvolvedorDto;
    }): Promise<DesenvolvedorEntity> {
        const { id, data } = params;
        return this.prisma.desenvolvedor.update({
            data,
            where: {
                id: id,
            },
        });
    }

    async delete(id: number): Promise<void> {
        try {
            await this.prisma.desenvolvedor.delete({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new BadRequestException('Error deleting developer');
        }
    }
}
