import { ApiProperty } from '@nestjs/swagger';
import { Desenvolvedor } from '@prisma/client';

export class DesenvolvedorEntity implements Desenvolvedor {
    @ApiProperty()
    id: number;

    @ApiProperty({ required: true })
    nome: string;

    @ApiProperty({ required: true, maxLength: 1 })
    sexo: string;

    @ApiProperty({ required: true, example: '2000-11-22' })
    datanascimento: Date;

    @ApiProperty()
    idade: number;

    @ApiProperty({ required: true })
    hobby: string;

    @ApiProperty({ required: true })
    nivelId: number;
}
