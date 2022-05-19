import { getConnection, getRepository } from "typeorm";
import { Categoria } from '../entity/Categoria'
import { Loja } from "../entity/Loja";
import { isEmpty } from "../tools/Empty";

const urlSite =  (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? 'https://ofertabest.com' : 'https://vivendocominternet.com');

export async function executarInsertOnStart (){

     try {

        const objCategoria = await getRepository(Categoria).find({ idCategoria: 1 });  
        if(isEmpty(objCategoria)){
            await getRepository(Categoria).save({
                                                    idCategoria:  1,
                                                    descricao: 'Geral',
                                                    idSincronizacao : 0,
                                                    hasCode: '1',
                                                    ativo: true,
                                                    principal: true
                                                }); 
            await getRepository(Categoria).save({
                                                    idCategoria:  2,
                                                    descricao: 'Eletrônicos',
                                                    idSincronizacao : 0,
                                                    hasCode: '2',
                                                    ativo: true,
                                                    principal: true
                                                }); 
            await getRepository(Categoria).save({
                                                    idCategoria:  3,
                                                    descricao: 'Games e PC Gamer',
                                                    idSincronizacao : 0,
                                                    hasCode: '3',
                                                    ativo: true,
                                                    principal: true
                                                }); 
            await getRepository(Categoria).save({
                                                    idCategoria:  4,
                                                    descricao: 'Produtos Digitais',
                                                    idSincronizacao : 0,
                                                    hasCode: '4',
                                                    ativo: true,
                                                    principal: true
                                                }); 

            await getRepository(Categoria).save({
                                                    idCategoria:  5,
                                                    descricao: 'Casa',
                                                    idSincronizacao : 0,
                                                    hasCode: '5',
                                                    ativo: true,
                                                    principal: true
                                                }); 
            await getRepository(Categoria).save({
                                                    idCategoria:  6,
                                                    descricao: 'Grátis',
                                                    idSincronizacao : 0,
                                                    hasCode: '6',
                                                    ativo: true,
                                                    principal: true
                                                });   
                
            await getRepository(Categoria).save({
                                                    idCategoria:  7,
                                                    descricao: 'Moda Feminia',
                                                    idSincronizacao : 0,
                                                    hasCode: '7',
                                                    ativo: true,
                                                    principal: true
                                                }); 
                                                
            await getRepository(Categoria).save({
                                                    idCategoria:  8,
                                                    descricao: 'Moda Masculina',
                                                    idSincronizacao : 0,
                                                    hasCode: '8',
                                                    ativo: true,
                                                    principal: true
                                                }); 
            
            await getRepository(Categoria).save({
                                                    idCategoria:  9,
                                                    descricao: 'Moda Infantil',
                                                    idSincronizacao : 0,
                                                    hasCode: '9',
                                                    ativo: true,
                                                    principal: true
                                                }); 

            await getRepository(Categoria).save({
                                                    idCategoria:  10,
                                                    descricao: 'Beleza e Saúde',
                                                    idSincronizacao : 0,
                                                    hasCode: '10',
                                                    ativo: true,
                                                    principal: true
                                                });   


            await getRepository(Categoria).save({
                                                    idCategoria:  11,
                                                    descricao: 'Infantil e Criança',
                                                    idSincronizacao : 0,
                                                    hasCode: '11',
                                                    ativo: true,
                                                    principal: true
                                                });   

            await getRepository(Categoria).save({
                                                    idCategoria:  12,
                                                    descricao: 'Finanças',
                                                    idSincronizacao : 0,
                                                    hasCode: '12',
                                                    ativo: true,
                                                    principal: true
                                                });   
            await getRepository(Categoria).save({
                                                    idCategoria:  13,
                                                    descricao: 'Ferramentas e Jardim',
                                                    idSincronizacao : 0,
                                                    hasCode: '13',
                                                    ativo: true,
                                                    principal: true
                                                });   

            await getRepository(Categoria).save({
                                                    idCategoria:  14,
                                                    descricao: 'Supermercado',
                                                    idSincronizacao : 0,
                                                    hasCode: '14',
                                                    ativo: true,
                                                    principal: true
                                                });   

            await getRepository(Categoria).save({
                                                    idCategoria:  15,
                                                    descricao: 'Esportes e Exercícios',
                                                    idSincronizacao : 0,
                                                    hasCode: '15',
                                                    ativo: true,
                                                    principal: true
                                                });   

            await getRepository(Categoria).save({
                                                    idCategoria:  16,
                                                    descricao: 'Assinaturas, Serviços e Delivery',
                                                    idSincronizacao : 0,
                                                    hasCode: '16',
                                                    ativo: true,
                                                    principal: true
                                                });   

            await getRepository(Categoria).save({
                                                    idCategoria:  17,
                                                    descricao: 'Automóveis',
                                                    idSincronizacao : 0,
                                                    hasCode: '17',
                                                    ativo: true,
                                                    principal: true
                                                });   


            await getRepository(Categoria).save({
                                                    idCategoria:  18,
                                                    descricao: 'Livros, Filmes e Música',
                                                    idSincronizacao : 0,
                                                    hasCode: '18',
                                                    ativo: true,
                                                    principal: true
                                                });   

            await getRepository(Categoria).save({
                                                    idCategoria:  19,
                                                    descricao: 'Plano de Telefonia',
                                                    idSincronizacao : 0,
                                                    hasCode: '19',
                                                    ativo: true,
                                                    principal: true
                                                });   

            await getRepository(Categoria).save({
                                                    idCategoria:  20,
                                                    descricao: 'Viagens',
                                                    idSincronizacao : 0,
                                                    hasCode: '20',
                                                    ativo: true,
                                                    principal: true
                                                }); 
            await getRepository(Categoria).save({
                                                    idCategoria:  21,
                                                    descricao: 'Adulto',
                                                    idSincronizacao : 0,
                                                    hasCode: '21',
                                                    ativo: true,
                                                    principal: true
                                                });   
            await getRepository(Categoria).save({
                                                    idCategoria:  22,
                                                    descricao: 'Animais',
                                                    idSincronizacao : 0,
                                                    hasCode: '22',
                                                    ativo: true,
                                                    principal: true
                                                });  


        }
    } catch (error) {
        
    } 

    try{ 
        
        await getRepository(Categoria).save({
                descricao: 'Cashback',
                idSincronizacao : 0,
                hasCode: 'MANUAL912',
                principal: true
            });  

    }catch (error) {

    }
    
    try {
        const objLoja = await getRepository(Loja).find({ idLoja: 1 });  

        if(isEmpty(objLoja)){
            await getRepository(Loja).save(
                {
                    idLoja:  1,
                    idLomadee : '0',
                    descricao: 'OfertaBest',
                    idSincronizacao : 0,
                    hasCode: '1',
                    ativo: true
                }
            );    
        }  
    } catch (error) {
        
    }

    try {
        const objLoja = await getRepository(Loja).find({ descricao: 'Magalu' });  

        if(isEmpty(objLoja)){
            await getRepository(Loja).save(
                {
                    idLomadee : '',
                    descricao: 'Magalu',
                    idSincronizacao : 0,
                    hasCode: '9999999999',
                    ativo: true
                }
            );    
        }  
    } catch (error) {
        
    }

    try {
        const objLoja = await getRepository(Loja).find({ descricao: 'Amazon' });  

        if(isEmpty(objLoja)){
            await getRepository(Loja).save(
                {
                    idLomadee : '',
                    descricao: 'Amazon',
                    idSincronizacao : 0,
                    hasCode: '9999999998',
                    ativo: true
                }
            );    
        }  
    } catch (error) {
        
    }


    try {
        const objLoja = await getRepository(Loja).find({ descricao: 'Americanas' });  

        if(isEmpty(objLoja)){
            await getRepository(Loja).save(
                {
                    idLomadee : '',
                    descricao: 'Americanas',
                    idSincronizacao : 0,
                    hasCode: '9999999997',
                    ativo: true
                }
            );    
        }  
    } catch (error) {
        
    }


    try {
        const objLoja = await getRepository(Loja).find({ descricao: 'Submarino' });  

        if(isEmpty(objLoja)){
            await getRepository(Loja).save(
                {
                    idLomadee : '',
                    descricao: 'Submarino',
                    idSincronizacao : 0,
                    hasCode: '9999999997',
                    ativo: true
                }
            );    
        }  
    } catch (error) {
        
    }


    try {
        const objLoja = await getRepository(Loja).find({ descricao: 'Shoptime' });  

        if(isEmpty(objLoja)){
            await getRepository(Loja).save(
                {
                    idLomadee : '',
                    descricao: 'Shoptime',
                    idSincronizacao : 0,
                    hasCode: '9999999996',
                    ativo: true
                }
            );    
        }  
    } catch (error) {
        
    }


    try {
        const objLoja = await getRepository(Loja).find({ descricao: 'Aliexpress' });  

        if(isEmpty(objLoja)){
            await getRepository(Loja).save(
                {
                    idLomadee : '',
                    descricao: 'Aliexpress',
                    idSincronizacao : 0,
                    hasCode: '9999999995',
                    ativo: true
                }
            );    
        }  
    } catch (error) {
        
    }
    
    try {
                             
        await getConnection().query(`INSERT INTO "plataforma" ("idPlataforma", "descricao", "mscdId", "ativo", "created_at", "updated_at")   
                                        VALUES (1, 'LOMADEE ORIGEM DE OFERTA', null, true,  now(),  now());`);
    } catch (error) {
    }

                                      
    try {
                                    
        await getConnection().query(`INSERT INTO "plataforma_conta" ("idPlataformaConta", "idPlataforma", "descricao", "tpServico", "tpInformacao", "url", "urlAuxiliar", "token", "sourceId", "mscdId", "username", 
           "password", "tags", "descricaoPost", "consumerKey", "consumerSecret", "version", "country", "country_language", "currency", "idChat", "ativo", "created_at", "updated_at")
                                        VALUES (1, 1, 'OfertasLomadee Loja', 1, 1, 'https://api.lomadee.com/v3/', 'http://localhost:3000', '1615324127221b346b417,161918425970877a96420,1614815510064693eda4f,16149076379163d862b68', '36957958',
                                                null, null, null, null, null, null, null, 'v3', 'BR', 'PR-BR', 'R$', null, true, now(),  now());`);
    } catch (error) {
    }
                                             
    try {
                                            
        await getConnection().query(`INSERT INTO "plataforma_conta" ("idPlataformaConta", "idPlataforma", "descricao", "tpServico", "tpInformacao", "url", "urlAuxiliar", "token", "sourceId", "mscdId", "username", 
           "password", "tags", "descricaoPost", "consumerKey", "consumerSecret", "version", "country", "country_language", "currency", "idChat", "ativo", "created_at", "updated_at")
               VALUES (2, 1, 'OfertasLomadee Categoria', 1, 2, 'https://api.lomadee.com/v3/', 'http://localhost:3000', '1615324127221b346b417,161918425970877a96420,1614815510064693eda4f,16149076379163d862b68', '36957958', null, null, null, null, null, null, null, 'v3', 'BR', 'PR-BR', 'R$', null, true, now(),  now());`);
    } catch (error) {
    }
                 
    try {
            
        await getConnection().query(`INSERT INTO "plataforma_conta" ("idPlataformaConta", "idPlataforma", "descricao", "tpServico", "tpInformacao", "url", "urlAuxiliar", "token", "sourceId", "mscdId", "username", 
           "password", "tags", "descricaoPost", "consumerKey", "consumerSecret", "version", "country", "country_language", "currency", "idChat", "ativo", "created_at", "updated_at")
               VALUES (3, 1, 'OfertasLomadee Ofertas', 1, 3, 'https://api.lomadee.com/v3/', 'http://localhost:3000', '1615324127221b346b417,161918425970877a96420,1614815510064693eda4f,16149076379163d862b68', '36957958', null, null, null, null, null, null, null, 'v3', 'BR', 'PR-BR', 'R$', null, true, now(),  now());`);
    } catch (error) {
    }
          
    
    try {
            
        await getConnection().query(`INSERT INTO "plataforma_conta" ("idPlataformaConta", "idPlataforma", "descricao", "tpServico", "tpInformacao", "url", "urlAuxiliar", "token", "sourceId", "mscdId", "username", 
           "password", "tags", "descricaoPost", "consumerKey", "consumerSecret", "version", "country", "country_language", "currency", "idChat", "ativo", "created_at", "updated_at")
               VALUES (4, 1, 'OfertasLomadee Cupons', 1, 4, 'https://api.lomadee.com/v3/', 'http://localhost:3000', '1615324127221b346b417,161918425970877a96420,1614815510064693eda4f,16149076379163d862b68', '36957958', null, null, null, null, null, null, null, 'v3', 'BR', 'PR-BR', 'R$', null, true, now(),  now());`);

    } catch (error) {
    }
                
    try {
            

        await getConnection().query(`INSERT INTO "plataforma" ("idPlataforma", "descricao", "mscdId", "ativo", "created_at", "updated_at")   
                                    VALUES (10, 'OFERTABEST', null, true,  now(),  now());`);

    } catch (error) {
    }
                                     
    try {
                                
        await getConnection().query(`INSERT INTO "plataforma_conta" ("idPlataformaConta", "idPlataforma", "descricao", "tpServico", "tpInformacao", "url", "urlAuxiliar", "token", "sourceId", "mscdId", "username", "password", "tags", "descricaoPost", "consumerKey", "consumerSecret", "version", "country", "country_language", "currency", "idChat", "ativo", "created_at", "updated_at")
                                    VALUES (5, 10, 'OFERTABEST WORDPRESS LOJA', 8, 1, '${urlSite}', null, null, null, null, null, null, null, null, 'ck_5193b5cad53355a278e2b9eaf5ff15e32674dbd7', 'cs_d066c316183d55f2ebaa0a5a80610e3c3c1d58b9', 'wc/v3', 'BR', 'PR-BR', 'R$', null, true, now(),  now());`);

    } catch (error) {
    }
                                   
    try {
                                
        await getConnection().query(`INSERT INTO "plataforma_conta" ("idPlataformaConta", "idPlataforma", "descricao", "tpServico", "tpInformacao", "url", "urlAuxiliar", "token", "sourceId", "mscdId", "username", "password", "tags", "descricaoPost", "consumerKey", "consumerSecret", "version", "country", "country_language", "currency", "idChat", "ativo", "created_at", "updated_at")
                                    VALUES (6, 10, 'OFERTABEST WORDPRESS CATEGORIAS', 8, 2, '${urlSite}', null, null, null, null, null, null, null, null, 'ck_5193b5cad53355a278e2b9eaf5ff15e32674dbd7', 'cs_d066c316183d55f2ebaa0a5a80610e3c3c1d58b9', 'wc/v3', 'BR', 'PR-BR', 'R$', null, true, now(),  now());`);

    } catch (error) {
    }
                                     
    try {
                                
        await getConnection().query(`INSERT INTO "plataforma_conta" ("idPlataformaConta", "idPlataforma", "descricao", "tpServico", "tpInformacao", "url", "urlAuxiliar", "token", "sourceId", "mscdId", "username", "password", "tags", "descricaoPost", "consumerKey", "consumerSecret", "version", "country", "country_language", "currency", "idChat", "ativo", "created_at", "updated_at")
                                    VALUES (7, 10, 'OFERTABEST WORDPRESS OFERTAS', 8, 3, '${urlSite}', null, null, null, null, null, null, null, null, 'ck_5193b5cad53355a278e2b9eaf5ff15e32674dbd7', 'cs_d066c316183d55f2ebaa0a5a80610e3c3c1d58b9', 'wc/v3', 'BR', 'PR-BR', 'R$', null, true, now(),  now());`);

    }catch (error) {
    }
                                       
    try {                          
        await getConnection().query(`INSERT INTO "plataforma_conta" ("idPlataformaConta", "idPlataforma", "descricao", "tpServico", "tpInformacao", "url", "urlAuxiliar", "token", "sourceId", "mscdId", "username", "password", "tags", "descricaoPost", "consumerKey", "consumerSecret", "version", "country", "country_language", "currency", "idChat", "ativo", "created_at", "updated_at")
                                    VALUES (8, 10, 'OFERTABEST WORDPRESS CUPONS', 8, 4, '${urlSite}', null, null, null, null, null, null, null, null, 'ck_5193b5cad53355a278e2b9eaf5ff15e32674dbd7', 'cs_d066c316183d55f2ebaa0a5a80610e3c3c1d58b9', 'wc/v3', 'BR', 'PR-BR', 'R$', null, true, now(),  now());`);

    } catch (error) {
    }
                                     
    try {
        await getConnection().query(`INSERT INTO "plataforma_conta" ("idPlataformaConta", "idPlataforma", "descricao", "tpServico", "tpInformacao", "url", "urlAuxiliar", "token", "sourceId", "mscdId", "username", "password", "tags", "descricaoPost", "consumerKey", "consumerSecret", "version", "country", "country_language", "currency", "idChat", "ativo", "created_at", "updated_at")
                                    VALUES (9, 10, 'OFERTABEST INSTAGRAM OFERTABESTT OFERTAS', 3, 3, '', null, null, null, null, 'ofertabestt', 'Monteiro01*', '#ofertabest #ofertatop #cuponagora #cuponbest #monteiroblog', 'Acesso nosso portal de ofertas www.ofertabest.com', null, null, null, 'BR', 'PR-BR', 'R$', null, true, now(),  now());`);
    } catch (error) {
    }
                                      
    try {
                                
        await getConnection().query(`INSERT INTO "plataforma_conta" ("idPlataformaConta", "idPlataforma", "descricao", "tpServico", "tpInformacao", "url", "urlAuxiliar", "token", "sourceId", "mscdId", "username", "password", "tags", "descricaoPost", "consumerKey", "consumerSecret", "version", "country", "country_language", "currency", "idChat", "ativo", "created_at", "updated_at")
                                    VALUES (10, 10, 'OFERTABEST INSTAGRAM OFERTABESTT CUPONS', 3, 4, '', null, null, null, null, 'ofertabestt', 'Monteiro01*', '#ofertabest #ofertatop #cuponagora #cuponbest #monteiroblog', 'Acesso nosso portal de ofertas www.ofertabest.com', null, null, null, 'BR', 'PR-BR', 'R$', null, true, now(),  now());`);

    } catch (error) {
    }
                                                              
}


