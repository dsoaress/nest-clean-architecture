import { UserEntity } from '@/core/domain/entities'
import { UserRepository } from '@/core/repositories'

import { RepositoryCacheMemory } from './repository-cache-memory'

export class UsersCacheMemoryRepository
  extends RepositoryCacheMemory<UserEntity>
  implements UserRepository {}
