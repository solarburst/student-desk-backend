import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vacancy: string;

  @Column()
  firstName: string;

  @Column()
  surName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  projects?: string;

  @Column({ nullable: true })
  studyPlace?: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;
}
