import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity()
@Index("indexProcessamentoDiv", ["idPlataforma", "tipoServico", "tipoInformacao", "idOrigem"], { unique: true })
@Index("indexSincronizacaoDiv", ["idLoja", "idCategoria","idOrigem"], { unique: true })
export class PlataformaDivulgacao{

    @PrimaryGeneratedColumn()
    idPlataformaContaProcessado: BigInteger; //SEQUENCIAL CHAVE

    @Column({nullable: true})
    idPlataforma?: number; //1 - LOMADEE 2-OFERTABEST   

    @Column({nullable: true})
    idSincronizacao?: number; 

    @Column({nullable: true})
    tipoServico?: number; 

    @Column({nullable: true})
    tipoInformacao?: number;

    @Column({nullable: true})
    idLoja?: number; 

    @Column({nullable: true})
    idCategoria?: number; 

    @Column({nullable: true})
    idOrigem?: number; 

    @Column({nullable: true})
    idDestino?: string;

    @Column({nullable: true, length: 1000})
    urlDestino?: string;

    @Column({nullable: true, length: 1000})
    urlDestinoShort?: string;

    @Column({nullable: true, length: 1000})
    thumbnailDestino?: string;

    @Column({nullable: true, length: 5000})
    priceHtml?: string;

    @Column({default: 0})
    tpProcesso?: string;  // 0- INCLUSAO 1- ALTERACAO 2-EXCLUSAO

    @Column({nullable: true})
    hasCode?: string

    @Column({nullable: true, length: 5000})
    dsErro?: string;

    @CreateDateColumn()
    @Index()
    created_at?: Date;

    @UpdateDateColumn()
    @Index()
    updated_at?: Date;

}