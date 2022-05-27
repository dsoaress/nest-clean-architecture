import { Entity } from '../../base/entity'

export class UserEntity extends Entity {
  public name: string
  public password: string
  public email: string
}
