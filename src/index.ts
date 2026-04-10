import Aeronave from "./classes/Aeronave";
import Etapa from "./classes/Etapa";
import Funcionario from "./classes/Funcionario";
import Peca from "./classes/Peca";
import Relatorio from "./classes/Relatorio";
import Teste from "./classes/Teste";
import { NiveldeAcesso } from "./enums/NiveldeAcesso";
import { StatusEtapa } from "./enums/StatusdaEtapa";
import readline from "readline";
import fs from "fs";

const rln = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function delay(ms : number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function questionar(questao : string) : Promise<string> {
    return new Promise(resolve => {
        rln.question(questao, resposta => resolve(resposta))
    })
}

async function questionarNmr(msg : string, valido? : number[]) : Promise<number> {
    while(true) {

        const valor = Number(await questionar(msg))

        if(isNaN(valor)) {
            console.log(`Digite um Número Válido`)
            continue
        }

        else if(valido && !valido.includes(valor)) {
            console.log(`Digite Apenas ${valido.join(` ou `)}`)
            continue
        }

        return valor
    }
}

async function logar() : Promise <Funcionario | null > {
    const DigitarUsuario = await questionar(`Digite o Usuario: `)
    const DigitarSenha = await questionar(`Digite a Senha: `)

    const local = '../jsons/funcionario/'
    const arquivos = fs.readdirSync(local)

    for(const arquivo of arquivos) {
        const data = fs.readFileSync(local + arquivo, "utf-8")
        const objc = JSON.parse(data)

        const funcionario = new Funcionario(
            objc.id,
            objc.nome,
            objc.telefone,
            objc.endereco,
            objc.usuario,
            objc.senha,
            objc.NivelAcesso
        )

        const autenticado = funcionario.login(DigitarUsuario, DigitarSenha)
        
        if(autenticado){
            
            return funcionario
        }
    }

    console.log(`\n Usuario ou Senha Inválido`)
    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
    return null
}

async function menu() { //PILASTRI
    let escolha = -1
    let aeronaveAtual : Aeronave | null = null
    let funcionarioAtual : Funcionario | null = null
    let pecaAtual : Peca | null = null
    let testeAtual : Teste | null = null
    
    while(!funcionarioAtual){
        funcionarioAtual = await logar()
    }

    console.clear()
    console.log(`\n Bem Vindo ${funcionarioAtual.usuario} !`)
    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)

    while(escolha != 0){
        console.log(` Aguarde... `)
        await delay(4000)
        console.clear()
        console.log(`\n -=X=-=X=- Menu Inicial -=X=-=X=-`)

        console.log(`\n -=X=-=X=- Aeronave -=X=-=X=-`)
        console.log(`1. Cadastrar Nova Aeronave`)
        console.log(`2. Carregar Aeronave Existente`)
        console.log(`3. Detalhar uma Aeronave`)

        console.log(`\n -=X=-=X=- Funcionario -=X=-=X=-`)
        console.log(`4. Cadastrar Novo Funcionario`)
        console.log(`5. Carregar Funcionario`)

        console.log(`\n -=X=-=X=- Peças -=X=-=X=-`)
        console.log(`6. Cadastrar Nova Peça`)
        console.log(`7. Carregar Peça Existente`)
        console.log(`8. Adicionar a uma Aeronave`)
        console.log(`9. Atualizar Status`)

        console.log(`\n -=X=-=X=- Etapa -=X=-=X=-`)
        console.log(`10. Criar e Adicionar a uma Aeronave`)
        console.log(`11. Iniciar`)
        console.log(`12. Finalizar`)
        console.log(`13. Associar Funcionario`)
        console.log(`14. Listar Funcionarios`)

        console.log(`\n -=X=-=X=- Teste -=X=-=X=-`)
        console.log(`15. Cadastrar Teste`)
        console.log(`16. Carregar Teste`)
        console.log(`17. Adicionar a uma Aeronave`)

        console.log(`\n -=X=-=X=- Relatorio -=X=-=X=-`)
        console.log(`18. Gerar Relatorio`)
        console.log(`19. Salvar Relatorio como ".txt"`)

        console.log(`\n -=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
        console.log(`0. Encerrar \n`)

        escolha = Number(await questionar(`${funcionarioAtual.usuario}, Escolha uma opção: `))

        switch(escolha){
            case 1:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador){
                    console.clear()
                    console.log(`\n ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const codigo = await questionar(`Digite o Código da Aeronave: `)
                const arquivar = `../jsons/aeronaves/aero_${codigo}.json`

                if(fs.existsSync(arquivar)){
                    console.clear()
                    console.log(`\n Código já existente`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const modelo = await questionar(`Modelo: `)
                const tipo = await questionarNmr(`Tipo (0. Comercial 1. Militar): `, [0,1])
                const alcance = await questionarNmr(`Alcance Total: `)
                const capacidade = await questionarNmr(`Capacidade Total: `)
                
                aeronaveAtual = new Aeronave(
                    codigo,
                    modelo,
                    tipo,
                    alcance,
                    capacidade,
                    [],
                    [],
                    []
                )

                aeronaveAtual.save()
                break

            case 2:
                const codigoLoad = await questionar(`Digite o Codigo da Aeronave: `)
                if(aeronaveAtual && aeronaveAtual.codigo === codigoLoad){
                    console.clear()
                    console.log(`\n Aeronave já foi Carregada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break 
                }

                aeronaveAtual = new Aeronave(codigoLoad, '', 0, 0, 0, [], [], [])
                aeronaveAtual.load()
                break

            case 3:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador){
                    console.clear()
                    console.log(`\n ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!aeronaveAtual) {
                    console.log(`Sem Aeronaves Carregadas`)
                }
                else{
                    aeronaveAtual.detalhar()
                }
                break
            case 4:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador){
                    console.clear()
                    console.log(`\n ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const id = await questionar(`Digite o id do Funcionario: `)
                const pathFunc = `../jsons/funcionario/func_${id}.json`

                if(fs.existsSync(pathFunc)){
                    console.clear()
                    console.log(`\n Funcionario já existente`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const nome = await questionar(`Nome: `)
                const usuario = await questionar(`Novo Username: `)
                const senha = await questionar(`Nova Senha: `)
                const telefone = await questionar(`Telefone: `)
                const endereco = await questionar(`Endereço atual: `)
                const NivelAcesso = await questionarNmr(`Nivel De Acesso (0. Administrador 1. Engenheiro 2. Operador): `, [0, 1, 2])

                funcionarioAtual = new Funcionario(
                    id,
                    nome,
                    telefone,
                    endereco,
                    usuario,
                    senha,
                    NivelAcesso
                )

                funcionarioAtual.save()
                break

            case 5:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador){
                    console.clear()
                    console.log(`ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const idLoad = await questionar(`Digite o ID do Funcionario: `)
                if (funcionarioAtual && funcionarioAtual.id === idLoad){
                    console.clear()
                    console.log(`\n Esse Funcionario já foi Carregado`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break                    
                }

                funcionarioAtual = new Funcionario(idLoad, '', '', '', '', '', 0)
                funcionarioAtual.load()
                break

            case 6:
                if(!aeronaveAtual){
                    console.clear()
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break        
                }

                const nomePeca = await questionar(`Nome: `)
                const pathPec = `../jsons/peca/pec_${nomePeca}.json`

                if (fs.existsSync(pathPec)){
                    console.clear()
                    console.log(`\n Peça já existente`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const fornecedor = await questionar(`Fornecedor: `)
                const tipodePeca = await questionarNmr(`Tipo de Peça (0. Nacional 1. Importada): `, [0, 1])
                const status = await questionarNmr(`Status (0. Producao 1. Transporte 2. Pronta): `, [0, 1, 2])
                
                pecaAtual = new Peca(
                    nomePeca,
                    fornecedor,
                    tipodePeca,
                    status
                )

                pecaAtual.save()
                break
                
            case 7:
                const nomePec = await questionar(`Nome da Peça: `)
                
                if(pecaAtual && pecaAtual.nome === nomePec){
                    console.clear()
                    console.log(`\n Peça já Carregada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)        
                    break
                }

                pecaAtual = new  Peca(nomePec, '', 0, 0)
                pecaAtual.load()
                break
            case 8:
                if(!aeronaveAtual){
                    console.clear()
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!pecaAtual){
                    console.clear()
                    console.log(`\n Peça não identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                aeronaveAtual.pecas.push(pecaAtual)
                aeronaveAtual.save()
                
                console.log(`Peça: '${pecaAtual.nome}' foi adicionada a Aeronave ${aeronaveAtual.codigo}`)
                break

            case 9:
                if(!pecaAtual){
                    console.clear()
                    console.log(`\n Peça não Encontrada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const refPeca = pecaAtual

                const newStatus = await questionarNmr(`\n Novo Status: (0. Produção 1. Transporte 2. Pronta): `, [0, 1, 2])
                
                pecaAtual.status = newStatus
                pecaAtual.save()

                const peca = aeronaveAtual?.pecas.find(peca => peca.nome === refPeca.nome)
                if (peca) peca.status = newStatus
                aeronaveAtual?.save()
                break

            case 10:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador &&
                    funcionarioAtual.NivelAcesso !== NiveldeAcesso.Engenheiro){
                        console.log(`ACESSO NEGADO!`)
                        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                        break        
                    }
    
                if(!aeronaveAtual){
                    console.clear()
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const etapaNaoFinalizada = aeronaveAtual.etapas.some(etapa => etapa.status === 1)
                
                if (etapaNaoFinalizada){
                    console.clear()
                    console.log(`Existe uma etapa não finalizada, por favor finalize-a !`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const nomeEtapa = await questionar(`Nome da Etapa: `)
                const prazo = await questionar(`Prazo: `)

                const newEtapa = new Etapa(nomeEtapa, prazo)
                aeronaveAtual.etapas.push(newEtapa)
                aeronaveAtual.save()

                console.log(`\n A Etapa ${newEtapa.nome} foi criada e adicionada a Aeronave ${aeronaveAtual.codigo}`)
                break

            case 11:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador &&
                    funcionarioAtual.NivelAcesso !== NiveldeAcesso.Engenheiro){
                    console.clear()
                    console.log(`ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!aeronaveAtual){
                    console.clear()
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const nomeEtp = await questionar(`Nome da Etapa: `)
                const etapa = aeronaveAtual.etapas.find(etapa => etapa.nome === nomeEtp)

                if(!etapa){
                    console.clear
                    console.log(`\n Etapa não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const indice = aeronaveAtual.etapas.indexOf(etapa)

                if(indice > 0){
                    const etapaAnt = aeronaveAtual.etapas[indice -1]
                    if(etapaAnt.status !== StatusEtapa.Concluida){
                        console.clear()
                        console.log(`Etapa Ainda não concluida, Finalize-a`)
                        console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                        break
                    }
                }

                if(etapa.status === StatusEtapa.Em_Andamento){
                    console.clear()
                     console.log(`\n A Etapa já está em Andamento `)
                     console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                     break
                    }

                 if(etapa.status === StatusEtapa.Concluida){
                     console.clear()
                     console.log(`\n A Etapa já está Finalizada`)
                     console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                        break
                    }
                
                const etapaemAndamento = aeronaveAtual.etapas.some(etapa => etapa.status === StatusEtapa.Em_Andamento)

                if(etapaemAndamento){
                    console.clear()
                    console.log(`\n Existe uma etapa em Andamento`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                etapa.iniciador()
                aeronaveAtual.save()

                console.log(`\n Etapa Iniciada`)
                console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                break

            case 12:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador &&
                    funcionarioAtual.NivelAcesso !== NiveldeAcesso.Engenheiro){
                    console.clear()
                    console.log(`ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!aeronaveAtual){
                    console.clear()
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const nomeEt = await questionar(`Nome da Etapa: `)
                const etapaf = aeronaveAtual.etapas.find(etapa => etapa.nome === nomeEt)
               
                if(!etapaf){

                    console.clear()
                    console.log(`\n Etapa não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(etapaf.status === 2){

                    console.clear()
                    console.log(`Etapa já Finalizada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(etapaf.status !== 1){

                    console.clear()
                    console.log(`\n A Etapa precisa estar em Andamento antes de ser finalizada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                etapaf.finalizador()
                aeronaveAtual.save()

                console.log(`\n Etapa foi finalizada`)
                console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                break

            case 13:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador &&
                    funcionarioAtual.NivelAcesso !== NiveldeAcesso.Engenheiro){
                    console.clear()
                    console.log(`ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!aeronaveAtual){
                    console.clear()
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const nomeEta = await questionar(`Nome da Etapa: `)
                const nomeFuncionario = await questionar(`Nome do Funcionario`)

                const etap = aeronaveAtual.etapas.find(etapa => etapa.nome === nomeEta)

                if(!etap){
                    console.clear
                    console.log(`\n Etapa não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(etap.status === StatusEtapa.Concluida){
                    console.clear()
                    console.log(`Não é Possivel Adicionar um funcionario a uma Etapa já Concluida`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const past = `../jsons/funcionario/`
                const arquivos = fs.readdirSync(past)
                
                let encontraFunc: Funcionario | null = null

                for(const arquivo of arquivos){
                    const data = fs.readFileSync(past + arquivo, "utf-8")
                    const objc = JSON.parse(data)
                    
                    if(objc.nome === nomeFuncionario){
                        encontraFunc = new Funcionario(
                            objc.id,
                            objc.nome,
                            objc.telefone,
                            objc.endereco,
                            objc.usuario,
                            objc.senha,
                            objc.NivelAcesso
                        )
                        break
                    }
                }

                if(!encontraFunc){
                    console.clear
                    console.log(`\n Funcionario não Encontrado`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const jaExistente = etap.funcionarios.some(func => func.nome === encontraFunc!.nome)

                if(jaExistente){
                    console.clear()
                    console.log(`\n Este Funcionario ja está nessa etapa`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                etap.funcionarios.push(encontraFunc)
                aeronaveAtual.save()

                console.log(`Funcionario Adicionado a Etapa`)
                console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                break

            case 14:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador &&
                    funcionarioAtual.NivelAcesso !== NiveldeAcesso.Engenheiro){
                    console.clear()
                    console.log(`ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!aeronaveAtual){
                    console.clear
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const etapaBuscador = await questionar(`Nome da Etapa: `)

                const etapaBusca = aeronaveAtual.etapas.find(etapa => etapa.nome === etapaBuscador)

                if(!etapaBusca){
                    console.clear
                    console.log(`\n Etapa não Encontrada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                console.clear()
                console.log(`\n -=X=-=X=- Funcionarios na Etapa ${etapaBusca.nome} -=X=-=X=-`)

                etapaBusca.listarFuncionarios()

                break

            case 15:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador &&
                    funcionarioAtual.NivelAcesso !== NiveldeAcesso.Engenheiro){
                    console.clear()
                    console.log(`ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!aeronaveAtual){
                    console.clear
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const idTest = await questionar(`ID do Teste: `)
                const pathTest = `../jsons/teste/teste_${idTest}`

                if(fs.existsSync(pathTest)){
                    console.clear()
                    console.log(`\n Já existe um Teste com esse ID`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const tipoTeste = await questionarNmr(`Tipo (0. Eletrico 1. Hidraulico 2. Aerodinamico)`, [0, 1, 2])
                const statusTeste = await questionarNmr(`Resultado (0. Aprovado 1. Reprovado)`, [0, 1])

                testeAtual = new Teste(
                 idTest,
                 tipoTeste,
                 statusTeste
                )

                testeAtual.save()
                break

            case 16:
                const idTeste = await questionar(`Digite o ID do teste: `)

                if(testeAtual && testeAtual.testId === idTeste){
                    console.clear()
                    console.log(`\n Este Teste ja foi Carregado`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                testeAtual = new Teste(idTeste, 0, 0)
                testeAtual.load()
                break

            case 17:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador &&
                    funcionarioAtual.NivelAcesso !== NiveldeAcesso.Engenheiro){
                    console.clear()
                    console.log(`ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!aeronaveAtual){
                    console.clear
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!testeAtual){
                    console.clear
                    console.log(`\n Teste não Encontrado`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                aeronaveAtual.testes.push(testeAtual)
                aeronaveAtual.save()
                console.log(`O teste ${testeAtual.testId} foi adiconado a Aeronave ${aeronaveAtual.codigo}`)
                console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                break

            case 18:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador){
                    console.clear()
                    console.log(`ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!aeronaveAtual){
                    console.clear
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const relatorio = new Relatorio()

                console.clear()
                console.log(relatorio.criarRelatorio(aeronaveAtual))
                break

            case 19:
                if(funcionarioAtual.NivelAcesso !== NiveldeAcesso.Administrador){
                    console.clear()
                    console.log(`ACESSO NEGADO!`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                if(!aeronaveAtual){
                    console.clear
                    console.log(`\n Aeronave não Identificada`)
                    console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
                    break
                }

                const salvaRelatorio = new Relatorio()

                salvaRelatorio.save(aeronaveAtual)

                break
            
            case 0:
                console.log(`Encerrando... `)
                rln.close()
                process.exit(0)

            default:
                console.clear()
                console.log(`Escolha inválida, Escolha um dos numeros em tela`)
                console.log(`-=X=-=-=X=-=-=X=--=X=-=-=X=-=-=X=-`)
        }
    }

}

menu()

/*Parabéns!! 
Você chegar ao fim do Index!
Caso queira um desafio divertido, existem comentários dentro de cada classe que completam o link "xxxxxx.vercel.app".
são 6 comentários no total
Boa Caçada! :)*/