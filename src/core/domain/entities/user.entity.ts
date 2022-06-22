import { Entity } from '@/core/base/entity'

export class UserEntity extends Entity {
  name: string
  password: string
  email: string
}
