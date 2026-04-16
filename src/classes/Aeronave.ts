//Imports

import { StatusEtapa } from "../enums/StatusdaEtapa"
import { StatusdePecas } from "../enums/StatusdePecas"
import { StatusdeTeste} from "../enums/StatusdeTeste"
import { TipodeAeronave } from "../enums/TipodeAeronave"
import { TipodeTeste } from "../enums/TipodeTeste"
import { TipodePeca } from "../enums/TipodePeca"
import Etapa from "./Etapa"
import Funcionario from "./Funcionario"
import Peca from "./Peca"
import Teste from "./Teste"
import fs from "fs"


export default class Aeronave{
    codigo : string
    modelo : string
    tipo : TipodeAeronave
    alcance : number
    capacidade : number
    pecas : Peca[]
    etapas : Etapa[]
    testes : Teste[]

    constructor(codigo : string, modelo : string, tipo : TipodeAeronave, alcance : number ,capacidade : number, pecas : Peca[], etapas: Etapa[], testes: Teste[] ){
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.alcance = alcance
        this.capacidade = capacidade
        this.pecas = []
        this.etapas = []
        this.testes = []
    }
    
    

    detalhar() : void {
        console.clear()
        console.log(`\n -=X=- Aeronave ${this.codigo} -=X=-`)
        console.log(`Codigo: ${this.codigo}`)
        console.log(`Ref Modelo ${this.modelo}`)
        console.log(`Ref tipo ${this.tipo}`)
        console.log(`Alcance Total: ${this.alcance}`)
        console.log(`Capacidade Total: ${this.capacidade}`)
        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)


        console.log(`\n -=X=- Peças Inclusas -=X=-`)

        if(this.pecas.length === 0){
            console.log(`Não há Peças cadastradas nessa Aeronave`)
        }
        else{
            this.pecas.forEach((peca) => {
                console.log(`Nome: ${peca.nome}`)
                console.log(`Fornecedor: ${peca.fornecedor}`)
                console.log(`Tipo de Peça: ${TipodePeca[peca.tipo]}`)
                console.log(`Status Atual: ${StatusdePecas[peca.status]}`)
                console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
            })
        }

        console.log(`\n -=X=- Etapas -=X=-`)

        if(this.etapas.length === 0){
            console.log(`Não há Etapas cadastradas nessa Aeronave`)
            console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
        }
        else{
            this.etapas.forEach((etapa) => {
                console.log(`Nome: ${etapa.nome}`)
                console.log(`Prazo Atual: ${etapa.prazo}`)
                console.log(`Status Atual: ${StatusEtapa[etapa.status]}`)
                console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
            })
        }

        console.log(`\n-=X=- Testes -=X=-`)
//
        if(this.testes.length === 0){
            console.log(`Não há Testes cadastrados nessa Aeronave`)
            console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
        }
        else{
            this.testes.forEach((teste) => {
                console.log(`Nome: ${TipodeTeste[teste.tipo]}`)
                console.log(`Status: ${StatusdeTeste[teste.status]}`)
                console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
            })
        }

    }

    save() : void{

        console.clear()
        const arquivar = `./jsons/aeronave/aero_${this.codigo}.json`

        fs.writeFileSync(arquivar, JSON.stringify(this, null, 2))
        console.log('Aeronave Salva')
    }

    load(): void{
        const arquivar = `./jsons/aeronave/aero_${this.codigo}.json`

        if(!fs.existsSync(arquivar)){

            console.clear()
            console.log('\n Aeronave Não Encontrada, Arquivo não existente ')
            return
        }


        const file = fs.readFileSync(arquivar, 'utf-8')
        const objc = JSON.parse(file)

        this.modelo = objc.modelo
        this.tipo = objc.tipo
        this.alcance = objc.alcance
        this.capacidade = objc.capacidade
        this.pecas = objc.pecas.map((peca: any) => {return new Peca(peca.nome, peca.fornecedor, peca.tipo, peca.status)} )
        this.etapas = objc.etapas.map((etapa : any) =>{

            const novaEtapa = new Etapa(etapa.nome, etapa.prazo)

            novaEtapa.funcionarios = (etapa.funcionarios || []).map((funcionario : any) => {
                return new Funcionario(
                    
                    funcionario.id,
                    funcionario.nome,
                    funcionario.telefone,
                    funcionario.endereco,
                    funcionario.usuario,
                    funcionario.senha,
                    funcionario.NivelAcesso
                )
            })
            return novaEtapa
        } )

        this.testes = objc.testes.map((teste : any) => {return new Teste(teste.tipo, teste.resultado, teste.idTest) })
        console.clear()
        console.log('\n Aeronave Carregada !')
        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)

    }
}