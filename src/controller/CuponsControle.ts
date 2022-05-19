import { getConnection, getRepository, IsNull } from 'typeorm';
import { Loja } from '../entity/Loja';
import { Cupon } from '../entity/Cupon';
import { Request, Response } from 'express';
import { Categoria } from '../entity/Categoria';
import { isEmpty } from '../tools/Empty';
import { Produto } from '../entity/Produto';
import { hashCode } from '../enum/HasCode';
import { TipoInformacaoEnum } from '../enum/TipoInformacaoEnum';

export const saveCuponLomadeeePagina = async (req: Request, res: Response) => {

    try{

        let listaCupons: any[] = req.body;

        let listaCuponspost: any[] = [];

        for (var objO in listaCupons) { 

            try{
                const objOffer = listaCupons[objO];
                try {
                    let findLojaLomadee =  await getRepository(Loja).find({ descricao: objOffer.nomeLojaLomadee}); 
                    let objLoja = findLojaLomadee[0];

                    if(isEmpty(objLoja)){
                        findLojaLomadee =  await getRepository(Loja).find({ idLomadee: objOffer.idLojaLomadee}); 
                        objLoja = findLojaLomadee[0];
                    }

                    if(isEmpty(objLoja)){
                        
                        const objHasCode: Loja = {
                            
                            descricao: objOffer.nomeLojaLomadee,
                        };

                        const objCode = await hashCode(JSON.stringify(objHasCode).toString())

                        const objInsertLoja: Loja = {
                            idLomadee : objOffer.idLojaLomadee,
                            descricao: objOffer.nomeLojaLomadee,
                            link : objOffer.linkLojaLomadee,
                            thumbnail: objOffer.thumbnailLojaLomadee,
                            idSincronizacao : objOffer.idSincronizacao,
                            hasCode: objCode.toString(),
                            appToken : objOffer.appToken,
                            appSourceId: objOffer.appSourceId, 
                        };

                        objLoja = await getRepository(Loja).save(objInsertLoja); 

                    }else{
                        
                    }
                    objOffer.idLoja = objLoja.idLoja;
                } catch (error) {
                        
                }

                try {
                    let findCategoriaLomadee =  await getRepository(Categoria).find({ descricao: objOffer.nomeCategoria }); 
                    let objCategoria = findCategoriaLomadee[0];

                    if(isEmpty(objCategoria)){
                        findCategoriaLomadee =  await getRepository(Categoria).find({ idLomadee: objOffer.idCategoriaLomadee }); 
                        objCategoria = findCategoriaLomadee[0];
                    }

                    if(isEmpty(objCategoria)){

                        const objHasCode = {
                            descricao: objOffer.nomeCategoria,
                        };

                        const objCode = await hashCode(JSON.stringify(objHasCode).toString())

                        const objInsertCategoria: Categoria = {
                            idLomadee : objOffer.idCategoriaLomadee,
                            descricao: objOffer.nomeCategoria,
                            idSincronizacao : objOffer.idSincronizacao,
                            hasCode: objCode.toString(), 
                            appToken : objOffer.appToken,
                            appSourceId: objOffer.appSourceId, 

                        };
                        objCategoria = await getRepository(Categoria).save(objInsertCategoria); 
                    }
                    objOffer.idCategoria = objCategoria.idCategoria;
                } catch (error) {
                 
                }

                try {
                    const findProduto =  await getRepository(Produto).find({ descricao: objOffer.descricao}); 
                    let objProduto = findProduto[0];
                    if(isEmpty(objProduto)){

                        const objHasCode = {
                            descricao : objOffer.descricao,
                            idCategoria: objOffer.idCategoria,
                        };

                        const objCode = await hashCode(JSON.stringify(objHasCode).toString())
                        const objInsertProduto: Produto = {
                            descricao : objOffer.descricao,
                            idCategoria: objOffer.idCategoria,
                            hasCode: objCode.toString()
                        };

                        
                        objProduto = await getRepository(Produto).save(objInsertProduto); 
                    }

                    objOffer.idProduto = objProduto.idProduto;
                } catch (error) {
                 
                }

                const objHasCode = {
                    idLoja  : objOffer.idLoja,
                    idCategoria: objOffer.idCategoria,
                    idProduto: objOffer.idProduto,
                    descricao: objOffer.descricao,
                    code: objOffer.code,
                    disconto: objOffer.disconto,
                    dataVigencia: objOffer.dataVigencia,
                    link : objOffer.link,
                    idLomadee : objOffer.idLomadee,

                }   
            
                const objCode = await hashCode(JSON.stringify(objHasCode).toString())

                let idCuponExistente = null;
                try {

                    const sql = `
                    select c."idCupon" from cupon c 
                        where 	c."idLoja" = ${objOffer.idLoja}
                            and c."idCategoria" = ${objOffer.idCategoria}
                            and c."idLomadee" = '${objOffer.idLomadee}' 
                    limit 1`;
                    
                    const findCuponExistente = await getConnection().query(sql);
                    let objCupon = findCuponExistente[0];
    
                    if(!isEmpty(objCupon)){
                        idCuponExistente = objCupon.idCupon
                    }
    
                } catch (error) {
                }
                
                const objPost = {
                    idCupon: idCuponExistente,
                    idLomadee : objOffer.idLomadee,
                    idLoja: objOffer.idLoja,
                    idCategoria: objOffer.idCategoria,
                    idProduto: objOffer.idProduto,
                    descricao: objOffer.descricao,
                    code: objOffer.code,
                    disconto: objOffer.disconto,
                    dataVigencia: objOffer.dataVigencia, 
                    link : objOffer.link,
                    new: objOffer.new,
                    idSincronizacao: objOffer.idSincronizacao,
                    idLojaLomadee: objOffer.idLojaLomadee,
                    nomeLojaLomadee: objOffer.nomeLojaLomadee,
                    thumbnailLojaLomadee: objOffer.thumbnailLojaLomadee,
                    linkLojaLomadee: objOffer.linkLojaLomadee,
                    idCategoriaLomadee: objOffer.idCategoriaLomadee,
                    nomeCategoria: objOffer.nomeCategoria,
                    hasCode: objCode,
                    appToken : objOffer.appToken,
                    appSourceId: objOffer.appSourceId, 
                };

                listaCuponspost.push(objPost);
             
            }catch(error){
                    
            }

        }

        
        for (const key in listaCuponspost) {
            try {      
                let  obj = listaCuponspost[key];
                if(isEmpty(obj.idCupon)){
                    await getRepository(Cupon).save(obj); 
                }else{
                    await getRepository(Cupon).update(obj.idCupon, obj); 
                }
            } catch (error) {
                    
            }
        }

        
    }catch(error){

    }
    
    return res.json("OK");
}


export const findCuponsPendSinc = async (req: Request, res: Response) => {

    const objConta = req.body;
    const limit = req.query.limit
    const offset = req.query.offset
    const listaLojasBloqueadas = req.query.listaLojasBloqueadas
    const listaLojasPermitidas = req.query.listaLojasPermitidas

    const listaCategoriasBloqueadas = req.query.listaCategoriasBloqueadas
    const listaCategoriasPermitidas = req.query.listaCategoriasPermitidas

    const date = new Date();
    const mes = date.getMonth() + 1;

    const sql = `		
    select 
            (CASE
                WHEN f."idOrigem" is not null THEN 'A'
                --WHEN l."dataVigencia" <= (current_date)  THEN 'D'
                ELSE  'I'  
            END) as situacao,
            
            prLoja."idDestino" as idCategoriaLoja, 
            prCategoriaPai."idDestino" as idCategoriaCategoria,
            
            l."thumbnailLojaLomadee" as imagemCupon,
            l."descricao" as descricaoCupon,
            l."link" as linkCupon,
            l."nomeLojaLomadee" as descricaoloja,
            l."hasCode" as hascodeorigem,
            cat."idCategoria" as idcategoria,
                lj."idLoja" as idloja,
            l.*, f.* from cupon l 

                inner join loja lj on (lj."idLoja" = l."idLoja" and lj."ativo" = 'T')
                inner join categoria cat on (cat."idCategoria" = l."idCategoria" and cat."ativo" = 'T')
                inner join categoria catPai on (catPai."idCategoria" = cat."idCategoriaPai"  and catPai."ativo"= 'T')
            
                inner join plataforma_conta_processado prLoja on (
                                        prLoja."idPlataforma" = ${objConta.idPlataforma} 
                                and prLoja."tipoInformacao" = ${TipoInformacaoEnum.LOJA} 
                                and prLoja."tipoServico" = ${objConta.tipoServico}
                                and prLoja."idOrigem" = l."idLoja"
                    )
                inner join plataforma_conta_processado prCategoriaPai on (
                                        prCategoriaPai."idPlataforma" = ${objConta.idPlataforma} 
                                 and prCategoriaPai."tipoInformacao" = ${TipoInformacaoEnum.CATEGORIA} 
                                 and prCategoriaPai."tipoServico" = ${objConta.tipoServico}
                                 and prCategoriaPai."idOrigem" = cat."idCategoriaPai"
                                    )

                left join plataforma_conta_processado f on (
                                        f."idPlataforma" = ${objConta.idPlataforma} 
                                        and f."tipoInformacao" = ${objConta.tipoInformacao}
                                        and f."tipoServico" = ${objConta.tipoServico}
                                        and f."idOrigem" = l."idCupon"
                                        --and f."idLoja" = l."idLoja"
							            --and f."idCategoria" = l."idCategoria"
                                        )
                                        
                where 
                        l.updated_at >= '${date.getFullYear()}-${(mes < 10 ? `0${mes}` : mes)}-${(date.getDate() < 10 ? `0${date.getDate()}` : date.getDate())}'
                    and l.ativo = 'T'
                    and (f."hasCode" is null or l."hasCode" <> f."hasCode")
                    --and f."hasCode" is null  -- so novos registros`
                    /*${!isEmpty(listaLojasBloqueadas) ? getWherePorLista(listaLojasBloqueadas, "idLoja", "not in") : ''}
                    ${!isEmpty(listaLojasPermitidas) ? getWherePorLista(listaLojasPermitidas, "idLoja", "in") : ''}
                    ${!isEmpty(listaCategoriasBloqueadas) ? getWherePorLista(listaLojasBloqueadas, "idCategoria", "not in") : ''}
                    ${!isEmpty(listaCategoriasPermitidas) ? getWherePorLista(listaLojasPermitidas, "idCategoria", "in") : ''}
                    --order by l.created_at asc
     `*/
    
    const filter = await getConnection().query(sql);
    return res.json(filter);
}

function getWherePorLista(list: any, atributo: any , condicao: any){
    
    let filtro = ''

    for (const key in list) {
        if(isEmpty(filtro)){
            filtro = `${list[key]}`
        }else{
            filtro = `,${list[key]}`
        }
    }

    filtro = `and l."${atributo}" ${condicao} (${filtro})`

    return filtro;
}