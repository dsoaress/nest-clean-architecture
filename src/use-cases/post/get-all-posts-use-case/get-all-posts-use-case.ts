import { map, Observable } from 'rxjs'

import { UseCase } from '@/core/base/use-case'
import { CreatedPostMapper } from '@/core/domain/mappers'
import { PostRepository } from '@/core/repositories'
import { CreatedPostDto } from '@/shared/dtos/post'

export class GetAllPostsUseCase implements UseCase<CreatedPostDto[]> {
  private CreatedPostMapper: CreatedPostMapper

  constructor(private readonly repository: PostRepository) {
    this.CreatedPostMapper = new CreatedPostMapper()
  }

  public execute(): Observable<CreatedPostDto[]> {
    return this.repository.getAll().pipe(map(data => data.map(this.CreatedPostMapper.mapTo)))
  }
}
