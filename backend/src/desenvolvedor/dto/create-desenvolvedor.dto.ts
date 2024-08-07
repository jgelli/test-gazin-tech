import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    Matches,
    IsInt,
    IsString,
    MaxLength,
    IsNotEmpty,
    IsIn,
} from 'class-validator';

export class CreateDesenvolvedorDto {
    @IsString()
    @ApiProperty({ required: true })
    nome: string;

    @IsString()
    @MaxLength(1)
    @IsNotEmpty()
    @IsIn(['M', 'F', 'O'], { message: 'sexo must be one of M, F, or O' })
    @ApiProperty({ required: true, example: 'M' })
    sexo: string;

    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'datanascimento must be in format YYYY-MM-DD',
    })
    @IsDateString({}, { message: 'datanascimento must be a valid date' })
    @ApiProperty({ required: true })
    datanascimento: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    hobby: string;

    @IsInt()
    @ApiProperty({ required: true })
    nivelId: number;
}
