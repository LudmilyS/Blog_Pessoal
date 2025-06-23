import { PostagemService } from './../services/postagem.service';
import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { Postagem } from '../entities/postagem.entity';

@Controller('/postagem')
export class PostagemController {
    constructor(private readonly postagemService: PostagemService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }
}