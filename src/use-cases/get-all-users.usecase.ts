import { Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'

import { UseCase } from '@/core/base/use-case'
import { UserCreatedMapper } from '@/core/domain/mappers/user-created.mapper'
import { UserRepository } from '@/core/repositories/user.repository'
import { UserCreatedDto } from '@/shared/dtos/user-created.dto'

@Injectable()
export class GetAllUsersUseCase implements UseCase<UserCreatedDto[]> {
  private userCreatedMapper: UserCreatedMapper

  constructor(private readonly repository: UserRepository) {
    this.userCreatedMapper = new UserCreatedMapper()
  }

  public execute(): Observable<UserCreatedDto[]> {
    return this.repository.getAll().pipe(map(data => data.map(this.userCreatedMapper.mapTo)))
  }
}
