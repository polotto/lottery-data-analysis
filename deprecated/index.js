const util = require('util');
const fs = require('fs');
const d3 = require('d3');
const _ = require('lodash');
const loteriasCaixaJson = require('loterias-caixa-json')

function saveData(jsonData) {
  let json = JSON.stringify(jsonData);
  fs.writeFile('data/megaJsonFile.json', json, 'utf8', function(err) {
      if (err){
        console.error(err)
      }
  });
}

async function readData(){
  let readFile = util.promisify(fs.readFile);
  return await readFile('data/megaJsonFile.json')
}

function downloadData(){
  // Mega sena
  loteriasCaixaJson.megaSena('data/')
  .then((jsonArray) => {
    // Retorno de todos os jogos da mega sena em formato json
    saveData(jsonArray);
    return jsonArray;
  }).catch((err) => {
    console.error(err)
  });
}

function totalDeDezenasParesImpares(concursos) {
  let totalParImpar = {
    totalDeDezenasPares : 0,
    totalDeDezenasImpares : 0,
    totalDeDezenasSorteadas : 0
  }
  for (i = 0; i < concursos.length; i++) {
    let concurso = concursos[i];
    if (concurso.Dezena1 % 2 === 0) {
      totalParImpar.totalDeDezenasPares++
    }
    else {
      totalParImpar.totalDeDezenasImpares++
    }

    if (concurso.Dezena2 % 2 === 0) {
      totalParImpar.totalDeDezenasPares++
    }
    else {
      totalParImpar.totalDeDezenasImpares++
    }

    if (concurso.Dezena3 % 2 === 0) {
      totalParImpar.totalDeDezenasPares++
    }
    else {
      totalParImpar.totalDeDezenasImpares++
    }

    if (concurso.Dezena4 % 2 === 0) {
      totalParImpar.totalDeDezenasPares++
    }
    else {
      totalParImpar.totalDeDezenasImpares++
    }

    if (concurso.Dezena5 % 2 === 0) {
      totalParImpar.totalDeDezenasPares++
    }
    else {
      totalParImpar.totalDeDezenasImpares++
    }

    if (concurso.Dezena6 % 2 === 0) {
      totalParImpar.totalDeDezenasPares++
    }
    else {
      totalParImpar.totalDeDezenasImpares++
    }

    totalParImpar.totalDeDezenasSorteadas = totalParImpar.totalDeDezenasPares + totalParImpar.totalDeDezenasImpares
  }
  return totalParImpar
}

function totalDeSequenciasSorteadas(concursos) {
  let  sequenciasSorteadas = {
    totalDeSequencias : 0,
    totalDeConcursos : 0
  }
  
  for (let i=0; i < concursos.length; i++) {
    let concurso = concursos[i];
    let gruposSequencias = identificaSequencia(concurso)
    if (gruposSequencias.length == 0) {
        continue
    }
    else {
        sequenciasSorteadas.totalDeSequencias++
    }
  }
  sequenciasSorteadas.totalDeConcursos = concursos.length
  return sequenciasSorteadas
}

function identificaSequencia(concurso) {
  let sequencias = []
  let dezenas = [concurso.Dezena1, concurso.Dezena2, concurso.Dezena3, concurso.Dezena4, concurso.Dezena5, concurso.Dezena6]
  let listaOrd = dezenas.sort((a,b)=>{return a-b})
  let aux = []
  for (let i = 0; i < listaOrd.length - 1; i++) {
      if (listaOrd[i] + 1 == listaOrd[i + 1]) {
          aux.push(listaOrd[i])
          aux.push(listaOrd[i + 1])
      }
      else {
          if (aux.length != 0) {
              sequencias.push(aux)
          }
          aux = []
      }
  }
  return sequencias
}

function sequenciasMaisSorteadas(concursos) {
  let sequencias = []
  for (let i=0; i < concursos.length; i++) {
    let concurso = concursos[i]  
    let gruposSequencias = identificaSequencia(concurso);
      if (gruposSequencias.length == 0) {
          continue
      }
      for (let j=0; j < gruposSequencias.length; j++) {
        let grupoSequencia =  gruposSequencias[j]
        
        let sequencia = sequencias.find((sequenciaObj) => {
          if (sequenciaObj.sequencia[0] == grupoSequencia[0] ){
            return true
          }
          return false
        })
        if (sequencia == null || sequencia.length == 0) {
            let con = []
            con.push(concurso.Concurso)
            sequencias.push({
                    quantidade : 1,
                    sequencia : grupoSequencia,
                    concursos : con
                })
        }
        else {
            sequencia.quantidade++
            sequencia.concursos.push(concurso.Concurso);
        }
      }
  }

  return sequencias.sort((a,b)=>{return b.quantidade-a.quantidade})
}

function totalConcursos(concursos) {
  var total = [];
  total.push({
        numeroTotalDeConcursos = concursos.length,
        totalDeConcursosAcumulados = concursos.filter((obj)=>{return obj.Acumulado==true}).length,
        totalDePessoasPremiadasComSena = concursos.filter((obj)=>{return obj.Acumulado==false}).length
      })
  return total
}

function totalGanhadores(){
  
}

function concursoComMaiorRateio(){

}

function dataComMaisSorteios(){

}

function dispersao(){

}

function estadoComMaisGanhadoresSena(){

}

function concursosComMaisGanhadores(){

}

function dezenasMaisSorteadas(){

}

(async () =>{
  let concursos = JSON.parse(await readData())
  console.log(totalDeDezenasParesImpares(concursos))
  console.log(totalDeSequenciasSorteadas(concursos))
  console.log(sequenciasMaisSorteadas(concursos))
  console.log(concursos)
})();