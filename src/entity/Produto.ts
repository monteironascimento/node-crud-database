import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Produto{

    @PrimaryGeneratedColumn()
    idProduto?: number; 

    @Column({nullable: true})
    idCategoria?: number; 

    @Column({length: 1000})
    @Index({ unique: true })
    descricao?: string; 

    @Column({nullable: true, length: 1000})
    link?: string;

    @Column({nullable: true, length: 1000})
    tumbnail?: string;

    @Column({default: true})
    situacao?: boolean;  

    @Column({nullable: true})
    hasCode?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

}