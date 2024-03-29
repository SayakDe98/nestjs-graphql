import { InputType, Int, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateOwnerInput {

  @Field()
  name: string;
}
