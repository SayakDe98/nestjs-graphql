import { Args, Int, Mutation, Parent, Query, ResolveField } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './entities/pets.entity';
import { PetsService } from './pets.service';

@Resolver(of => Pet)//of is used to define the type of resolve we are doing
export class PetsResolver {
    constructor(private petsService: PetsService) {}

    //first query:
    @Query(returns => [Pet])//import from @nestjs/graphql.returns => [Pet] returns array of pets
    pets(): Promise<Pet[]> {
        return this.petsService.findAll();
    }

    @Query(returns => Pet)
    getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
        return this.petsService.findOne(id);
    }

    @ResolveField(returns => Owner)
    owner(@Parent() pet: Pet): Promise<Owner> {
        return this.petsService.getOwner(pet.ownerId);
    }
    
    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
        return this.petsService.createPet(createPetInput);
    }

}
