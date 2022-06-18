import { Logger, Module } from '@nestjs/common'

import { PostModule } from './post/post.module'
import { UserModule } from './user/user.module'

@Module({
  providers: [Logger],
  imports: [UserModule, PostModule]
})
export class AppModule {}
