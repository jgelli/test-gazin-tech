import { ApiProperty } from '@nestjs/swagger';
import { Nivel } from '@prisma/client';

export class NivelEntity implements Nivel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nivel: string;
}
