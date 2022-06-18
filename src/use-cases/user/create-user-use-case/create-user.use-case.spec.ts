import { lastValueFrom } from 'rxjs'

import { UserRepository } from '@/core/repositories'
import { UsersCacheMemoryRepository } from '@/data/cache-memory/users-cache-memory.repository'

import { CreateUserUseCase } from './create-user.use-case'

describe('CreateUserUseCase', () => {
  let createUserUserCase: CreateUserUseCase
  let userRepository: UserRepository

  beforeEach(() => {
    userRepository = new UsersCacheMemoryRepository()
    createUserUserCase = new CreateUserUseCase(userRepository)
  })

  it('should be defined', () => {
    expect(createUserUserCase).toBeDefined()
  })

  it('should create a user', async () => {
    const user = createUserUserCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(lastValueFrom(user)).resolves.toEqual({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com'
    })
  })
})
