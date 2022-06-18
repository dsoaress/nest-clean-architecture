import { Entity } from '@/core/base/entity'

export class PostEntity extends Entity {
  public title: string
  public content: string
  public userId: number
}
