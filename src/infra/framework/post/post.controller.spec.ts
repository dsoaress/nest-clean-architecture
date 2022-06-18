import { Test, TestingModule } from '@nestjs/testing'

import { PostRepository } from '@/core/repositories'
import { PostsCacheMemoryRepository } from '@/data/cache-memory/posts-cache-memory.repository'
import { CreatePostUseCase, GetAllPostsUseCase } from '@/use-cases/post'

import { PostController } from './post.controller'

describe('PostController', () => {
  let controller: PostController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    controller = module.get<PostController>(PostController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
