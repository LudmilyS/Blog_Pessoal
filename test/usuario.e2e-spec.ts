import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

//explicação rápida do que o teste vai fazer
describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let app: INestApplication<App>;
  let token: any;
  let usuarioId: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  //para finalizar a aplicação
  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve Cadastrar um novo Usuário', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(201);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    usuarioId = resposta.body.id;
  });

  it('02 - Não Deve Cadastrar um Usuário duplicado', async () => {
    await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(400);
  });

  it('03 - Deve autenticar o usuário (login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      })
      .expect(200);
    token = resposta.body.token;
  });

  it('04 - Deve listar todos os usuários', async () => {
    return request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .expect(200);
  });

  it('05 - Deve Atualizar um usuário', async () => {
    return (
      request(app.getHttpServer())
        .put('/usuarios/atualizar')
        .set('Authorization', `${token}`)
        .send({
          id: usuarioId,
          nome: 'Root Atualizado',
          usuario: 'root@root.com',
          senha: 'rootroot',
          foto: '-',
        })
        .expect(200)
        // Caso o HTTP Status da Resposta da Requisição seja 200, o Teste Passa
        .then((resposta) => {
          //expect( **Conteúdo Enviado** ).toEqual( **Conteúdo Recebido** )
          expect('Root Atualizado').toEqual(resposta.body.nome);
        })
    );
  });
});
