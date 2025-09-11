import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindAllPhraseDto {
  @ApiPropertyOptional()
  @IsOptional()
  portuguese?: string;

  @IsOptional()
  @ApiPropertyOptional()
  english?: string;

  @IsOptional()
  @ApiPropertyOptional()
  tag?: string;
}
