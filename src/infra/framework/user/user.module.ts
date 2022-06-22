import { Module } from '@nestjs/common'

import { UserRepository } from '@/core/repositories'
import { PrismaService } from '@/infra/data/prisma/prisma.service'
import { UsersPrismaRepository } from '@/infra/data/prisma/users-prisma.repository'
import { CreateUserUseCase, GetAllUsersUseCase } from '@/use-cases/user'

import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useFactory: (prisma: PrismaService) => new UsersPrismaRepository(prisma),
      inject: [PrismaService]
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
