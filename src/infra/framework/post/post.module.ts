import { Module } from '@nestjs/common'

import { PostRepository } from '@/core/repositories'
import { PostsPrismaRepository } from '@/infra/data/prisma/posts-prisma.repository'
import { PrismaService } from '@/infra/data/prisma/prisma.service'
import { CreatePostUseCase, GetAllPostsUseCase } from '@/use-cases/post'

import { PostController } from './post.controller'

@Module({
  controllers: [PostController],
  providers: [
    PrismaService,
    {
      provide: PostRepository,
      useFactory: (prisma: PrismaService) => new PostsPrismaRepository(prisma),
      inject: [PrismaService]
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
