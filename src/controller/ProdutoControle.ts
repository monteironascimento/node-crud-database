import {  getRepository } from 'typeorm';
import { Produto } from '../entity/Produto';


export async function findAllProdutos(){
    const objCategoria:any = await getRepository(Produto).find();  
    return objCategoria.data;
}