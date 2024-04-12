import { PrismaService } from 'src/prisma.service';
import { CreateDesenvolvedorDto } from './dto/create-desenvolvedor.dto';
import { UpdateDesenvolvedorDto } from './dto/update-desenvolvedor.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DesenvolvedorEntity } from './entities/desenvolvedor.entity';

@Injectable()
export class DesenvolvedorService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<DesenvolvedorEntity[]> {
        const desenvolvedores = await this.prisma.desenvolvedor.findMany();

        if (!desenvolvedores?.length) {
            throw new NotFoundException();
        }

        return desenvolvedores;
    }

    async findOne(id: number): Promise<DesenvolvedorEntity | null> {
        const desenvolvedor = await this.prisma.desenvolvedor.findUnique({
            where: {
                id,
            },
        });

        if (!desenvolvedor) {
            throw new NotFoundException();
        }

        return desenvolvedor;
    }

    async create(data: CreateDesenvolvedorDto): Promise<DesenvolvedorEntity> {
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
            throw new BadRequestException('Erro durante remoção');
        }
    }
}
