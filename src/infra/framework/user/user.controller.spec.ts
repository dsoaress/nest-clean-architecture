import { Test, TestingModule } from '@nestjs/testing'

import { UserRepository } from '@/core/repositories'
import { UsersCacheMemoryRepository } from '@/infra/data/cache-memory/users-cache-memory.repository'
import { CreateUserUseCase, GetAllUsersUseCase } from '@/use-cases/user'

import { UserController } from './user.controller'

describe('UserController', () => {
  let userController: UserController

  const name = 'John Doe'
  const email = 'johndoe@example.com'
  const password = '123456'

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
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

    userController = userModule.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })

  it('should create a user', async () => {
    const user = await userController.create({ name, email, password })
    expect(user).toEqual({ id: 1, name, email })
  })

  it('should get all users', async () => {
    await userController.create({ name, email, password })
    const users = await userController.findAll()
    expect(users).toEqual([{ id: 1, name, email }])
  })
})
