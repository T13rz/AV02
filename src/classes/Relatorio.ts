import { StatusdeTeste} from "../enums/StatusdeTeste"
import { StatusEtapa } from "../enums/StatusdaEtapa"
import { StatusdePecas } from "../enums/StatusdePecas"
import { TipodeAeronave } from "../enums/TipodeAeronave"
import { TipodePeca } from "../enums/TipodePeca"
import { TipodeTeste } from "../enums/TipodeTeste"
import Etapa from "./Etapa"
import Peca from "./Peca"
import Teste from "./Teste"
import Aeronave from "./Aeronave"
import fs from "fs"

export default class Relatorio{

    criarRelatorio(aeronave : Aeronave) : string {
        
        let relatorio = ""

        relatorio += `\n -=X=-=X=- Aeronave -=X=-=X=- ${aeronave.codigo} \n`
        relatorio += `Codigo: ${aeronave.codigo} \n`
        relatorio += `Modelo: ${aeronave.modelo} \n`
        relatorio += `Tipo: ${aeronave.tipo} \n`
        relatorio += `Alcance Total: ${aeronave.alcance} \n`
        relatorio += `Capacidade Total: ${aeronave.capacidade} \n`
        relatorio += `-=X=-=X=-=X=-=X=-=X=-=X=-=X=-=X=-=X=- \n`

        relatorio += `\n -=X=-=X=- Peças -=X=-=X=- \n`

        if(aeronave.pecas.length === 0) {
            relatorio += `Nenhuma Peça Cadastrada \n`
        }
        else {
            aeronave.pecas.forEach((peca) => {
                relatorio += `Nome: ${peca.nome} \n`
                relatorio += `Fornecedor: ${peca.fornecedor} \n`
                relatorio += `Tipo ${peca.tipo} \n`
                relatorio += `Status: ${peca.status} \n`
                relatorio += `-=X=-=X=-=X=-=X=-=X=-=X=-=X=-=X=- \n`
            })
        }
        
        relatorio += `\n -=X=-=X=- Etapas -=X=-=X=- \n`
        
        if(aeronave.etapas.length === 0) {
            relatorio += `Nenhuma Etapa Cadastrada \n`
        }
        else {
            aeronave.etapas.forEach((etapa) => {
                relatorio += `Nome: ${etapa.nome} \n`
                relatorio += `Prazo: ${etapa.prazo} \n`
                relatorio += `Status: ${etapa.status} \n`
                relatorio += `-=X=-=X=-=X=-=X=-=X=-=X=-=X=-=X=- \n`
            })
        }

        relatorio += `\n -=X=-=X=- Testes -=X=-=X=- \n`
        
        if(aeronave.testes.length === 0 ) {
            relatorio += `Nenhum Teste Encontrado \n`
        }
        else {
            aeronave.testes.forEach((teste) => {
                relatorio += `Tipo: ${TipodeTeste[teste.tipo]} \n`
                relatorio += `Status: ${StatusdeTeste[teste.status]} \n`
                relatorio += `-=X=-=X=-=X=-=X=-=X=-=X=-=X=-=X=- \n`
            })
        }
        
        return relatorio

    }

        save(aeronave : Aeronave) : void{

        const folder = `../relatorios/`

            if(!fs.existsSync(folder)){
                fs.mkdirSync(folder)
            }
        
        const content = this.criarRelatorio(aeronave)
        const arquivar = `${folder}rel_${aeronave.codigo}.txt`

        fs.writeFileSync(arquivar, content)
        console.log('\n Relatorio Salvo')
        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
    }

//A
}