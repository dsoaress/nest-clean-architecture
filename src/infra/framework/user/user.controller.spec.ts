import { Test, TestingModule } from '@nestjs/testing'

import { UserRepository } from '@/core/repositories'
import { UsersCacheMemoryRepository } from '@/data/cache-memory/users-cache-memory.repository'
import { CreateUserUseCase, GetAllUsersUseCase } from '@/use-cases/user'

import { UserController } from './user.controller'

describe('UserController', () => {
  let usersController: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserRepository,
          useClass: UsersCacheMemoryRepository
        },
        {
          provide: CreateUserUseCase,
          useFactory: (repository: UserRepository) => new CreateUserUseCase(repository),
          inject: [UserRepository]
        },
        {
          provide: GetAllUsersUseCase,
          useFactory: (repository: UserRepository) => new GetAllUsersUseCase(repository),
          inject: [UserRepository]
        }
      ]
    }).compile()

    usersController = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(usersController).toBeDefined()
  })
})
