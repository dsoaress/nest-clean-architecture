import { Injectable } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { Entity } from '@/core/base/entity'
import { Repository } from '@/core/base/repository'

@Injectable()
export class RepositoryCacheMemory<TEntity extends Entity> extends Repository<TEntity> {
  protected readonly items: TEntity[]

  constructor() {
    super()
    this.items = []
  }

  public create(data: TEntity): Observable<TEntity> {
    data.id = this.items.length > 0 ? this.items.slice(-1)[0].id + 1 : 1

    const count = this.items.push(data)

    return of(this.items[count - 1])
  }

  public update(id: number, data: TEntity): Observable<TEntity> {
    const index = this.getIndexById(id)

    if (index === -1) {
      // TODO: handle the case of not finding the item to update
    }

    this.items[index] = data

    return of(this.items[index])
  }

  public patch(id: number, data: Partial<TEntity>): Observable<TEntity> {
    const index = this.getIndexById(id)

    if (index === -1) {
      // TODO: handle the case of not finding the item to update
    }

    for (const key in data) {
      this.items[index][key] = data[key]
    }

    return of(this.items[index])
  }

  public getById(id: number): Observable<TEntity> {
    const items = this.items.find(item => item.id === id)

    return of(items)
  }

  public getAll(): Observable<TEntity[]> {
    return of(this.items)
  }

  public getOne(filter: Partial<TEntity>): Observable<TEntity> {
    return this.getMany(filter).pipe(map(items => (items.length > 0 ? items[0] : null)))
  }

  public getMany(filter: Partial<TEntity>): Observable<TEntity[]> {
    let filtered = this.items

    for (const key in filter) {
      filtered = filtered.filter(item => item[key] === filter[key])
    }

    return of(filtered)
  }

  public delete(id: number): Observable<void> {
    const index = this.getIndexById(id)

    if (index === -1) {
      // TODO: handle the case of not finding the item to be deleted
    }

    this.items.splice(index, 1)
    return of()
  }

  private getIndexById(id: number) {
    return this.items.findIndex(item => item.id === id)
  }
}
