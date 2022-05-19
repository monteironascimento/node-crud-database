import { Router, Request, Response } from 'express';

import { saveCategoriaLomadee , findAllCategorias, findCategoriasPendSinc, findCategoriasAtivas, findCategoriasAtivasLimit, findAllCategoriasPrincipal} from './controller/CategoriaControle';
import { saveLojaLomadee, findAllLojas, findLojasPendSinc } from './controller/LojaControler';
import { saveOfertaLomadeePagina, findOfertasPendSinc} from './controller/OfertaControle';
import { saveCuponLomadeeePagina, findCuponsPendSinc } from './controller/CuponsControle';
import { startSincronizacao, finalizaSincronizacao } from './controller/SincronizacaoControle';
import { findPlataformaConta, persistProcessado , persistProcessadoLista, findPenpDivulgacao } from './controller/PlataformaControler';
import { findAllProdutos } from './controller/ProdutoControle';
 
const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({status: process.env.NODE_ENV})
})

routes.post('/produtos', findAllProdutos)

//-------------LOMADEE ---------------------------------
routes.post('/categoria', saveCategoriaLomadee)
routes.post('/categorias', findAllCategorias)
routes.get('/categoriasAtivas', findCategoriasAtivas)
routes.get('/categoriasAtivasPrincipal', findAllCategoriasPrincipal)

routes.get('/categoriasAtivasLimit', findCategoriasAtivasLimit)
routes.post('/categoriasPendSinc', findCategoriasPendSinc);
routes.post('/loja', saveLojaLomadee)
routes.get('/lojas', findAllLojas)
routes.post('/lojasPendSinc', findLojasPendSinc)
routes.post('/oferta', saveOfertaLomadeePagina)
routes.post('/ofertasPendSinc', findOfertasPendSinc);
routes.post('/cupons', saveCuponLomadeeePagina)
routes.post('/cuponsPendSinc', findCuponsPendSinc)
//--------------ORQUESTRADOR --------------------------------
routes.get('/findPlataformaContas', findPlataformaConta)
routes.post('/persistProcessado', persistProcessado)
routes.post('/persistProcessadoLista', persistProcessadoLista)
routes.post('/findPenpDivulgacao', findPenpDivulgacao)
routes.post('/startSincronizacao', startSincronizacao)
routes.post('/finalizaSincronizacao', finalizaSincronizacao)

export default routes;