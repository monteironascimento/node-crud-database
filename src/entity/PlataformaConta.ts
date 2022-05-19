import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PlataformaConta{

    @PrimaryGeneratedColumn()
    idPlataformaConta: number; 

    @PrimaryColumn()
    idPlataforma: number; 

    @Column({nullable: true, length: 500})
    descricao: string; 

    @Column()
    tpServico: number;  //1-LOMADEE - 2-AWIN - 3-INSTAGRAM 4-FACBOOCK 5-WATSAPP - 6-TELEGRAM  7-EMAIL 8-WORDPRESS 9-APLICATIVO

    @Column({nullable: true})
    idPlataformaOrigem: number; 

    @Column({nullable: true})
    tpServicoOrigem: number;  //1-LOMADEE - 2-AWIN - 3-INSTAGRAM 4-FACBOOCK 5-WATSAPP - 6-TELEGRAM  7-EMAIL 8-WORDPRESS 9-APLICATIVO

    @Column()
    tpInformacao: number; //1-LOJA 2-CATEGORIA 3-OFERTA 4-CUPONS

    @Column({nullable: true, length: 1000})
    url: string;

    @Column({nullable: true, length: 1000})
    urlAuxiliar: string;

    @Column({nullable: true, length: 200})
    token: string;   

    @Column({nullable: true, length: 200})
    sourceId: string; 

    @Column({nullable: true, length: 200})
    mscdId: string;   //IDENTIFICADOR NA LOMADEE DO DESTINO DA PLATAFORMA

    @Column({nullable: true, length: 200})
    username: string;

    @Column({nullable: true, length: 200})
    password: string;

    @Column({nullable: true, length: 1000})
    tags: string;

    @Column({nullable: true, length: 1000})
    descricaoPost: string;

    @Column({nullable: true, length: 50})
    consumerKey: string;

    @Column({nullable: true, length: 50})
    consumerSecret: string;

    @Column({nullable: true, length: 20})
    version: string;

    @Column({nullable: true, length: 20})
    country: string;

    @Column({nullable: true, length: 20})
    country_language: string;

    @Column({nullable: true, length: 20})
    currency: string;

    @Column({nullable: true})
    idChat: string;

    @Column({default: true})
    ativo: boolean;  

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}