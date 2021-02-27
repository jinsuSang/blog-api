import { HttpService, Injectable } from '@nestjs/common'

@Injectable()
export class WriterService {
  constructor(private httpService: HttpService) {}

  signup() {
    return this.httpService.post('http://localhost:4000/v1/writer/signup')
  }

  login() {
    return this.httpService.post('http://localhost:4000/v1/writer/login')
  }

  logout() {
    return this.httpService.patch('http://localhost:4000/v1/writer/logout')
  }

  withdraw() {
    return this.httpService.delete('http://localhost:4000/v1/writer/withdraw')
  }

  searchWriter() {
    return this.httpService.get('http://localhost:4000/v1/writer/me')
  }

  searchAllWriters() {
    return this.httpService.get('http://localhost:4000/v1/writer/all')
  }
}
