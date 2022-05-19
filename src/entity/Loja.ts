import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Loja{

    @PrimaryGeneratedColumn()
    idLoja?: number;

    @Column( {nullable: true, length: 500})
    @Index({ unique: true })
    descricao: string;

    @Column( {nullable: true, type: "numeric"} )
    hasOffer?: number;

    @Column( {nullable: true, length: 1000})
    link? : string;

    @Column( {nullable: true, length: 1000})
    thumbnail? : string

    @Column( {nullable: true, type: "numeric"} )
    maxCommission? : number;

    @Column({
        default: false
    })
    ativo?: boolean;

    @Column({nullable: true})
    @Index({ unique: true })
    idLomadee?: string

    @Column({nullable: true})
    @Index({ unique: true })
    idAwixn?: string

    @Column( {nullable: true})
    idSincronizacao?: number;

    @Column({nullable: true, length: 1000})
    deeplinks?: string;

    @Column({nullable: true})
    hasCode?: string

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column({nullable: true})
    appToken?: string

    @Column({nullable: true})
    appSourceId?: string

}