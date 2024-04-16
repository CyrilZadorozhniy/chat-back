import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UsersService) {}
    
    @Get()
    getAllUsers() {
      return this.userService.getAllUsers();
    }
}