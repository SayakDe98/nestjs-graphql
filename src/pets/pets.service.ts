import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './entities/pets.entity';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownersService: OwnersService) {}

    createPet(createPetInput: CreatePetInput): Promise<Pet> {//this is a dto
        const newPet = this.petsRepository.create(createPetInput);//newPet = new Pet(); new.name = input.name

        return this.petsRepository.save(newPet); //insert into database
    }

    async findAll(): Promise<Pet[]> {
        return this.petsRepository.find(); //SELECT * pet
    }

    findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneOrFail({where:{
            id
        }});
    }
    
    getOwner(ownerId: number): Promise<Owner> {
        return this.ownersService.findOne(ownerId);
    }
}
