import { Controller, Get, Query,Render } from '@nestjs/common';

@Controller()
export class AppController{

  private session(auth?:string) {
    const isAuth = auth === '1';
    return {
      isAuth,
      user: isAuth ? {name: 'Алина'} : null,
    };
  }

  @Get()
  @Render('index')
  index(@Query('auth') auth?: string) {
    return this.session(auth);
  }
  @Get('auth')
  @Render('auth')
  auth(@Query('auth') auth?:string) {
    return this.session(auth);
  }
}