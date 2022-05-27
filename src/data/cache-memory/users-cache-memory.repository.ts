import { Injectable } from '@nestjs/common'

import { UserEntity } from '@/core/domain/entities/user.entity'
import { UserRepository } from '@/core/repositories/user.repository'

import { RepositoryCacheMemory } from './repository-cache-memory'

@Injectable()
export class UsersCacheMemoryRepository
  extends RepositoryCacheMemory<UserEntity>
  implements UserRepository {}
