import { getConnection, getRepository, IsNull } from 'typeorm';
import { Oferta } from '../entity/Oferta';
import { Request, Response } from 'express';
import { Loja } from '../entity/Loja';
import { Categoria } from '../entity/Categoria';
import { isEmpty } from '../tools/Empty';
import { Produto } from '../entity/Produto';
import { hashCode } from '../enum/HasCode';
import { TipoInformacaoEnum } from '../enum/TipoInformacaoEnum';

export const saveOfertaLomadeePagina = async (req: Request, res: Response) => {

    try{

        let listaOffers: any[] = req.body;

        let listaOffersTurbo: any[] = [];  
        
        for (var objO in listaOffers) { 

            try{
                const objOffer = listaOffers[objO];
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
                        objLoja.link = objOffer.linkLojaLomadee;
                        objLoja.thumbnail = objOffer.thumbnailLojaLomadee;
                        await getRepository(Loja).update(objLoja.idLoja ,objLoja); 
                    }
                    objOffer.idLoja = objLoja.idLoja;
                } catch (error) {
                        
                }

                try {
                    let findCategoriaLomadee =  await getRepository(Categoria).find({ descricao: objOffer.nomeCategoria}); 
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
                    idLoja: objOffer.idLoja,
                    idCategoria: objOffer.idCategoria,
                    idProduto: objOffer.idProduto,
                    descricao: objOffer.descricao,
                    preco: objOffer.preco,
                    precoForm: objOffer.precoForm,
                    disconto: objOffer.disconto,
                    valor: objOffer.valor,
                    link : objOffer.link,
                    idLomadee : objOffer.idLomadee,
                }       
            
                const objCode = await hashCode(JSON.stringify(objHasCode).toString())

                let idOfertaExistente = null;
                try {
                   
                    const sql = `
                    select f."idOferta" from oferta f
                                            where f."idLoja" = ${objOffer.idLoja}
                                                and f."idCategoria" = ${objOffer.idCategoria}
                                                and f."idLomadee" =  '${objOffer.idLomadee.replaceAll('\'', '\'\'')}'
                                            limit 1 `;
                    
                    const findOfertaExistente = await getConnection().query(sql);
                    let objOferta = findOfertaExistente[0];
    
                    if(!isEmpty(objOferta)){
                        idOfertaExistente = objOferta.idOferta
                    }
    
                } catch (error) {

                }
                
                const objPost = {
                    idOferta : idOfertaExistente,
                    idLomadee : objOffer.idLomadee,
                    idLoja: objOffer.idLoja,
                    idCategoria: objOffer.idCategoria,
                    idProduto: objOffer.idProduto,
                    descricao: objOffer.descricao,
                    hasOffer: objOffer.hasOffer,
                    link : objOffer.link,
                    thumbnail: objOffer.thumbnail,
                    preco: objOffer.preco,
                    precoForm: objOffer.priceForm,
                    disconto: objOffer.disconto,
                    quantidade: objOffer.quantidade,
                    valor: objOffer.valor,
                    idLojaLomadee: objOffer.idLojaLomadee,
                    nomeLojaLomadee: objOffer.nomeLojaLomadee,
                    thumbnailLojaLomadee: objOffer.thumbnailLojaLomadee,
                    linkLojaLomadee: objOffer.linkLojaLomadee,
                    invisibleLojaLomadee: objOffer.invisibleLojaLomadee,
                    needPermissionLojaLomadee: objOffer.needPermissionLojaLomadee,
                    idCategoriaLomadee: objOffer.idCategoriaLomadee,
                    nomeCategoria: objOffer.nomeCategoria,
                    linkCategoria: objOffer.linkCategoria,
                    idSincronizacao: objOffer.idSincronizacao,
                    hasCode: objCode,
                    appToken : objOffer.appToken,
                    appSourceId: objOffer.appSourceId, 
                };
                listaOffersTurbo.push(objPost);
             
            }catch(error){
                   
            }
        }
        
        for (const key in listaOffersTurbo) {
            try {      
                let  obj = listaOffersTurbo[key];
                if(isEmpty(obj.idOferta)){
                    await getRepository(Oferta).save(obj); 
                }else{
                    await getRepository(Oferta).update(obj.idOferta, obj); 
                }
            } catch (error) {
                    
            }
        }
            
    }catch(error){
    }
    
    return res.json("OK");
}

export const findOfertasPendSinc = async (req: Request, res: Response) => {

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
                l.thumbnail as imagemoferta,
                l."hasCode" as hascodeorigem,
                cat."idCategoria" as idcategoria,
                lj."idLoja" as idloja,
				l.*, f.*

				from oferta l 
                    inner join loja lj on (lj."idLoja" = l."idLoja" and lj."ativo" = 'T')
                    inner join categoria cat on (cat."idCategoria" = l."idCategoria" and cat."ativo" = 'T')
                    inner join categoria catPai on (catPai."idCategoria" = cat."idCategoriaPai" and catPai."ativo"= 'T')
        
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
                                    and prCategoriaPai."idOrigem" = catPai."idCategoria"
                                       )
									   
					left join plataforma_conta_processado f on (
                                f."idPlataforma" = ${objConta.idPlataforma} 
                                and f."tipoInformacao" = ${TipoInformacaoEnum.OFERTA}
                                and f."tipoServico" = ${objConta.tipoServico}
                                and f."idOrigem" = l."idOferta")
								--and f."idloja" = l."idLoja"
								--and f."idCategoria" = l."idCategoria")
                                      				
                    where 
                        l.updated_at >= '${date.getFullYear()}-${(mes < 10 ? `0${mes}` : mes)}-${(date.getDate() < 10 ? `0${date.getDate()}` : date.getDate())}'
                    and l.ativo = 'T'
                    and (f."hasCode" is null or l."hasCode" <> f."hasCode")
                    ORDER BY RANDOM() 
                    limit ${limit} offset ${offset} `
                    /*--and f."hasCode" is null  --so considerar novos registros ainda nao sincronizado
                    ${!isEmpty(listaLojasBloqueadas) ? getWherePorLista(listaLojasBloqueadas, "idLoja", "not in") : ''}
                    ${!isEmpty(listaLojasPermitidas) ? getWherePorLista(listaLojasPermitidas, "idLoja", "in") : ''}
                    ${!isEmpty(listaCategoriasBloqueadas) ? getWherePorLista(listaLojasBloqueadas, "idCategoria", "not in") : ''}
                    ${!isEmpty(listaCategoriasPermitidas) ? getWherePorLista(listaLojasPermitidas, "idCategoria", "in") : ''}
                        
            limit ${limit} offset ${offset}
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

