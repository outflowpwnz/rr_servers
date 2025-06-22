import { Message } from 'src/message/message.entity';
import { TgUser } from 'src/tg-user/tg-user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  description: string

  @Column({ length: 256 })
  url: string;

  @Column('boolean')
  isFree: boolean;

  @ManyToOne(() => TgUser, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  tgUser: TgUser | null

  @ManyToOne(() => Message, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  endMessage: Message | null

  @UpdateDateColumn()
  updatedAt: Date;
}