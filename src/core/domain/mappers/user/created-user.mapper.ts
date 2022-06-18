import { Mapper } from '@/core/base/mapper'
import { UserEntity } from '@/core/domain/entities'
import { CreatedUserDto } from '@/shared/dtos/user'

export class CreatedUserMapper implements Mapper<CreatedUserDto, UserEntity> {
  public mapFrom(data: CreatedUserDto): UserEntity {
    const user = new UserEntity()

    user.id = data.id
    user.name = data.name
    user.email = data.email

    return user
  }

  public mapTo(data: UserEntity): CreatedUserDto {
    const user = new CreatedUserDto()

    user.id = data.id
    user.name = data.name
    user.email = data.email

    return user
  }
}
