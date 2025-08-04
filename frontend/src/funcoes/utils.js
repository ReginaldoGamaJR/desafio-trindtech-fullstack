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
    if (valor.length > 8) valor = valor.slice(0,8);
    if (valor.length > 5) {
      return `${valor.slice(0, 5)}-${valor.slice(5)}`;
    } else if (valor.length > 0) {
      return valor;
    }
    return '';
  }
