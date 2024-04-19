import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: 1, username: 'user1', password: 'password1' },
      ];
      jest.spyOn(userService, 'getAllUsers').mockResolvedValue(users);
      expect(await userController.getAllUsers()).toBe(users);
    });
  });

  describe('getOneUser', () => {
    it('should return a user with the given username', async () => {
      const username = 'user1';
      const user: User = { id: 1, username, password: 'password1' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      expect(await userController.getOneUser(username)).toBe(user);
    });

    it('should return undefined if user is not found', async () => {
      const username = 'nonexistent';
      jest.spyOn(userService, 'findOne').mockResolvedValue(undefined);
      expect(await userController.getOneUser(username)).toBeUndefined();
    });
  });
});
