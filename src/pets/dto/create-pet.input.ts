import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()//input types are dto's in graphql
export class CreatePetInput {
    
    @IsAlpha()
    @Field()
    name: string;

    @Field({nullable: true})
    type?: string;

    @Field(type => Int)
    ownerId: number;
}