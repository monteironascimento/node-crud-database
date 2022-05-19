import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Index(["idLoja", "idCategoria", "idLomadee"],{ unique: true })
@Index(["idLoja", "idCategoria", "idProduto", "descricao", "code", "dataVigencia", "disconto"]) //, { unique: true })
export class Cupon{

    @PrimaryGeneratedColumn()
    idCupon: BigInteger;

    @Column( {nullable: true})
    idLoja: number;

    @Column( {nullable: true})
    idCategoria: number;

    @Column( {nullable: true})
    idProduto?: number;

    @Column( {nullable: true, length: 400})
    descricao: string;

    @Column( {nullable: true, length: 100})
    code: string;

    @Column( {nullable: true})
    disconto: number;

    @Column( {type: 'timestamp', nullable: true})
    dataVigencia?: string;

    @Column( {nullable: true, length: 1000})
    link: String;

    @Column({
        default: true
    })
    new: boolean;

    @Column({
        default: true
    })
    ativo: boolean;

    @Column( {nullable: true})
    idLomadee?: string

    @Column({nullable: true})
    idAwin?: string

    @Column( {nullable: true})
    idSincronizacao?: number;
    
    @Column( {nullable: true})
    idLojaLomadee: string;

    @Column( {nullable: true, length: 500})
    nomeLojaLomadee: string;

    @Column( {nullable: true, length: 1000})
    thumbnailLojaLomadee: string;

    @Column( {nullable: true, length: 1000})
    linkLojaLomadee: string;

    @Column( {nullable: true})
    idCategoriaLomadee: string;

    @Column( {nullable: true, length: 500})
    nomeCategoria: string;

    @Column({nullable: true, length: 1000})
    deeplinks: string;

    @Column({nullable: true, length: 200})
    hasCode?: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({nullable: true})
    appToken?: string

    @Column({nullable: true})
    appSourceId?: string
    
    @Column({
        nullable: true,
        default: false
    })
    destaque?: boolean;
    
    @Column({
        nullable: true,
        default: false
    })
    fixado?: boolean;

}
