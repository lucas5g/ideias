import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
export class CreatePhraseDto {
  @ApiProperty()
  @Transform(({ value }) => {
    const text = String(value);
    return new RegExp(/[.?!]/).test(text) ? text : `${text}.`;
  })
  @IsNotEmpty()
  portuguese: string;

  @ApiProperty()
  @IsNotEmpty()
  tag: string;
}
