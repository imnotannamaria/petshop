let bancoDados = require('./bancoDados.json');

let pets = bancoDados.pets;


const atenderCliente = (pet, servico) => {
    console.log(`Olá, ${pet.nome}`);

    // if(servico){
    //     servico();
    // }
    (servico) ? servico() : console.log('só vim dar uma olhadinha');

    console.log('Tchau, até mais!');
}

const darBanho = () => {
    console.log('dando banho no pet...');
}

const apararUnhas = () => {
    console.log('Aparando unhas...');
}

atenderCliente(pets[0], darBanho);
console.log("---------")
atenderCliente(pets[2], apararUnhas);
console.log("---------")
atenderCliente(pets[1]);

let pessoa = {
    nome: 'Anna',
    idade: 18,
    profissao: 'dev',
    contato: '976546282',
    habilidades: ['node.js', 'mysql', 'js']
}

let {nome, idade} = pessoa;

console.log(`${nome} - ${idade}`);