import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FTAuthGuard extends AuthGuard('42') {
  async canActivate(context: ExecutionContext) {
    try {
      console.log('Guard');
      const activate = (await super.canActivate(context)) as boolean;
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
      return activate;
    } catch (error) {
      const response = context.switchToHttp().getResponse();
      response.status(501).redirect('http://localhost:3001/auth/failure');
    }
  }
}
