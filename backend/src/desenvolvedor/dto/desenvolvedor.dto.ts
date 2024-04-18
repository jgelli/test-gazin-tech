import { ApiProperty } from '@nestjs/swagger';
import { Nivel } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { NivelEntity } from 'src/nivel/entities/nivel.entity';

export class DesenvolvedorDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ required: true })
    nome: string;

    @ApiProperty({ required: true, maxLength: 1 })
    sexo: string;

    @ApiProperty({ required: true, example: '2000-11-05' })
    datanascimento: string;

    @ApiProperty({ required: true })
    hobby: string;

    @Exclude()
    nivelId: number;

    @ApiProperty({ required: true, type: NivelEntity })
    nivel: Nivel;

    constructor(partial: Partial<DesenvolvedorDto>) {
        Object.assign(this, partial);
    }
}

export class DesenvolvedorPaginate {
    @ApiProperty()
    page: number;

    @ApiProperty()
    hasNext: boolean;

    @ApiProperty({ type: [DesenvolvedorDto] })
    desenvolvedores: DesenvolvedorDto[];
}
