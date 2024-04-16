import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserInterface } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor( 
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createUser(username: string, password: string) {
        const newUser = this.userRepository.create({username, password});
        return this.userRepository.save(newUser);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find()
    }

    async findOne(username: string): Promise<UserInterface | undefined> {
        return this.userRepository.findOne({
            where: {username}
        })
      }
}