import { Repository } from '../base/repository'
import { UserEntity } from '../domain/entities/user.entity'

export abstract class UserRepository extends Repository<UserEntity> {}
