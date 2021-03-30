const moment = require('moment');
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse(bancoDados);

const atualizarBanco = () => {
    //conversão de objeto javascript para JSON
    let petsAtualizado = JSON.stringify(bancoDados, null, 2);
    //atualização do arquivo bancoDados.json
    fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');
}

const listarPets = () => {
    bancoDados.pets.forEach((pet) => {
        let {nome, idade, tipo, tutor, raca, vacinado} = pet;
        
        //console.log(`${pet.nome}, ${pet.idade} anos, ${pet.tipo}, ${pet.raca}, ${(pet.vacinado) ? 'vacinado': 'não vacinado'}`);
        console.log(`${nome}, ${idade} anos, ${tipo}, ${tutor}, ${raca}, ${(vacinado) ? 'vacinado': 'não vacinado'}`);

        // pet.servicos.forEach((servico) => {
        //     console.log(`${servico.data} - ${servico.nome}`);
        // })
    })
}


const vacinarPet = pet => {
    let {nome, vacinado} = pet;
    if (!vacinado) {
        vacinado = true;
        atualizarBanco();
        console.log(`${nome} foi vacinado com sucesso!`);
    } else {
        console.log(`Ops, ${nome} já está vacinado!`);
    }
}

const campanhaVacina = () => {
    console.log("Campanha de vacina 2021");
    console.log("vacinando...");

    let petVacinadosCampanha = 0;

    bancoDados.pets = bancoDados.pets.map((pet) => {
        let {vacinado} = pet;
        if (!vacinado) {
            vacinarPet(pet);
            petVacinadosCampanha++;
        }

        return pet;
    });

    // atualizarBanco();
    console.log(`${petVacinadosCampanha} pets foram vaciados nessa campanha!`);
};

const adicionarPet = novoPet => {
    bancoDados.pets.push(novoPet);
    atualizarBanco();
    console.log(`${novoPet.nome} foi adicionado com sucesso!`);
}

const darBanhoPet = pet => {
    let {nome} = pet;
    pet.servicos.push({
        'nome':'banho',
        'data': moment().format('DD-MM-YYYY')
    });
    atualizarBanco();
    console.log(`${nome} está de banho tomado!`);
};

const tosarPet = pet => {
    let {nome} = pet;
    pet.servicos.push({
        'nome':'tosa',
        'data': moment().format('DD-MM-YYYY')
    });
    atualizarBanco();
    console.log(`${nome} está com cabelinho na régua :)`);
};

const apararUnhasPet = pet => {
    let {nome} = pet;
    pet.servicos.push({
        'nome':'corte de unhas',
        'data': moment().format('DD-MM-YYYY')
    });
    atualizarBanco();
    console.log(`${nome} está de unhas aparadas!`);
};

const atenderCliente = (pet, servico) => {
    let {nome} = pet;
    console.log(`Olá, ${nome}`);
    servico(pet);
    console.log('Até mais!');
}

const buscarPet = (nomePet) => {

    let petEncontrado = bancoDados.pets.find((pet) => {
        let {nome} = pet;
        return nome == nomePet;
    });

    return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
}

const filtrarTipoPet = (tipoPet) => {
    // && E - AND
    // || OU - OR
    // == verifica valores iguais
    // === verifica valores e tipos iguais
    let petsEncontrados = bancoDados.pets.filter((pet) => {
        let {tipo} = pet;
        return tipo == tipoPet;
    });

    return petsEncontrados;
}

const clientePremium = (pet) => {
    let { nome } = pet;
    let nServicos = pet.servicos.length;

    if (nServicos > 5) {
        console.log(`Olá, ${nome}! Você é um cliente especial e ganhou um descontão!`);
    } else {
        console.log(`Olá, ${nome}! Você ainda não tem descontos disponiveis!`);
    }
}

const contatoTutor = (pet) => {
    let {nome, tutor, contato} = pet;
     
    return `Tutor: ${tutor} | Contato: ${contato} | Pet: ${nome}`
}

const filtrarTutor = (nomeTutor) => {
    let petsTutor = bancoDados.pets.filter((pet) => {
        let {tutor} = pet;
        return tutor == nomeTutor;
    })
    console.log(`Pets do tutor ${nomeTutor}`);
    petsTutor.forEach((pet) => {
        let {nome, tipo} = pet;
        console.log(`${nome} - ${tipo}`);
    })
}


listarPets();
console.log('\n');
//console.log(contatoTutor(bancoDados.pets[2]));
//filtrarTutor('Archie');
//clientePremium(bancoDados.pets[4]);
// console.log(buscarPet('Bidu'));
// console.log(clientePremium(bancoDados.pets[2]));
//darBanhoPet(bancoDados.pets[4]);
// campanhaVacina();

// adicionarPet({
//     "nome": "Romarinho",
//     "tipo": "cachorro",
//     "idade": 3,
//     "raca": "American",
//     "peso": 28,
//     "tutor": "Bruno",
//     "contato": "(11) 99999-9999",
//     "vacinado": true,
//     "servicos": []
// });