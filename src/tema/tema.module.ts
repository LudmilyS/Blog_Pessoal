import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemaController } from './controllers/tema.controller';
import { Tema } from './entities/tema.entity';
import { TemaService } from './services/tema.service';

//O decorator traz a configuração dele para o projeto
@Module({
  imports: [TypeOrmModule.forFeature([Tema])],
  providers: [TemaService],
  controllers: [TemaController],
  exports: [TemaService],
})
export class TemaModule {}
