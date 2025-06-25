import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemController } from './controllers/postagem.controller';
import { Postagem } from './entities/postagem.entity';
import { PostagemService } from './services/postagem.service';
import { TemaModule } from '../tema/tema.module';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], //add o tema module para que possamos acessar a classe
  providers: [PostagemService],
  controllers: [PostagemController],
  exports: [],
})
export class PostagemModule {}
