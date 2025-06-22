import { Role } from 'src/role/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class TgUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  name: string;

  @Column('int')
  tgId: number;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn()
  role: Role
}