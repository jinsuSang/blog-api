import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { WriterService } from './writer.service'

@Controller('v1/writer')
export class WriterController {
  constructor(private readonly writerService: WriterService) {}

  @Post('signup')
  signup() {
    return this.writerService.signup()
  }

  @Post('login')
  login() {
    return this.writerService.login()
  }

  @Patch('logout')
  logout() {
    return this.writerService.logout()
  }

  @Delete('withdraw')
  withdraw() {
    return this.writerService.withdraw()
  }

  @Get('me')
  searchOneWriter() {
    return this.writerService.searchWriter()
  }

  @Get('all')
  searchAllWriters() {
    return this.writerService.searchAllWriters()
  }
}
