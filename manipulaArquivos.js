let fs = require('fs'); //filesystem - modulo nativo

//pega conteudo do arquivo e converte pra utf-8
let bancoDados = fs.readFileSync('bancoDados.json', 'utf-8');

//converte o conteudo
bancoDados = JSON.parse(bancoDados);

bancoDados.pets.push({
    "nome": "Pedrita",
    "tipo": "cachorro",
    "idade": 10,
    "raca": "Pastor Alemão",
    "peso": 18,
    "tutor": "João",
    "contato": "(11) 98899-9999",
    "vacinado": true,
    "servicos": []
});

let petsAtualizado = JSON.stringify(bancoDados);

fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');


