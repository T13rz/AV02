import fs from "fs"
import { StatusdeTeste } from "../enums/StatusdeTeste"
import { TipodeTeste } from "../enums/TipodeTeste"
export default class Teste{
    testId : string
    tipo : TipodeTeste
    status : StatusdeTeste
    

    constructor(testId : string, tipo: TipodeTeste, status : StatusdeTeste){
        
        this.testId = testId
        this.tipo = tipo
        this.status = status
    }

    save() : void{
//U
        console.clear()
        const arquivar = `../jsons/teste/func_${this.testId}.json`

        fs.writeFileSync(arquivar, JSON.stringify(this, null, 2))
        console.log('Teste Salvo')
        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
    }

    load(): void{
        const arquivar = `../jsons/teste/test_${this.testId}.json`

        if(!fs.existsSync(arquivar)){

            console.clear()
            console.log('\n Teste Não Encontrado, Arquivo não existente ')
            console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
            return
        }


        const file = fs.readFileSync(arquivar, 'utf-8')
        const objc = JSON.parse(file)

        this.testId = objc.testId
        this.tipo = objc.tipo as TipodeTeste
        this.status = objc.status as StatusdeTeste
        console.log('\nTeste Carregado!')
        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)

    }
}