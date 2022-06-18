import { Module } from '@nestjs/common'

import { PostRepository } from '@/core/repositories'
import { PostsCacheMemoryRepository } from '@/data/cache-memory/posts-cache-memory.repository'
import { CreatePostUseCase, GetAllPostsUseCase } from '@/use-cases/post'

import { PostController } from './post.controller'

@Module({
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
})
export class PostModule {}
