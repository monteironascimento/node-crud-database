import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SincronizacaoTipoInformacao{

    @PrimaryGeneratedColumn()
    idSincronizacaoTipoInformacao?: number; //SEQUENCIAL CHAVE

    @Column()
    idPlataforma?: number; 

    @Column()
    idPlataformaConta?: number; 

    @Column()
    tipoServico?: number; 

    @Column()
    tipoInformacao?: number; 
    
    @Column()
    idSincronizacao?: number; 

    @Column({type: 'timestamp', nullable: true})
    dataProcessamentoInicio?: string; 

    @Column({type: 'timestamp', nullable: true})
    dataProcessamentoFim?: string; 
    
    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

}