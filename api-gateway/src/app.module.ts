import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { WriterController } from './writer.controller'
import { WriterService } from './writer.service'

const WriterClientsModule = ClientsModule.register([
  {
    name: 'WRITER_SERVICE',
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4001,
    },
  },
])
@Module({
  imports: [WriterClientsModule],
  controllers: [WriterController],
  providers: [WriterService],
})
export class AppModule {}
