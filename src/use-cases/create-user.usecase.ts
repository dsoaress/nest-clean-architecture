import { Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { UseCase } from '@/core/base/use-case'
import { UserCreateMapper } from '@/core/domain/mappers/user-create.mapper'
import { UserCreatedMapper } from '@/core/domain/mappers/user-created.mapper'
import { UserRepository } from '@/core/repositories/user.repository'
import { UserCreateDto } from '@/shared/dtos/user-create.dto'
import { UserCreatedDto } from '@/shared/dtos/user-created.dto'

@Injectable()
export class CreateUserUseCase implements UseCase<UserCreatedDto> {
  private userCreateMapper: UserCreateMapper
  private userCreatedMapper: UserCreatedMapper

  constructor(private readonly repository: UserRepository) {
    this.userCreateMapper = new UserCreateMapper()
    this.userCreatedMapper = new UserCreatedMapper()
  }

  public execute(user: UserCreateDto): Observable<UserCreatedDto> {
    const entity = this.userCreateMapper.mapFrom(user)

    return this.repository.create(entity).pipe(map(this.userCreatedMapper.mapTo))
  }
}
