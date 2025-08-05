//Esse arquivo vai ser onde vou botar as funções que eu uso em vários lugares
//e não são responsáveis por nenhuma API específica


//Essa função faz a req para a API de CEP, e retorna o endereço completo
export async function buscarEndereco(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
} 
//Essa função formata o  celular para ficar no estilo (xx) xxxxx-xxxx
export function formatarCelular(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    if (valor.length > 7) {
      return `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 6) {
      return `(${valor.slice(0, 2)}) ${valor.slice(2, 5)}-${valor.slice(5)}`;
    } else if (valor.length > 2) {
      return `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length > 0) {
      return `(${valor}`;
    }
    return '';
  }
//Essa função formata o cpf para ficar no estilo xx.xxx.xxx-xx
export function formatarCpf(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    if (valor.length > 9) {
      return `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6, 9)}-${valor.slice(9)}`;
    } else if (valor.length > 6) {
      return `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6)}`;
    } else if (valor.length > 3) {
      return `${valor.slice(0, 3)}.${valor.slice(3)}`;
    } else if (valor.length > 0) {
      return valor;
    }
    return '';
  }
//Essa função formata o CEP para ficar no estilo xx.xxx-xxx
export function formatarCep(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 8)  valor = valor.slice(0,8);
    if (valor.length > 5) {
      return `${valor.slice(0, 5)}-${valor.slice(5)}`;
    } else if (valor.length > 0) {
      return valor;
    }
    return '';
  }
//A seguinte função vai ser para fazer o diferencial de paginação
export function gerarPaginas(paginaAtual, totalPaginas) {
  //Como parâmetros preciso apenas da página atual e o total de páginas
  //Vou criar um array vazio, que vai ser a paginação
    const paginas = [];
    //Já vou puxar a primeira página, pois não importa a quantidade, ela sempre vai estar
    paginas.push(1);
    //Agora vou usar alguns Ifs e elses para fazer com que seja dinâmico, e dependendo da página atual, eu vou mostrar as páginas que eu quero
    if (totalPaginas < 8) {
      //No caso se tivermos 7 páginas vou mostrar todas elas
        for (let i = 2; i <= totalPaginas; i++) {
            paginas.push(i);
        };
    } else {
      /*
      Se não tivermos 7 páginas, e a página atual estiver no início, entre 0 e 5
      eu vou mostar as páginas 1,2,3,4,5 e depois os ... e no final a última página que no caso é o total
      */
      if (paginaAtual < 5) {
        for (let i = 2; i <= 5; i++){
          paginas.push(i);
        };
        paginas.push("...");
        paginas.push(totalPaginas)
      }
      //Agora se estiver no meio, vou mostar a primeira, os ... depois uma página antes, a atual e uma página depois, os ... e no final a última página
      else if (paginaAtual > 4 && paginaAtual <= totalPaginas - 3) {
        paginas.push("...");
        for (let i = paginaAtual - 1; i <= paginaAtual + 1; i++){
          paginas.push(i);
        }
        paginas.push("...");
        paginas.push(totalPaginas);
      }
      //Por fim, se estiver no final, vou mostar a primeira, os ... e depois as 4 últimas páginas
      else if (paginaAtual > totalPaginas - 3) {
        paginas.push("...");
        for (let i = totalPaginas - 3; i <= totalPaginas; i++){
          paginas.push(i);
        }
      }
    }
    //Por fim, retorno o array com o formato da paginação
    return paginas;
}