import { Observable } from 'rxjs'

import { Entity } from './entity'

export abstract class Repository<TEntity extends Entity> {
  abstract create(data: TEntity): Observable<TEntity>
  abstract update(id: number, data: TEntity): Observable<TEntity>
  abstract patch(id: number, data: Partial<TEntity>): Observable<TEntity>
  abstract getById(id: number): Observable<TEntity>
  abstract getAll(): Observable<TEntity[]>
  abstract getOne(filter: Partial<TEntity>): Observable<TEntity>
  abstract getMany(filter: Partial<TEntity>): Observable<TEntity[]>
  abstract delete(id: number): Observable<void>
}
