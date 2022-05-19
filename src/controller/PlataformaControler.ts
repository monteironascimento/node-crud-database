import { getConnection, getRepository } from 'typeorm';
import { PlataformaConta } from '../entity/PlataformaConta';
import { Request, Response } from 'express';
import { PlataformaContaProcessado } from '../entity/PlataformaContaProcessado';
import { TipoInformacaoEnum } from '../enum/TipoInformacaoEnum';
import { isEmpty } from '../tools/Empty';

export const findPlataformaConta = async (req: Request, res: Response) => {

    const { idPlataforma } = req.query;
    
    const objListagem = await getRepository(PlataformaConta)
    .createQueryBuilder("plataformaConta m") 
    .andWhere("idPlataforma = :paramIdPlataforma")
    .andWhere("situacao = :paramSituacao")
    .setParameters({
        paramIdPlataforma   : idPlataforma,
        paramSituacao       : true
    })
    .getMany();

    if(isEmpty(objListagem)){
        return res.json({status: "ERRO", message: `Nennuma conta vinculado a plataforma ${idPlataforma}`})
    }  

    return res.json(objListagem);
}


export const persistProcessado = async (req: Request, res: Response) => {

    let objPersiste = req.body;

    try {

        let tpSituacao = objPersiste.tpProcesso;
        
        const sql = `select * from plataforma_conta_processado c 
                        where 
                            c."idPlataforma" =  ${objPersiste.idPlataforma}
                            and c."tipoServico"=  ${objPersiste.tipoServico}
                            and  c."tipoInformacao" =  ${objPersiste.tipoInformacao}
                            and c."idOrigem" = ${objPersiste.idOrigem}  
                            --${!isEmpty(objPersiste.idLoja) ? ` and c."idLoja" = ${objPersiste.idLoja}` : '' }
                            --${!isEmpty(objPersiste.idCategoria) ? ` and c."idCategoria" = ${objPersiste.idCategoria}` : '' }
                `
     
        const objExistente = await getConnection().query(sql);

        if(!isEmpty(objExistente)){
            tpSituacao = 'A'
            objPersiste.idPlataformaContaProcessado = objExistente[0].idPlataformaContaProcessado
        }else{
            tpSituacao = 'I'
        }

          
        if(tpSituacao === 'I'){
            objPersiste = await getRepository(PlataformaContaProcessado).save(objPersiste);
        }else if(tpSituacao === 'A'){
            await getRepository(PlataformaContaProcessado).update( objPersiste.idPlataformaContaProcessado, objPersiste)
            objPersiste = await getRepository(PlataformaContaProcessado).find({ idPlataformaContaProcessado: objPersiste.idPlataformaContaProcessado}); 
        }else if(tpSituacao === 'A' && objPersiste.tpProcesso === 'D'){
            await getRepository(PlataformaContaProcessado).delete(objPersiste.idPlataformaContaProcessado ); 
            objPersiste = { status:"OK", message: 'Deletado com Sucesso!'}
        }
    } catch (error) {
    }

    return res.json(objPersiste);
}


export const persistProcessadoLista = async (req: Request, res: Response) => {

    for (const key in req.body) {

        try {
            
            let objPersiste = req.body[key]

            let tpSituacao = objPersiste.tpProcesso;
            const sql = `select * from plataforma_conta_processado c 
                            where 
                                c."idPlataforma" =  ${objPersiste.idPlataforma}
                                and c."tipoServico"=  ${objPersiste.tipoServico}
                                and  c."tipoInformacao" =  ${objPersiste.tipoInformacao}
                                and c."idOrigem" = ${objPersiste.idOrigem}  ${!isEmpty(objPersiste.idLoja) ? ` and c."idLoja" = ${objPersiste.idLoja}` : '' }
                            ${!isEmpty(objPersiste.idCategoria) ? ` and c."idCategoria" = ${objPersiste.idCategoria}` : '' }
                `
                                
            const objExistente = await getConnection().query(sql);
        
            if(!isEmpty(objExistente)){
                tpSituacao = 'A'
                objPersiste.idPlataformaContaProcessado = objExistente[0].idPlataformaContaProcessado
            }else{
                tpSituacao = 'I'
            }
            
            if(tpSituacao === 'I'){
                objPersiste = await getRepository(PlataformaContaProcessado).save(objPersiste);
            }else if(tpSituacao === 'A'){
                await getRepository(PlataformaContaProcessado).update( objPersiste.idPlataformaContaProcessado, objPersiste)
                objPersiste = await getRepository(PlataformaContaProcessado).find({ idPlataformaContaProcessado: objPersiste.idPlataformaContaProcessado}); 
            }else if(objPersiste.tpProcesso === 'D'){
                await getRepository(PlataformaContaProcessado).delete(objPersiste.idPlataformaContaProcessado ); 
                objPersiste = { status:"OK", message: 'Deletado com Sucesso!'}
            }
        } catch (error) {
                
        }
    }

    return res.status(200).json("OK");
}

export const findPenpDivulgacao = async (req: Request, res: Response) => {

    const objConta = req.body;
    let limit: any = req.query.limit
    let offset: any = req.query.offset
    let listCatPai: any = req.query.listCatPai
    let fixado: any = req.query.fixado
    let destaque: any = req.query.destaque

    if(isEmpty(limit)){
        limit = 2000;
    }

    if(isEmpty(offset)){
        offset = 0;
    }

    const sql = `
                select 
                (CASE
                    WHEN f."idOferta" is not null THEN 'O'
                    ELSE  'C'  
                END) as tipoOrigem,
                (CASE
                    WHEN f."idOferta" is not null THEN f."idOferta"
                    ELSE  cu."idCupon" 
                END) as idOrigem,
                (CASE
                    WHEN f."idOferta" is not null THEN f."nomeLojaLomadee"
                    ELSE  cu."nomeLojaLomadee" 
                END) as nomeloja,
                (CASE
                    WHEN f."idOferta" is not null THEN f."descricao"
                    ELSE  cu."descricao" 
                END) as descricao,
                p."urlDestino" as link,
                p."urlDestinoShort" as linkshort,
                (CASE
                    WHEN f."idOferta" is not null THEN f."thumbnail"
                    ELSE  cu."thumbnailLojaLomadee"
                END) as thumbnail,
                (CASE
                    WHEN f."idOferta" is not null THEN f."nomeCategoria"
                    ELSE  cu."nomeCategoria"
                END) as nomecategoria,

                (CASE
                    WHEN f."idOferta" is not null THEN cast(f."disconto" AS NUMERIC(15, 2))
                    ELSE  cast(cu."disconto" AS NUMERIC(15, 2))
                END) as disconto,
                cast(f."disconto" AS NUMERIC(15, 0))  as pcdesconto,
                cast(f."preco" AS NUMERIC(15, 2))  as preco ,
                (CASE
                    WHEN f."idOferta" is not null THEN cast(( (f."preco" * 100 ) / ( 100 - f."disconto") ) AS NUMERIC(15, 2)) 
                END) as precototal,
                cu."code" as cupon,
                
                cu."dataVigencia",

                p."idCategoria",
                p."idLoja",    
                p."idPlataformaContaProcessado",
                p."idPlataforma",
                p."idPlataformaConta",
                p."idProcessamentoOrigem",
                p."idSincronizacao",
                p."tipoServico",
                p."idOrigem",
                p."hasCode"
                
                from plataforma_conta_processado p
                    left join oferta f on (f."idOferta" = p."idOrigem" and  p."tipoInformacao" = ${TipoInformacaoEnum.OFERTA})
                    left join cupon cu on (cu."idCupon" = p."idOrigem" and p."tipoInformacao" = ${TipoInformacaoEnum.CUPONS}) 
                    left join categoria catOferta on (catOferta."idCategoria" = f."idCategoria")     
                    left join categoria catCupon on (catCupon."idCategoria" = cu."idCategoria")     

                where p."idPlataforma" = ${objConta.idPlataforma} 
                    ${getWhereDivulgacao(
                        objConta,
                        fixado, 
                        destaque,
                        listCatPai)}

                limit ${limit} offset ${offset}		
                `

    const filter = await getConnection().query(sql);
    return res.status(200).json(filter);
}

function getWhereDivulgacao(
    objConta: any, 
    fixado: boolean, 
    destaque: boolean, 
    listCatPai: any){

    const date = new Date();
    const mes = date.getMonth() + 1;

    if(fixado){

        return `and  p.created_at >= '${date.getFullYear()}-${(mes < 10 ? `0${mes}` : mes)}-${(date.getDate() < 10 ? `0${date.getDate()}` : date.getDate())}'
                and  (f."fixado" = 'T' or cu."fixado" = 'T')
                ${!isEmpty ? ` and ( catOferta."idCategoriaPai" in (${listCatPai}) or catCupon."idCategoriaPai" in (${listCatPai}) )` : ''}
                and  p."tipoInformacao" in (${TipoInformacaoEnum.OFERTA},${TipoInformacaoEnum.CUPONS})
                and  p."tipoServico" = ${objConta.tipoServicoOrigem} 
                and  p."idDestino" is not null 
                and  (
                    select pIns."hasCode" from plataforma_conta_processado pIns 
                        where    pIns."idPlataforma"    = p."idPlataforma" 
                            and  pIns."tipoInformacao"  = p."tipoInformacao"
                            and  pIns."tipoServico"     = ${objConta.tipoServiceDestino} 
                            and  pIns."idOrigem"        = p."idOrigem"		
                            and  pIns."idDestino"       = '${objConta.username}' 
                            --and  pIns."idLoja"          = p."idLoja"
                            --and  pIns."idCategoria"     = p."idCategoria"	
                        ) is null `

    }

    if(destaque){

        return `and  p.created_at >= '${date.getFullYear()}-${(mes < 10 ? `0${mes}` : mes)}-${(date.getDate() < 10 ? `0${date.getDate()}` : date.getDate())}'
                and  (f."destaque" = 'T' or cu."destaque" = 'T')
                ${!isEmpty ? ` and ( catOferta."idCategoriaPai" in (${listCatPai}) or catCupon."idCategoriaPai" in (${listCatPai}) )` : ''}
                and  p."tipoInformacao" in (${TipoInformacaoEnum.OFERTA},${TipoInformacaoEnum.CUPONS})
                and  p."tipoServico" = ${objConta.tipoServicoOrigem} 
                and  p."idDestino" is not null 
                and  (
                    select pIns."hasCode" from plataforma_conta_processado pIns 
                        where    pIns."idPlataforma"    = p."idPlataforma" 
                            and  pIns."tipoInformacao"  = p."tipoInformacao"
                            and  pIns."tipoServico"     = ${objConta.tipoServiceDestino} 
                            and  pIns."idOrigem"        = p."idOrigem"		
                            and  pIns."idDestino"       = '${objConta.username}' 
                            --and  pIns."idLoja"          = p."idLoja"
                            --and  pIns."idCategoria"     = p."idCategoria"	
                        ) is null `

    }

    return ` and  p.created_at >= '${date.getFullYear()}-${(mes < 10 ? `0${mes}` : mes)}-${(date.getDate() < 10 ? `0${date.getDate()}` : date.getDate())}'
                and (((f."idOferta" is not null and f."preco" > 0 ${!isEmpty(listCatPai) ? ` and catOferta."idCategoriaPai" in (${listCatPai}) ` : ''} ) or f."destaque" = 'T')  or ( (cu."idCupon" is not null ${!isEmpty(listCatPai) ? ` and catCupon."idCategoriaPai" in (${listCatPai}) ` : ''}) or cu."destaque" = 'T') )
                and  p."tipoInformacao" in (${TipoInformacaoEnum.OFERTA},${TipoInformacaoEnum.CUPONS})
                and  p."tipoServico" = ${objConta.tipoServicoOrigem} 
                and  p."idDestino" is not null 
                and  (
                        select pIns."hasCode" from plataforma_conta_processado pIns 
                            where    pIns."idPlataforma"    = p."idPlataforma" 
                                and  pIns."tipoInformacao"  = p."tipoInformacao"
                                and  pIns."tipoServico"     = ${objConta.tipoServiceDestino} 
                                and  pIns."idOrigem"        = p."idOrigem"		
                                and  pIns."idDestino"       = '${objConta.username}' 
                                --and  pIns."idLoja"          = p."idLoja"
                                --and  pIns."idCategoria"     = p."idCategoria"	
                    ) is null 
        `

}



export const findPenpDivulgacaoDefinido = async (req: Request, res: Response) => {

    const objConta = req.body;
    let limit: any = req.query.limit
    let offset: any = req.query.offset

    if(isEmpty(limit)){
        limit = 1;
    }

    if(isEmpty(offset)){
        offset = 0;
    }

    const sql = `
                select 
                (CASE
                    WHEN f."idOferta" is not null THEN 'O'
                    ELSE  'C'  
                END) as tipoOrigem,
                (CASE
                    WHEN f."idOferta" is not null THEN f."idOferta"
                    ELSE  cu."idCupon" 
                END) as idOrigem,
                (CASE
                    WHEN f."idOferta" is not null THEN f."nomeLojaLomadee"
                    ELSE  cu."nomeLojaLomadee" 
                END) as nomeloja,
                (CASE
                    WHEN f."idOferta" is not null THEN f."descricao"
                    ELSE  cu."descricao" 
                END) as descricao,
                p."urlDestino" as link,
                p."urlDestinoShort" as linkshort,
                (CASE
                    WHEN f."idOferta" is not null THEN f."thumbnail"
                    ELSE  cu."thumbnailLojaLomadee"
                END) as thumbnail,
                (CASE
                    WHEN f."idOferta" is not null THEN f."nomeCategoria"
                    ELSE  cu."nomeCategoria"
                END) as nomecategoria,

                (CASE
                    WHEN f."idOferta" is not null THEN cast(f."disconto" AS NUMERIC(15, 2))
                    ELSE  cast(cu."disconto" AS NUMERIC(15, 2))
                END) as disconto,
                cast(f."disconto" AS NUMERIC(15, 0))  as pcdesconto,
                cast(f."preco" AS NUMERIC(15, 2))  as preco ,
                (CASE
                    WHEN f."idOferta" is not null THEN cast(( (f."preco" * 100 ) / ( 100 - f."disconto") ) AS NUMERIC(15, 2)) 
                END) as precototal,
                cu."code" as cupon,
                
                cu."dataVigencia",

                p."idCategoria",
                p."idLoja",    
                p."idPlataformaContaProcessado",
                p."idPlataforma",
                p."idPlataformaConta",
                p."idProcessamentoOrigem",
                p."idSincronizacao",
                p."tipoServico",
                p."idOrigem",
                p."hasCode"
                
                from plataforma_conta_processado p
                    left join oferta f on (f."idOferta" = p."idOrigem" and  p."tipoInformacao" = ${TipoInformacaoEnum.OFERTA})
                    left join cupon cu on (cu."idCupon" = p."idOrigem" and p."tipoInformacao" = ${TipoInformacaoEnum.CUPONS}) 
                    left join categoria catOferta on (catOferta."idCategoria" = f."idCategoria")     
                    left join categoria catCupon on (catCupon."idCategoria" = cu."idCategoria")     

                where p."idPlataforma" = ${objConta.idPlataforma} 
                        and p."tpProcesso" = 'F'
                        and  p."tipoInformacao"
                   

                limit 1 offset 0		
                `

    const filter = await getConnection().query(sql);
    return res.status(200).json(filter);
}





