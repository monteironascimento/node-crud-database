import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { isEmpty } from '../tools/Empty';
import { Sincronizacao } from '../entity/Sincronizacao';
import { SincronizacaoTipoInformacao } from '../entity/SincronizacaoTipoInformacao';

export const startSincronizacao = async (req: Request, res: Response) => {

    const objRecebido = req.body;

    let objPersistencia: Sincronizacao ={
        idPlataforma: objRecebido.idPlataforma, 
        idPlataformaConta: objRecebido.idPlataformaConta,    //1 - LOMADEE URL ETC...  //WORDPRESS - INSTAGRAM - WATSAPP - LOMADEE - TELEGRAM - EMAIL 
        tipoServico: objRecebido.tipoServico,   
        tipoInformacao: objRecebido.tipoInformacao,          //1-LOJA 2-CATEGORIA 3-CUPON 4-OFERTA 
        dataProcessamentoInicio: objRecebido.dataProcessamentoInicio,  
    }

    const objRetorno = await getRepository(Sincronizacao).save(objPersistencia);

    return res.json(objRetorno);
}

export const finalizaSincronizacao = async (req: Request, res: Response) => {

    try {

        const objRecebido = req.body;

        let objPersistencia: Sincronizacao ={
            idSincronizacao: objRecebido.idSincronizacao,
            situacao: (isEmpty(objRecebido.descricaoErro) ? 1 : 2),                         
            dataProcessamentoFim: objRecebido.dataProcessamentoFim ,
            descricaoErro: (isEmpty(objRecebido.descricaoErro) ? "" : objRecebido.descricaoErro)
        }

        await getRepository(Sincronizacao).update(objPersistencia.idSincronizacao , objPersistencia);
        const objRetorno = await getRepository(Sincronizacao).findOne(objPersistencia.idSincronizacao);


        const objRetornoLogData: any = 
                    await getRepository(SincronizacaoTipoInformacao).find({ 
                                                                idPlataforma: objRetorno.idPlataforma, 
                                                                idPlataformaConta: objRetorno.idPlataformaConta,
                                                                tipoServico: objRetorno.tipoServico,
                                                                tipoInformacao: objRetorno.tipoInformacao 
                                                            });     
                                                            
            const objRetornoLog : SincronizacaoTipoInformacao =  objRetornoLogData[0] ;                                           

            if(isEmpty(objRetornoLog)){
                
                const objNew: SincronizacaoTipoInformacao = {
                    idPlataforma: objRetorno.idPlataforma,
                    idPlataformaConta: objRetorno.idPlataformaConta ,
                    tipoServico: objRetorno.tipoServico,
                    tipoInformacao: objRetorno.tipoInformacao,
                    idSincronizacao: objRetorno.idSincronizacao,
                    dataProcessamentoInicio: objRetorno.dataProcessamentoInicio,  
                    dataProcessamentoFim: objRetorno.dataProcessamentoFim ,
                }
                await getRepository(SincronizacaoTipoInformacao).save(objNew);
            }else{
                
                const objUpdate:SincronizacaoTipoInformacao =  {
                    idSincronizacao: objRetorno.idSincronizacao ,
                    dataProcessamentoInicio: objRetorno.dataProcessamentoInicio,  
                    dataProcessamentoFim: objRetorno.dataProcessamentoFim ,
                }
                await getRepository(SincronizacaoTipoInformacao).update( objRetornoLog.idSincronizacaoTipoInformacao , objUpdate);
            }

        if(!isEmpty(objRecebido.descricaoErro)){
            //ENVIAR EMAIL COM ERRO
        }
    } catch (error) {
            
    }


    return res.json("OK");
}


