import { UserRepository } from '@/core/repositories'
import { UsersCacheMemoryRepository } from '@/infra/data/cache-memory/users-cache-memory.repository'

import { CreateUserUseCase } from '../create-user-use-case'
import { GetAllUsersUseCase } from './get-all-users.use-case'

describe('GetAllUsersUseCase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase
  let createUserUserCase: CreateUserUseCase
  let userRepository: UserRepository

  const name = 'John Doe'
  const email = 'johndoe@example.com'
  const password = '123456'

  beforeEach(async () => {
    userRepository = new UsersCacheMemoryRepository()
    createUserUserCase = new CreateUserUseCase(userRepository)
    getAllUsersUseCase = new GetAllUsersUseCase(userRepository)

    await createUserUserCase.execute({ name, email, password })
  })

  it('should be defined', () => {
    expect(getAllUsersUseCase).toBeDefined()
  })

  it('should get all users', async () => {
    const users = await getAllUsersUseCase.execute()
    expect(users).toEqual([{ id: 1, name, email }])
  })
})
