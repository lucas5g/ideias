import { ApiProperty } from '@nestjs/swagger';

enum ActionEnum {
  NEGATIVE,
  INTERROGATIVE,
}

export class CreatePhraseDto2 {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  audio: Buffer;

  @ApiProperty({
    enum: ActionEnum,
  })
  action: ActionEnum;
}
