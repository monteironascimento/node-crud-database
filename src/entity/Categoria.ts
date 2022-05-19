import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Categoria{

    @PrimaryGeneratedColumn()
    idCategoria?: number;

    @Column({nullable: true, default: 1})
    idCategoriaPai?: number;

    @Column( {nullable: true})
    @Index({ unique: true })
    descricao?: string;

    @Column( {nullable: true})
    hasOffer?: number;

    @Column( {nullable: true, length: 1000 })
    link?: string;

    @Column({
        default: false
    })
    @Index()
    ativo?: boolean;

    @Column({
        default: false
    })
    @Index()
    principal?: boolean;

    @Column( {nullable: true})
    @Index({ unique: true })
    idLomadee?: string

    @Column({nullable: true})
    @Index({ unique: true })
    idAwin?: string

    @Column( {nullable: true})
    idSincronizacao?: number;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column({nullable: true, length: 1000})
    deeplinks?: string;

    @Column({nullable: true, length: 200})
    hasCode?: string

    @Column({nullable: true})
    appToken?: string

    @Column({nullable: true})
    appSourceId?: string
}