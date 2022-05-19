import { getConnection, getConnectionManager, getRepository, IsNull } from 'typeorm';
import { Loja } from '../entity/Loja';
import { Request, Response } from 'express';
import { isEmpty } from '../tools/Empty';
import { hashCode } from '../enum/HasCode';

export const saveLojaLomadee = async (req: Request, res: Response) => {

    try{

        const listaStoresPost: any[] = [];

        for (var objS in req.body) { 
                
                const objStore = req.body[objS];

                const objHasCode = {
                    descricao: objStore.descricao,
                }

                const hasCode = await hashCode(JSON.stringify(objHasCode).toString())

                let ativo = objStore.ativo;
                let sourceId = objStore.appSourceId;
                let appToken = objStore.appToken;
                let idLoja = objStore.idLoja;
                let idLomadee = objStore.idLomadee

                let loja  = await getRepository(Loja).find({ descricao: objStore.descricao});  
               
                if(!isEmpty(loja) && !isEmpty(loja[0])){
                    
                    ativo = loja[0].ativo;
                    idLoja = loja[0].idLoja;

                    if(!isEmpty(loja[0].appSourceId)){
                        sourceId = loja[0].appSourceId;
                    }

                    if(!isEmpty(loja[0].appToken)){
                        appToken = loja[0].appToken;
                    }

                    //const ids = `${objStore.idLomadee},${loja[0].idLomadee}`.split(',')
                    //idLomadee = ids.filter((este, i) => ids.indexOf(este) === i); 
                }
            
                const objPost = {
                    idLoja: idLoja,
                    idLomadee : idLomadee,
                    descricao: objStore.descricao,
                    hasOffer: objStore.hasOffer,
                    link : objStore.link,
                    thumbnail: objStore.thumbnail,
                    maxCommission: objStore.maxCommission,
                    idSincronizacao : objStore.idSincronizacao,
                    hasCode: hasCode,
                    ativo: ativo,
                    appToken: appToken,
                    appSourceId: sourceId,
                   
                };

                listaStoresPost.push(objPost);
        }

        for (const key in listaStoresPost) {

            try {
                
                if(isEmpty(listaStoresPost[key].idLoja )){
                    await getRepository(Loja).save(listaStoresPost[key])        
                }else{
                    await getRepository(Loja).update( {idLoja: listaStoresPost[key].idLoja },listaStoresPost[key])
                }

            } catch (error) {
                    
            }
        }

    }catch(error){
      
    }
    
    return res.json("OK");
}

export const findAllLojas = async (req: Request, res: Response) => {

    const objLoja = await getRepository(Loja).find({ ativo: true});  

    if(isEmpty(objLoja)){
        return res.status(200).json("OK")
    }  
    return res.json(objLoja);
}

export async function getLojas(){
    const objLoja:any = await getRepository(Loja).find();  
    return objLoja.data;
}


export const findLojasPendSinc = async (req: Request, res: Response) => {

    const objConta = req.body;
    const sql = `
        select 
        (CASE
            WHEN f."idOrigem" is not null THEN 'A'
            --WHEN l.updated_at <= (current_date - INTERVAL'30 days')  THEN 'D'
            ELSE  'I'  
        END) as situacao,
        l."hasCode" as hasCodeOrigem,
        l."idLoja", 
        l."thumbnail",
        l."descricao",
        f."idPlataformaContaProcessado"
        from loja l 
            left join plataforma_conta_processado f on (
                        f."idPlataforma" = ${objConta.idPlataforma} 
                        and f."tipoInformacao" = ${objConta.tipoInformacao}
                        and f."tipoServico" = ${objConta.tipoServico} 
                        and f."idOrigem" = l."idLoja")
            
            where 
                l.ativo = 'T' 
                and f."hasCode" is null -- apenas inclusao 
            order by l."idLoja"  
    `
    const filter = await getConnection().query(sql);
    return res.json(filter);
}