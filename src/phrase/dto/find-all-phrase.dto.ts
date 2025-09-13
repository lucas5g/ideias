import { ApiPropertyOptional } from '@nestjs/swagger';
// import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FindAllPhraseDto {
  @ApiPropertyOptional()
  @IsOptional()
  // @Transform(({ value }) => (String(value) === '' ? undefined : value))
  portuguese?: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @Transform(({ value }) => (String(value) === '' ? undefined : value))
  english?: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @Transform(({ value }) => (String(value) === '' ? undefined : value))
  tag?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
