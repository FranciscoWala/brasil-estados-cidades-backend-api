/********************************************************************************
 * Objetivo do projeto: Criar funções para realizar buscas dentro de Banco 
 * de Dados(Simulado por Prof. Marcel)
 * Autor: Francisco Wala
 * Data: 18/03/2026
 * Versão: 1.0
 *********************************************************************************/
const arquivo = require('./arquivo')

/**Requisitos do Sistema
● Criar uma função (getListaDeEstados) que retorna a lista de todos os
estados do Brasil.

● Criar uma função (getDadosEstado) que retorna as informações referente
a um estado do Brasil, onde a sigla do estado será o critério de filtro.

● Criar uma função (getCapitalEstado) que retorna as informações
referente a capital de um estado do Brasil, onde a sigla do estado será o
critério de filtro.

● Criar uma função (getEstadosRegiao) que retorna as informações
referente aos estados do Brasil conforme a sua região, onde a região será o
critério de filtro.

Desafio bem legal, mas esse é mais legal do que
os outros

● Criar uma função (getCapitalPais) que retorna as informações referente
aos estados que formam a capital do Brasil.

● Criar uma função (getCidades) que retorna uma lista de cidades, filtrado
pela sigla do estado.

Bom Divertimento!!! */

// console.log(arquivo.listaDeEstados.estados)

function getListaDeEstados() {
    let uf = []
    let quantidade = 0
    arquivo.listaDeEstados.estados.forEach(function (itemEstados) {
        uf.push(itemEstados.sigla)
        if (itemEstados) {
            quantidade++
        }
    })
    // let estados = {
    //     uf,
    //     quantidade
    // }
    let estados = {
        status: true,
        status_code: 200,
        desenvolvedor: 'Francisco Wala',
        uf: uf,
        quantidade: quantidade
    }
    return estados
}

/*
Cópia abaixo de Matheus Lucas, aluno de DS2T, em pair programming com Francisco Wala, também estudante da turma
informada antes, para adicionar ao meu projeto as mesmas funcionalidades para futura criação de API
*/

// Verificando os dados do estado de acordo com a UF
function getDadosEstado(siglaUF) {
    let buscarSigla = String(siglaUF).toUpperCase()
    let dadosEstados = {}
    let uf
    let descricao
    let capital
    let regiao
    arquivo.listaDeEstados.estados.forEach(function (itemUF) {

        if (buscarSigla == itemUF.sigla) {
            uf = itemUF.sigla
            descricao = itemUF.nome
            capital = itemUF.capital
            regiao = itemUF.regiao
        }
    })
    dadosEstados = {
        status: true,
        status_code: 200,
        desenvolvedor: 'Francisco Wala',
        uf,
        descricao,
        capital,
        regiao
    }
    if (dadosEstados.uf != null && dadosEstados.descricao != null && dadosEstados.capital != null) {
        return dadosEstados
    } else {
        return false
    }

}



// Verificando os dados da capital de acordo com a UF
function getCapitalEstado(siglaUF) {
    let buscarSigla = String(siglaUF).toUpperCase()
    let dados = [getDadosEstado(buscarSigla)]
    let dadosCapital = {}

    dados.forEach(function (itensDados) {
        uf = itensDados.uf
        descricao = itensDados.descricao
        capital = itensDados.capital
    })
    dadosCapital = { uf, descricao, capital }
    if(dadosCapital.uf!=null&&dadosCapital.descricao&&dadosCapital.capital!=null){
         return dadosCapital
    }else{
        return false
    }
}


function getEstadosRegiao(buscarRegiao) {
    let estadoRegiao = {}
    let regiaoMod = String(buscarRegiao).toUpperCase()
    let regiao
    let uf
    let descricao
    let estados = []
    let estadoDescricao = {}

    arquivo.listaDeEstados.estados.forEach(function (itemRegiao) {

        if (regiaoMod === String(itemRegiao.regiao).toUpperCase()) {
            uf = itemRegiao.sigla
            descricao = itemRegiao.nome
            regiao = itemRegiao.regiao

            estadoDescricao = {
                uf, descricao
            }

            estados.push(estadoDescricao)
        }
    })
    estadoRegiao = {
        status: true,
        status_code: 200,
        desenvolvedor: 'Francisco Wala',
        regiao,
        estados
    }
    if(estadoRegiao.regiao != null && estadoRegiao.estados !=null){
        return estadoRegiao
    }else{
        return false
    }
}

function getCapitalPais() {
    let resposta = { capitais: [] }

    arquivo.listaDeEstados.estados.forEach(function (estado) {
        if (estado.capital_pais) {
            resposta.capitais.push(
                {
                    status: true,
                    status_code: 200,
                    desenvolvedor: 'Francisco Wala',
                    estado_atual: estado.capital,
                    uf: estado.sigla,
                    descricao: estado.nome,
                    estado: estado.capital,
                    regiao: estado.regiao,
                    capital_pais_ano_inicio: estado.capital_pais.ano_inicio,
                    capital_pais_ano_fim: estado.capital_pais.ano_fim
                }
            )

        }
    })

    if (resposta != null) {
        return resposta;
    } else {
        return false
    }
}

function getCidades(siglaEstado) {
    let siglaStd = siglaEstado.toUpperCase()
    uf = [getDadosEstado(siglaStd)]
    let cidades = []
    let quantidade = 0
    // let descricaoEstado = {}
    arquivo.listaDeEstados.estados.forEach(function (itemCidade) {
        if (itemCidade.sigla === siglaStd) {
            quantidade = itemCidade.cidades.length
        }
    })
    arquivo.listaDeEstados.estados.forEach(function (itemEstado) {
        if (itemEstado.sigla === siglaStd) {
            for (let nomesCidades in itemEstado.cidades) {
                cidades.push(itemEstado.cidades[nomesCidades].nome)
            }
        }

    })
    uf.forEach(function (montarItem) {
        let uf = montarItem.uf
        let descricao = montarItem.descricao
        if (siglaStd) {
            descricaoCidade = {
                status: true,
                status_code: 200,
                desenvolvedor: 'Francisco Wala',
                uf,
                descricao,
                quantidade,
                cidades
            }
        }
    })
    if(descricaoCidade.uf != null && descricaoCidade.quantidade!=null&& descricaoCidade.descricao!=null&&descricaoCidade.cidades.length>0){
        return descricaoCidade
    }else{
        return false
    }
    
}

module.exports = {
    getCidades,
    getEstadosRegiao,
    getCapitalEstado,
    getDadosEstado,
    getListaDeEstados,
    getCapitalPais,
}
