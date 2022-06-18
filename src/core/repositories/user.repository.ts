import { Repository } from '@/core/base/repository'
import { UserEntity } from '@/core/domain/entities'

export abstract class UserRepository extends Repository<UserEntity> {}
