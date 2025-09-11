import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
export class CreatePhraseDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => {
    const text = String(value);
    return new RegExp(/[.?!]/).test(text) ? text : `${text}.`;
  })
  portuguese: string;

  @ApiProperty()
  @IsString()
  tag: string;
}
