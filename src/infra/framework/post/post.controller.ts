import { Body, Controller, Get, Post } from '@nestjs/common'

import { CreatePostDto } from '@/shared/dtos/post'
import { CreatePostUseCase, GetAllPostsUseCase } from '@/use-cases/post'

@Controller('posts')
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getAllPostsUseCase: GetAllPostsUseCase
  ) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.createPostUseCase.execute(createPostDto)
  }

  @Get()
  findAll() {
    return this.getAllPostsUseCase.execute()
  }
}
