import { Body, Controller, Get, Post } from '@nestjs/common'

import { CreateUserDto } from '@/shared/dtos/user'
import { CreateUserUseCase, GetAllUsersUseCase } from '@/use-cases/user'

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto)
  }

  @Get()
  findAll() {
    return this.getAllUsersUseCase.execute()
  }
}
