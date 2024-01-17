import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index("colleges", ['name', 'country', 'c_code'])
export class College {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    country: string;
    @Column()
    c_code: string;
}