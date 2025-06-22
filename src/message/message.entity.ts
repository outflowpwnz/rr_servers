import { Resource } from 'src/resource/resource.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 512 })
  text: string;

  @OneToMany(() => Resource, (resource) => resource.endMessage, { cascade: true })
  resources: Resource[]
}