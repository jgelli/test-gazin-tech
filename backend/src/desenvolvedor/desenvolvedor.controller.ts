import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DesenvolvedorEntity } from './entities/desenvolvedor.entity';
import { DesenvolvedorService } from './desenvolvedor.service';
import { CreateDesenvolvedorDto } from './dto/create-desenvolvedor.dto';
import { UpdateDesenvolvedorDto } from './dto/update-desenvolvedor.dto';
import { DesenvolvedorDto, DesenvolvedorPaginate } from './dto/desenvolvedor.dto';
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
    UseInterceptors,
    ClassSerializerInterceptor,
    Query,
} from '@nestjs/common';

@ApiTags('desenvolvedor')
@Controller('desenvolvedor')
export class DesenvolvedorController {
    constructor(private readonly desenvolvedorService: DesenvolvedorService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: DesenvolvedorPaginate })
    async findAll(
        @Query('page', ParseIntPipe) page: number,
        @Query('perPage', ParseIntPipe) perPage: number,
    ): Promise<{ page: number; hasNext: boolean; desenvolvedores: DesenvolvedorDto[] }> {
        if (perPage > 50) perPage = 50;

        const { hasNext, desenvolvedores } = await this.desenvolvedorService.findAll(page, perPage);
        return {
            page,
            hasNext: hasNext,
            desenvolvedores: desenvolvedores.map(this.formatDate),
        };
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: DesenvolvedorDto })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<DesenvolvedorDto> {
        const desenvolvedor = await this.desenvolvedorService.findOne(id);
        return this.formatDate(desenvolvedor);
    }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: DesenvolvedorDto })
    async create(
        @Body(ValidationPipe) createDesenvolvedorDto: CreateDesenvolvedorDto,
    ): Promise<DesenvolvedorDto> {
        this.parseDate(createDesenvolvedorDto);
        const desenvolvedor = await this.desenvolvedorService.create(createDesenvolvedorDto);
        return this.formatDate(desenvolvedor);
    }

    @Patch(':id')
    @ApiResponse({ status: HttpStatus.OK, type: DesenvolvedorDto })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateDesenvolvedorDto: UpdateDesenvolvedorDto,
    ): Promise<DesenvolvedorDto> {
        if (updateDesenvolvedorDto?.datanascimento) {
            this.parseDate(updateDesenvolvedorDto);
        }
        const desenvolvedor = await this.desenvolvedorService.update({
            id,
            data: updateDesenvolvedorDto,
        });
        return this.formatDate(desenvolvedor);
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.desenvolvedorService.delete(id);
    }

    private parseDate(desenvolvedor: UpdateDesenvolvedorDto): void {
        const parsedData = new Date(desenvolvedor.datanascimento);
        desenvolvedor.datanascimento = parsedData;
    }

    private formatDate(desenvolvedor: DesenvolvedorEntity): DesenvolvedorDto {
        return new DesenvolvedorDto({
            ...desenvolvedor,
            datanascimento: new Date(desenvolvedor.datanascimento).toISOString().split('T')[0],
        });
    }
}
