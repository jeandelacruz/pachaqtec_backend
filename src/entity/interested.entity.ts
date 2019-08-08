import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity()
export class Interested {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'name_complete' })
    public name: string;

    @Column({ name: 'email' })
    public email: string;

    @Column({ name: 'comment', type: 'text' })
    public comment: string;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt: Date;
}
