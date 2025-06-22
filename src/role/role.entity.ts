import { TgUser } from 'src/tg-user/tg-user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, unique: true })
  name: string;

  @OneToMany(() => TgUser, (tgUser) => tgUser.role, { cascade: true })
  tgUsers: TgUser[]
}