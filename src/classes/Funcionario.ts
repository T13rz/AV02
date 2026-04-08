import { NiveldeAcesso } from "../enums/NiveldeAcesso"

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
        this.usuario = usuario
        this.senha = senha
        this.NivelAcesso = NivelAcesso
    }

}