import fs from "fs"
import { StatusdePecas } from "../enums/StatusdePecas"
import { TipodePeca } from "../enums/TipodePeca"


export default class Peca{
     nome : string
     fornecedor : string
     tipo: TipodePeca
     status : StatusdePecas 

    constructor(nome : string, fornecedor : string, tipo: TipodePeca, status : StatusdePecas){
        this.nome = nome
        this.fornecedor = fornecedor
        this.tipo = tipo
        this.status = status
    }
//S
    atualizacaodeStatus(novoStatus : StatusdePecas) : void {
        this.status = novoStatus
    }

save() : void{

        console.clear()
        const arquivar = `../jsons/peca/peca_${this.nome}.json`

        fs.writeFileSync(arquivar, JSON.stringify(this, null, 2))
        console.log('Peça Salva')
        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
    }

    load(): void{
        const arquivar = `../jsons/peca/peca_${this.nome}.json`

        if(!fs.existsSync(arquivar)){

            console.clear()
            console.log('\n Peça Não Encontrada!, Arquivo não existente ')
            console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
            return
        }


        const file = fs.readFileSync(arquivar, 'utf-8')
        const objc = JSON.parse(file)

        this.nome = objc.nome
        this.fornecedor = objc.fornecedor
        this.tipo = objc.tipo as TipodePeca
        this.status = objc.status as StatusdePecas
        console.log('\n Peça Carregada!')
        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)

    }
}

