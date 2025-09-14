import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreatePhraseDto {
  @ApiProperty()
  @IsNotEmpty()
  portuguese: string;

  @ApiProperty()
  @IsNotEmpty()
  tag: string;
}
