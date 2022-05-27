import { Logger, Module } from '@nestjs/common'

@Module({
  providers: [Logger]
})
export class AppModule {}
