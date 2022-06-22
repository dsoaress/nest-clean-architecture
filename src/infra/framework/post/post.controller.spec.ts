import { Test, TestingModule } from '@nestjs/testing'

import { PostRepository, UserRepository } from '@/core/repositories'
import { PostsCacheMemoryRepository } from '@/infra/data/cache-memory/posts-cache-memory.repository'
import { UsersCacheMemoryRepository } from '@/infra/data/cache-memory/users-cache-memory.repository'
import { CreatePostUseCase, GetAllPostsUseCase } from '@/use-cases/post'
import { CreateUserUseCase, GetAllUsersUseCase } from '@/use-cases/user'

import { UserController } from '../user/user.controller'
import { PostController } from './post.controller'

describe('PostController', () => {
  let userController: UserController
  let postController: PostController

  const title = 'Post title'
  const content = 'Post content'
  const userId = 1

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

    const postModule: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostRepository,
          useClass: PostsCacheMemoryRepository
        },
        {
          provide: CreatePostUseCase,
          useFactory: (repository: PostRepository) => new CreatePostUseCase(repository),
          inject: [PostRepository]
        },
        {
          provide: GetAllPostsUseCase,
          useFactory: (repository: PostRepository) => new GetAllPostsUseCase(repository),
          inject: [PostRepository]
        }
      ]
    }).compile()

    userController = userModule.get<UserController>(UserController)
    postController = postModule.get<PostController>(PostController)

    await userController.create({ name, email, password })
  })

  it('should be defined', () => {
    expect(postController).toBeDefined()
  })

  it('should create a post', async () => {
    const post = await postController.create({ title, content, userId })
    expect(post).toEqual({ id: 1, title, content, userId })
  })

  it('should get all posts', async () => {
    await postController.create({ title, content, userId })
    const posts = await postController.findAll()
    expect(posts).toEqual([{ id: 1, title, content, userId }])
  })
})
