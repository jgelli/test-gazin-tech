import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNivelDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    nivel: string;
}
