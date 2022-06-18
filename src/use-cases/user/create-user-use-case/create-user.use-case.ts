import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { UseCase } from '@/core/base/use-case'
import { CreatedUserMapper } from '@/core/domain/mappers'
import { CreateUserMapper } from '@/core/domain/mappers/user/create-user.mapper'
import { UserRepository } from '@/core/repositories'
import { CreatedUserDto, CreateUserDto } from '@/shared/dtos/user'

export class CreateUserUseCase implements UseCase<CreatedUserDto> {
  private CreateUserMapper: CreateUserMapper
  private CreatedUserMapper: CreatedUserMapper

  constructor(private readonly repository: UserRepository) {
    this.CreateUserMapper = new CreateUserMapper()
    this.CreatedUserMapper = new CreatedUserMapper()
  }

  public execute(user: CreateUserDto): Observable<CreatedUserDto> {
    const entity = this.CreateUserMapper.mapFrom(user)
    return this.repository.create(entity).pipe(map(this.CreatedUserMapper.mapTo))
  }
}
