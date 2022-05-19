import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
//@Index("lomadeeChaveOferta", ["idLojaLomadee", "idLomadee"], { unique: true })
@Index(["idLoja", "idCategoria", "idProduto", "descricao", "link", "thumbnail","preco","disconto"]) //, { unique: true })
@Index(["idLoja", "idCategoria", "idLomadee"], { unique: true })
export class Oferta{

    @PrimaryGeneratedColumn()
    idOferta: BigInteger;

    @Column( {nullable: true})
    idLoja?: number;

    @Column( {nullable: true})
    idCategoria?: number;

    @Column( {nullable: true})
    idProduto?: number;

    @Column({nullable: true, length: 500})
    descricao?: string;

    @Column( {nullable: true, length: 1000})
    link?: string;

    @Column( {nullable: true, length: 1000})
    thumbnail?: string;

    @Column( {nullable: true, type: "numeric"} )
    preco?: number;

    @Column( {nullable: true, type: "numeric"} )
    precoForm?: number;

    @Column( {nullable: true, type: "numeric"} )
    disconto?: number;

    @Column( {nullable: true, type: "numeric"} )
    quantidade?: number;

    @Column( {nullable: true, type: "numeric"} )
    valor?: number;

    @Column( {nullable: true, type: "numeric"} )
    hasOffer?: number;

    @Column({
        default: true
    })
    ativo: boolean;

    @Column( {nullable: true})
    idLomadee?: string

    @Column({nullable: true})
    idAwin?: string

    @Column({nullable: true})
    idSincronizacao?: number;

    @Column( {nullable: true})
    idLojaLomadee?: string

    @Column( {nullable: true})
    idCategoriaLomadee?: string

    @Column( {nullable: true, length: 500})
    nomeLojaLomadee?: string;

    @Column( {nullable: true, length: 1000})
    thumbnailLojaLomadee?: string;

    @Column( {nullable: true, length: 1000})
    linkLojaLomadee?: string;

    @Column( {nullable: true})
    invisibleLojaLomadee?: boolean;

    @Column( {nullable: true})
    needPermissionLojaLomadee?: boolean;

    @Column( {nullable: true, length: 500})
    nomeCategoria?: string;

    @Column( {nullable: true, length: 1000})
    linkCategoria?: string;

    @Column({nullable: true, length: 1000})
    deeplinks: string;

    @Column({nullable: true})
    hasCode?: string

    @CreateDateColumn()
    @Index()
    created_at: Date;

    @UpdateDateColumn()
    @Index()
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
