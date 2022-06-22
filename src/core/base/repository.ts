import { Entity } from './entity'

export abstract class Repository<TEntity extends Entity> {
  abstract create(data: TEntity): Promise<TEntity>
  abstract update(id: number, data: TEntity): Promise<TEntity>
  abstract patch(id: number, data: Partial<TEntity>): Promise<TEntity>
  abstract getById(id: number): Promise<TEntity>
  abstract getAll(): Promise<TEntity[]>
  abstract getOne(filter: Partial<TEntity>): Promise<TEntity>
  abstract getMany(filter: Partial<TEntity>): Promise<TEntity[]>
  abstract delete(id: number): Promise<void>
}
