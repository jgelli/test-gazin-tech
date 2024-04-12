import { ApiProperty } from '@nestjs/swagger';

export class DesenvolvedorDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ required: true })
    nome: string;

    @ApiProperty({ required: true, maxLength: 1 })
    sexo: string;

    @ApiProperty({ required: true, example: '2000-11-05' })
    datanascimento: string;

    @ApiProperty()
    idade: number;

    @ApiProperty({ required: true })
    hobby: string;

    @ApiProperty({ required: true })
    nivelId: number;

    constructor(partial: Partial<DesenvolvedorDto>) {
        Object.assign(this, partial);
    }
}
