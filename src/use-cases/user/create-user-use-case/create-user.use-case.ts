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

  public async execute(user: CreateUserDto): Promise<CreatedUserDto> {
    const entity = this.CreateUserMapper.mapFrom(user)
    const createdUser = await this.repository.create(entity)
    return this.CreatedUserMapper.mapTo(createdUser)
  }
}
