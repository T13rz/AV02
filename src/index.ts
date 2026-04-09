import Funcionario from "./classes/Funcionario";
import { NiveldeAcesso } from "./enums/NiveldeAcesso";
import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Funcionário de teste
const func = new Funcionario(
    "1",
    "João",
    "11999999999",
    "Rua A, 123",
    "joao123",
    "senha456",
    NiveldeAcesso.Engenheiro
);

rl.question("Usuário: ", (usuarioDigitado) => {
    rl.question("Senha: ", (senhaDigitada) => {

        if (func.login(usuarioDigitado, senhaDigitada)) {
            console.log("✅ Login bem-sucedido!");
            func.save();
        } else {
            console.log("❌ Usuário ou senha incorretos.");
        }

        rl.close();
    });
});