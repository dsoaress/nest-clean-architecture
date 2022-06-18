import { Module } from '@nestjs/common'

import { UserRepository } from '@/core/repositories'
import { UsersCacheMemoryRepository } from '@/data/cache-memory/users-cache-memory.repository'
import { CreateUserUseCase, GetAllUsersUseCase } from '@/use-cases/user'

import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UsersCacheMemoryRepository
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repository: UserRepository) => new CreateUserUseCase(repository),
      inject: [UserRepository]
    },
    {
      provide: GetAllUsersUseCase,
      useFactory: (repository: UserRepository) => new GetAllUsersUseCase(repository),
      inject: [UserRepository]
    }
  ]
})
export class UserModule {}
