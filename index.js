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

function totalDeDezenasParesImpares(concursos){
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

function totalDeSequenciasSorteadas(concursos){
  /*
public IEnumerable<TotalSequenciasSorteadas> TotalSequenciaSorteadas()
  {
      var sequencias = new List<TotalSequenciasSorteadas>();
      var sequencia = new TotalSequenciasSorteadas();
      foreach (var concurso in _concursos)
      {
          var gruposSequencias = Sequencia(concurso.Dezenas);
          if (gruposSequencias.Count == 0)
              continue;
          else
          {
              sequencia.TotalSequencias++;
          }
      }
      sequencia.TotalConcursos = _concursos.Count;
      sequencias.Add(sequencia);
      return sequencias;
  }
  */
  let  sequenciasSorteadas = {
    totalSequencias : 0,
    totalConcursos : 0
  }
  
  for (i=0; i < concursos.length; i++) {
    let concurso = concursos[i];
    let gruposSequencias = identificaSequencia(concurso)
    if (gruposSequencias.length == 0) {
        continue
    }
    else {
        sequenciasSorteadas.totalSequencias++
    }
  }
  sequenciasSorteadas.totalConcursos = concursos.length
  return sequenciasSorteadas
}

function identificaSequencia(concurso){
  /*
private List<List<int>> Sequencia(IEnumerable<int> lista)
  {
      var sequencia = new List<List<int>>();
      var listaOrd = lista.OrderBy(i => i);
      var aux = new List<int>();
      for (int i = 0; i < listaOrd.Count() - 1; i++)
      {
          if (listaOrd.ElementAt(i) + 1 == listaOrd.ElementAt(i + 1))
          {
              aux.Add(listaOrd.ElementAt(i));
              aux.Add(listaOrd.ElementAt(i + 1));
          }
          else
          {
              if (aux.Count != 0)
                  sequencia.Add(aux);
              aux = new List<int>();
          }
      }
      return sequencia;
  }
  */ 
  let sequencias = []
  let dezenas = [concurso.Dezena1, concurso.Dezena2, concurso.Dezena3, concurso.Dezena4, concurso.Dezena5, concurso.Dezena6]
  let listaOrd = dezenas.sort((a,b)=>{return a-b})
  let aux = []
  for (i = 0; i < listaOrd.length - 1; i++) {
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

function sequenciasMaisSorteadas(){

}

function totalConcursos(){

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
  let concursos = JSON.parse(await readData());
  console.log(totalDeDezenasParesImpares(concursos));
  console.log(totalDeSequenciasSorteadas(concursos));
  //jsonNumbers.forEach()
  console.log(concursos)
})();