# Json Digital Account

## How to set up project

### Pre-requirements
  * NodeJS 10+ (minimal)
  * Internet Access to run ```npm i```

  After clone the project ([you can do it by click here](https://github.com/RodriguesLs/digital-account-api)), go to the project folder and run ```npm i```.
  
  Congratulation.

  Now, just run ```npm start``` to use this app.

## Technical explanation

I chose to use good old MVC because it is a simple application.

I decided not to implement everything from the beginning, so I naturally evolved the application. I'm usually inspired by Alan Kay's phrase: "make it works, make it correct, make it fast, make it cheap", so I tried to reproduce this in the project's commit history.

I tried to use a semantic commit structure as much as I could. With my formidable Trinidade and Tobago English, you will notice that this was not difficult. I usually use the Karma Commit pattern (as far as I know it is the pattern used in the Angular core).

## Framework and library

Naturally I would have chosen Rails to build this application, but since I couldn't use a database, I preferred to build everything by hand with Node. I did this for two reasons: Node is much lighter and would force me to think about every folder structure, since express provides almost nothing but the server.

About the libraries: I only included express because it is the basics of a web application and jest to do the unit tests.

## How can use

The json-digital-account contain just a ```/initialize``` endpoint that waits an archive like the one at ```support/shared_examples``` folder.
Using postman or insomnia, select POST verb and type ```localhost:{PORT}/initialize```, after choose Form URL Encoded how payload, type payload in key_input and put a file in a value_input.

Done.

Now, you can test any other combination in a json file to prove app.

## Adittional information

There were some details that I intended to add, but I decided to stop here because I was getting too attached to the code and falling into a paralyzing perfectionism, so that's it.

## pt-BR version


### Explica????es t??cnicas

Escolhi usar o bom e velho MVC por se tratar de uma aplica????o simples.

Resolvi n??o implementar tudo desde o come??o, assim fui evoluindo naturalmente a aplica????o. Costummo me inspirar na frase de Alan Kay: "make it works, make it correct, make it fast, make it cheap", de modo que procurei reproduzir isso no hist??rico de commits do projeto.

Procurei usar o mais que pude uma estrutura de commit sem??ntico. Com o meu formid??vel ingl??s de Trinidade e Tobago, voc??s perceber??o que n??o foi dif??cil. Costumo usar o padr??o Karma Commit (at?? onde eu sei ?? o padr??o usado no core do Angular).

## Framework e bibliotecas

Naturalmente eu escolheria o Rails para construir essa aplica????o, mas como n??o poderia usar banco de dados, preferi montar tudo na m??o com o Node mesmo. Fiz isso por dois motivos: o Node ?? muito mais leve e me for??aria a pensar em cada estrutura de pastas, j?? que o express n??o prov?? quase nada al??m do server.

Sobre as bibliotecas: s?? inclu?? o express porque ?? o b??sico de uma aplica????o web e o jest para realizar os testes unit??rios.

## Como usar

A conta json-digital cont??m apenas um endpoint ```/initialize"``` que espera um arquivo como o que se encontra na pasta ```shared/shared_examples".

Utilizando postman ou insomnia, selecione o verbo POST e digite ```localhost:{PORT}/initialize``` (na url), depois de escolher ```Form URL Encoded``` como payload, ponha payload no input chave e coloque um arquivo no input de valor.

Feito.

Agora voc?? pode testar qualquer outra combina????o num arquivo json para provar a aplica????o.

### Informa????es adicionais

Havia alguns detalhes que eu pretendia adicionar, mas decidi parar por aqui porque j?? estava me apegando demais ao c??digo e caindo num perfeccionismo paralizante, ent??o ?? isso.
