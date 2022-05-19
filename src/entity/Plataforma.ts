import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Plataforma{

    @PrimaryColumn()
    idPlataforma: number; 

    @Column({nullable: true, length: 500})
    descricao: string; //PRODUTO EXEMPLO OFERTABEST - CUPONBEST - MONTEIROBLOG 

    @Column({nullable: true, length: 500})
    mscdId: string;   

    @Column({default: true})
    ativo: boolean;  

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}