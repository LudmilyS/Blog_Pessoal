import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
//uma herança, a classe LocalAuthGuard está pegando o que tem na AuthGuard.
