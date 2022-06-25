import { CreateUserMapper } from '.'

describe('CreateUserMapper', () => {
  let createUserMapper: CreateUserMapper

  const name = 'John Doe'
  const email = 'jdoe@test.com'
  const password = '123456'

  beforeEach(() => {
    createUserMapper = new CreateUserMapper()
  })

  it('should be defined', () => {
    expect(createUserMapper).toBeDefined()
  })

  it('should map from', () => {
    const user = createUserMapper.mapFrom({ name, email, password })
    expect(user).toEqual({ name, email, password })
  })

  it('should map to', () => {
    const user = createUserMapper.mapTo({ id: 1, name, email, password })
    expect(user).toEqual({ id: 1, name, email, password })
  })
})
