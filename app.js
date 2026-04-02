/**************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de estados
 * e cidades
 * Data: 01/04
 * Autou: Francisco Wala
 * Versão: 1.0
 **************************************************************************/

/***********************************************************************************************
 * Para configurar a API:
 * 
 * 1 - Instalar o EXPRESS   -> npm install express --save
 *  Dependencia para configurar e uitilizar o protocolo HTTP para criar a API
 * 
 ***********************************************************************************************

 * 2 - Instalar o CORS      -> npm install cors --save (Configura as permissões da API)
 *  Dependencia para configurar as permissões de acesso da API
 * 
 ************************************************************************************************/

//Sempre utilizar esses mesmos comandos, então decora, muda se for FastFy
//Import das dependencias para criar a API
const express = require('express')
const cors = require('cors')

//Criando um objeto do express para criar a API
const app = express()

//Configuração do CORS da API
const corsOptions = {
    origin: ['*'],   //Configuração de origem da requisição (IP ou Domínio)
    methods: 'GET',  //Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization'] //Configurações de permissões
    //Tipo de dados  //Autrização de acesso
}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//Import do arquivo de funções
const estadosCidades = require('./modulos/funcoes.js')

//RESPONSE  --> Devolve do back
//REQUEST   --> Petição do front
//Retorna uma lista de estados
app.get('/v1/senai/estados', function (request, response) {
    let estados = estadosCidades.getListaDeEstados()

    if (estados) {
        response.status(200)//Requisição bem sucedida!!!
        response.json(estados)
    } else {
        response.status(404)
        response.json({ "message": "nenhuma estado foi encontrado" })
    }

})
//Retorna dados de um estado pela sigla
app.get('/v1/senai/dados/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)
    if (estado) {
        response.status(200)
        response.json(estado)
    } else {
        response.status(404)
        response.json({ "message": "nenhum estado foi encontrado" })
    }

})
//Retorna dados da capital filtrando pela sigla do estado
app.get('/v1/senai/capital/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estado = estadosCidades.getCapitalEstado(sigla)
    if (estado) {
        response.status(200)
        response.json(estado)
    } else {
        response.status(404)
        response.json({ "message": "nenhuma capital foi encontrada" })
    }

})
//Retornar os estados filtrando pela regiao
app.get('/v1/senai/estados/regiao/:regiao', function (request, response) {
    let regiao = request.params.regiao
    let estados = estadosCidades.getEstadosRegiao(regiao)
    if (estados) {
        response.status(200)
        response.json(estados)
    } else {
        response.status(404)
        response.json({ "message": "nenhuma regiao foi encontrada" })
    }
})

//Retorna os estados que foram capital do brasil
app.get('/v1/senai/estados/capital/pais/brasil', function (request, response) {
    //se um dia quiser adicionar outros paises
    //app.get('v1/senai/estados/capital/pais/:pais/:')
    let estados = estadosCidades.getCapitalPais()
    if (estados) {
        response.status(200)
        response.json(estados)
    } else {
        response.status(404)
        response.json({ "message": "nenhuma capital do pais foi encontrada" })
    }
})

//Retorna estados que foram capital do brasil
app.get('/v1/senai/cidades/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estados = estadosCidades.getCidades(sigla)
    if (estados) {
        response.status(200)
        response.json(estados)
    } else {
        response.status(404)
        response.json({ "autor": "Francisco Wala", "status_code": 404, "message": "nenhuma cidade do estado foi encontrada " })
    }
})

app.get('/v1/senai/help/', function (request, response) {
    let docAPI = {
        "api-description": "API para manipular dados de Estdaos e Cidades",
        "date": "2026/04/02",
        "developement": "Francisco Wala",
        "version": '1.0.2.4',
        "endpoints": [
            {
                "router1": "/v1/senai/estados",
                "description": "Retorna a lista de todos os estados"
            },
            {
                "router2": "/v1/senai/dados/estado/sp",
                "description": "Retorna a lista dados de um estado filtrando pela sigla"
            },
            {
                "router3": "'/v1/senai/capital/estado/sp",
                "description": "Retorna dados da capital filtrando pela sigla"
            },
            {
                "router4": "/v1/senai/estados/regiao/norte",
                "description": "Retorna os estados filtrando pela regiao"
            },
            {
                "router5": "/v1/senai/estados/capital/pais/brasil",
                "description": "Retorna os estados que foram capitais do Brasil"
            },
            {
                "router6": "/v1/senai/cidades/estado/sp",
                "description": "Retorna as cidades filtrando pela sigla do estado"
            }
        ]
    }
    response.status(200)
    response.json(docAPI)
})
//Fazer o Start da API (Aguardando requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})