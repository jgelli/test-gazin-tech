import { CreateDesenvolvedorDto } from './create-desenvolvedor.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDesenvolvedorDto extends PartialType(CreateDesenvolvedorDto) {}
