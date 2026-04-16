import { NiveldeAcesso } from '../enums/NiveldeAcesso'
import fs from "fs"

export default class Funcionario{
    id: string
    nome: string
    telefone: string
    endereco: string
    usuario: string
    senha: string
    NivelAcesso: NiveldeAcesso

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, NivelAcesso: NiveldeAcesso){
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
  //Z
        this.usuario = usuario
        this.senha = senha
        this.NivelAcesso = NivelAcesso
    }

    login(DigitarUsuario:string, DigitarSenha:string): boolean {
        return this.usuario === DigitarUsuario && this.senha === DigitarSenha
    }

    save() : void{

        console.clear()
        const arquivar = `../jsons/funcionario/func_${this.id}.json`

        fs.writeFileSync(arquivar, JSON.stringify(this, null, 2))
        console.log('Funcionario Salvo')
        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
    }

    load(): void{
        const arquivar = `./jsons/funcionario/func_${this.id}.json`

        if(!fs.existsSync(arquivar)){

            console.clear()
            console.log('\nFuncionario Não Encontrado, Arquivo não existente ')
            console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
            return
        }


        const file = fs.readFileSync(arquivar, 'utf-8')
        const objc = JSON.parse(file)

        this.id = objc.id
        this.nome = objc.nome
        this.telefone = objc.telefone
        this.endereco = objc.endereco
        this.usuario = objc.usuario
        this.senha = objc.senha
        this.NivelAcesso = objc.NivelAcesso as NiveldeAcesso
        console.log('\n Funcionario Carregado!')
        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)

    }

}