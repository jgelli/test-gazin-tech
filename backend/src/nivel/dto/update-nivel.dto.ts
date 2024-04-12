import { CreateNivelDto } from './create-nivel.dto';
// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';

export class UpdateNivelDto extends PartialType(CreateNivelDto) {}
