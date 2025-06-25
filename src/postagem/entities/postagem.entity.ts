import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  texto: string;

  @UpdateDateColumn()
  data: Date;

  //aqui diz que toda postagem tem que ter um tema / criação da coneção entre tabelas lá no DB
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE', //se deleta um tema todas as postagens vão junto com ele (efeito cascata)
  })
  tema: Tema;
}
