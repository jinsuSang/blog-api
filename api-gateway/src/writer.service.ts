import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { SignupDto } from './dto/writer.dto'

@Injectable()
export class WriterService {
  constructor(@Inject('WRITER_SERVICE') private client: ClientProxy) {}

  signup(data: SignupDto) {
    return this.client.emit('signup', data)
  }

  login() {
    return this.client.emit('login', {})
  }

  logout() {
    return this.client.emit('logout', {})
  }

  withdraw() {
    return this.client.emit('withdraw', {})
  }

  searchWriter() {
    return this.client.emit('me', {})
  }

  searchAllWriters() {
    return this.client.emit('all', {})
  }
}
