import { NivelEntity } from './entities/nivel.entity';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { NivelService } from './nivel.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Patch,
    ParseIntPipe,
    ValidationPipe,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('nivel')
@Controller('nivel')
export class NivelController {
    constructor(private readonly nivelService: NivelService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: [NivelEntity] })
    async findAll(): Promise<NivelEntity[]> {
        return this.nivelService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: NivelEntity })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<NivelEntity | null> {
        return this.nivelService.findOne(id);
    }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: NivelEntity })
    async create(@Body(ValidationPipe) createNivelDto: CreateNivelDto): Promise<NivelEntity> {
        return this.nivelService.create(createNivelDto);
    }

    @Patch(':id')
    @ApiResponse({ status: HttpStatus.OK, type: NivelEntity })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateNivelDto: UpdateNivelDto,
    ) {
        return this.nivelService.update({
            id,
            data: updateNivelDto,
        });
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.nivelService.delete(id);
    }
}
