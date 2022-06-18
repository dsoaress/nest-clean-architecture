import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { UseCase } from '@/core/base/use-case'
import { CreatedPostMapper } from '@/core/domain/mappers'
import { CreatePostMapper } from '@/core/domain/mappers/post/create-post.mapper'
import { PostRepository } from '@/core/repositories'
import { CreatedPostDto, CreatePostDto } from '@/shared/dtos/post'

export class CreatePostUseCase implements UseCase<CreatedPostDto> {
  private CreatePostMapper: CreatePostMapper
  private CreatedPostMapper: CreatedPostMapper

  constructor(private readonly repository: PostRepository) {
    this.CreatePostMapper = new CreatePostMapper()
    this.CreatedPostMapper = new CreatedPostMapper()
  }

  public execute(post: CreatePostDto): Observable<CreatedPostDto> {
    const entity = this.CreatePostMapper.mapFrom(post)
    return this.repository.create(entity).pipe(map(this.CreatedPostMapper.mapTo))
  }
}
