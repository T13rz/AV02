import { NiveldeAcesso } from "../enums/NiveldeAcesso";
import { StatusEtapa } from "../enums/StatusdaEtapa";
import Funcionario from "./Funcionario";

export default class Etapa{
    nome : string
    prazo : string
    status : StatusEtapa
    funcionarios : Funcionario[]

    constructor(nome : string, prazo : string ){
        
        this.nome = nome
        this.prazo = prazo
        this.status = StatusEtapa.Pendente
        this.funcionarios = []
    }
//K
    iniciador() : void {
        if(this.status == StatusEtapa.Pendente) {
            this.status = StatusEtapa.Em_Andamento
        }
        else {
            console.log(`\n O Status da etapa deve estar como Pendente`)
            console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
        }
    }

    finalizador() : void {
        if(this.status == StatusEtapa.Em_Andamento) {
            this.status = StatusEtapa.Concluida
        }
        else {
            console.log(`\n Etapa não pode ser finalizada pois não está em andamento`)
            console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
        }
    }

    associaFuncionario(novoFuncionario : Funcionario) : void {
        const funcionarioExistente = this.funcionarios.some(funcionario => funcionario.id === novoFuncionario.id)

        if(funcionarioExistente){
            console.log('\n Esse funcionario ja está cadastrado')
            console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
            return
        }

        this.funcionarios.push(novoFuncionario)
        console.log(`\n Funcionario Cadastrado !`)
        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
    }

    listarFuncionarios() : Array <Funcionario>{
        if(this.funcionarios.length === 0){
            console.log(`Não existem funcionarios cadastrados`)
            console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
            return  
        }

        this.funcionarios.forEach(funcionario => {
            console.log(`\n ID: ${funcionario.id} |Nome: ${funcionario.nome} |Cargo: ${NiveldeAcesso[funcionario.NivelAcesso]}`)
        })

        return this.funcionarios
    }

}