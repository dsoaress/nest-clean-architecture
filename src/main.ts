import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = app.get(Logger)

  await app.listen(3000).then(() => logger.log('Listening on port 3000', 'Bootstrap'))
}

bootstrap()
