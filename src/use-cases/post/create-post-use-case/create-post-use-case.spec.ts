import { PostRepository, UserRepository } from '@/core/repositories'
import { PostsCacheMemoryRepository } from '@/infra/data/cache-memory/posts-cache-memory.repository'
import { UsersCacheMemoryRepository } from '@/infra/data/cache-memory/users-cache-memory.repository'
import { CreateUserUseCase } from '@/use-cases/user'

import { CreatePostUseCase } from './create-post-use-case'

describe('CreatePostUseCase', () => {
  let createPostUseCase: CreatePostUseCase
  let postRepository: PostRepository
  let createUserUserCase: CreateUserUseCase
  let userRepository: UserRepository

  const title = 'Post title'
  const content = 'Post content'
  const userId = 1

  const name = 'John Doe'
  const email = 'johndoe@example.com'
  const password = '123456'

  beforeEach(async () => {
    postRepository = new PostsCacheMemoryRepository()
    userRepository = new UsersCacheMemoryRepository()
    createPostUseCase = new CreatePostUseCase(postRepository)
    createUserUserCase = new CreateUserUseCase(userRepository)

    await createUserUserCase.execute({ name, email, password })
  })

  it('should be defined', () => {
    expect(createPostUseCase).toBeDefined()
  })

  it('should create a post', async () => {
    const post = await createPostUseCase.execute({ title, content, userId })
    expect(post).toEqual({ id: 1, title, content, userId })
  })
})
