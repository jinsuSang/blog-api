import { HttpModule, Module } from '@nestjs/common'
import { WriterController } from './app.controller'
import { WriterService } from './writer.service'

@Module({
  imports: [HttpModule],
  controllers: [WriterController],
  providers: [WriterService],
})
export class AppModule {}
