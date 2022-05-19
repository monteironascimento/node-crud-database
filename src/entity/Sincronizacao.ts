import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Sincronizacao{

    @PrimaryGeneratedColumn()
    idSincronizacao?: number; //SEQUENCIAL CHAVE

    @Column()
    idPlataforma?: number; //1 - LOMADEE 2-OFERTABEST   

    @Column()
    idPlataformaConta?: number; //1 - LOMADEE URL ETC...  //WORDPRESS - INSTAGRAM - WATSAPP - LOMADEE - TELEGRAM - EMAIL 

    @Column()
    tipoServico?: number; 

    @Column()
    tipoInformacao?: number; //1-LOJA 2-CATEGORIA 3-CUPON 4-OFERTA 

    @Column({default: 0})
    situacao?: number;  //0-PROCESSANDO 1-SINCRONIZADO 3-ERRO

    @Column({type: 'timestamp', nullable: true})
    dataProcessamentoInicio?: string; 

    @Column({type: 'timestamp', nullable: true})
    dataProcessamentoFim?: string; 

    @Column({nullable: true, length: 10000})
    descricaoErro?: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

}