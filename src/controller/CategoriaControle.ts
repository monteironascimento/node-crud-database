import { getConnection, getRepository } from 'typeorm';
import { Categoria } from '../entity/Categoria';
import { Request, Response } from 'express';
import { isEmpty } from '../tools/Empty';
import { hashCode } from '../enum/HasCode';

export const saveCategoriaLomadee = async (req: Request, res: Response) => {

    try{

        const listaStoresPost: any[] = [];

        for (var objS in req.body) { 
                
                const objStore = req.body[objS];
                
                const objHasCode = {
                    descricao: objStore.descricao,
                }

                const objCode = await hashCode(JSON.stringify(objHasCode).toString())

                let ativo = objStore.ativo;
                let sourceId = objStore.appSourceId;
                let appToken = objStore.appToken;
                let idLomadee = objStore.idLomadee;
                let principal = objStore.principal;
                let idCategoria = null;

                //buscar por observacao e idLomadee
                let categoria  = await getRepository(Categoria).find({ descricao: objStore.descricao});

                if(!isEmpty(categoria) && !isEmpty(categoria[0])){
                    ativo = categoria[0].ativo;
                    idCategoria = categoria[0].idCategoria;
                    principal = categoria[0].principal;

                    if(!isEmpty(categoria[0].appSourceId)){
                        sourceId = categoria[0].appSourceId;
                    }

                    if(!isEmpty(categoria[0].appToken)){
                        appToken = categoria[0].appToken;
                    }
                }
            
                const objPost = {
                    idCategoria:  idCategoria,
                    idLomadee : idLomadee,
                    descricao: objStore.descricao,
                    hasOffer: objStore.hasOffer,
                    link : objStore.link,
                    idSincronizacao : objStore.idSincronizacao,
                    hasCode: objCode,
                    ativo : ativo,
                    appToken: appToken,
                    appSourceId: sourceId,
                    principal: principal
                };
                
                listaStoresPost.push(objPost);
        }


        for (const key in listaStoresPost) {

            try {
                
                if(isEmpty(listaStoresPost[key].idCategoria)){
                    await getRepository(Categoria).save(listaStoresPost[key])        
                }else{
                    await getRepository(Categoria).update( {idCategoria: listaStoresPost[key].idCategoria },listaStoresPost[key])
                }

            } catch (error) {
                    
            }
        }
        
    }catch(error){
    }
    
    return res.status(200).json("ok");
}


export async function getCategorias(){
    const objCategoria:any = await getRepository(Categoria).find();  
    return objCategoria.data;
}

export async function findAllCategorias(){
    const objCategoria:any = await getRepository(Categoria).find({ativo: true});  
    return objCategoria.data;
}

export const findAllCategoriasPrincipal = async (req: Request, res: Response) => {
    const filter = await getConnection().query(`select * from categoria where principal = 'T' and ativo = 'T';`);
    return res.json(filter);
}


export const findCategoriasPendSinc = async (req: Request, res: Response) => {

    const objConta = req.body;
    const sql = `
        select 
        (CASE
            WHEN f."idOrigem" is not null THEN 'A'
            --WHEN l.updated_at <= (current_date - INTERVAL'30 days')  THEN 'D'
            ELSE  'I'  
        END) as situacao,
        l."hasCode" as hasCodeOrigem,
        l."descricao" as descricaocategoria   ,

        l."descricao",
        l."idCategoria",
        f."idPlataformaContaProcessado"

        from categoria l 

            left join plataforma_conta_processado f on (
                        f."idPlataforma" = ${objConta.idPlataforma} 
                        and f."tipoInformacao" = ${objConta.tipoInformacao}
                        and f."tipoServico" = ${objConta.tipoServico} 
                        and f."idOrigem" = l."idCategoria")
            
            where 
                     l.ativo = 'T' 
               and  l.principal = 'T' 
               and f."hasCode" is null -- apenas inclusao 

            order by l."idCategoria"          
    `

    const filter = await getConnection().query(sql);
    return res.json(filter);
}

export const findCategoriasAtivas = async (req: Request, res: Response) => {
    const sql = `select * from categoria where "ativo" = 'T'`
    const filter = await getConnection().query(sql);
    return res.json(filter);
}


export const findCategoriasAtivasLimit = async (req: Request, res: Response) => {
    const limit = req.query.limit
    const offset = req.query.offset
    const sql = `select * from categoria where "ativo" = 'T' limit ${limit} offset ${offset}`
    const filter = await getConnection().query(sql);
    return res.json(filter);
}

