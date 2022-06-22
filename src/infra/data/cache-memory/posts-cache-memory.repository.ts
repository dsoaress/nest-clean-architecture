import { PostEntity } from '@/core/domain/entities'
import { PostRepository } from '@/core/repositories'

import { RepositoryCacheMemory } from './repository-cache-memory'

export class PostsCacheMemoryRepository
  extends RepositoryCacheMemory<PostEntity>
  implements PostRepository {}
