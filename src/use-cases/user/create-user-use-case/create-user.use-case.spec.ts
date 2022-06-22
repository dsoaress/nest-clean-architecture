import { UserRepository } from '@/core/repositories'
import { UsersCacheMemoryRepository } from '@/infra/data/cache-memory/users-cache-memory.repository'

import { CreateUserUseCase } from './create-user.use-case'

describe('CreateUserUseCase', () => {
  let createUserUserCase: CreateUserUseCase
  let userRepository: UserRepository

  const name = 'John Doe'
  const email = 'johndoe@example.com'
  const password = '123456'

  beforeEach(() => {
    userRepository = new UsersCacheMemoryRepository()
    createUserUserCase = new CreateUserUseCase(userRepository)
  })

  it('should be defined', () => {
    expect(createUserUserCase).toBeDefined()
  })

  it('should create a user', async () => {
    const user = await createUserUserCase.execute({ name, email, password })
    expect(user).toEqual({ id: 1, name, email })
  })

  // it('should throw an error if user already exists', async () => {
  //   await createUserUserCase.execute({ name, email, password })
  //   await expect(createUserUserCase.execute({ name, email, password })).rejects.toThrowError(
  //     'User already exists'
  //   )
  // })
})
