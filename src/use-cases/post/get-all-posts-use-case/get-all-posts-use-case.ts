import { UseCase } from '@/core/base/use-case'
import { CreatedPostMapper } from '@/core/domain/mappers'
import { PostRepository } from '@/core/repositories'
import { CreatedPostDto } from '@/shared/dtos/post'

export class GetAllPostsUseCase implements UseCase<CreatedPostDto[]> {
  private CreatedPostMapper: CreatedPostMapper

  constructor(private readonly repository: PostRepository) {
    this.CreatedPostMapper = new CreatedPostMapper()
  }

  public async execute(): Promise<CreatedPostDto[]> {
    const posts = await this.repository.getAll()
    return posts.map(post => this.CreatedPostMapper.mapTo(post))
  }
}
