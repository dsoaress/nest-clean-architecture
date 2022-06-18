import { Repository } from '@/core/base/repository'
import { PostEntity } from '@/core/domain/entities'

export abstract class PostRepository extends Repository<PostEntity> {}
