# Verificador-SubArray-Continuo
Este projeto é uma aplicação web simples que verifica se um array de números inteiros contém um subarray contínuo cuja soma é múltipla de um número dado (k). A aplicação oferece validação de entradas, permitindo apenas números inteiros positivos e vírgulas no array, além de garantir que k seja um número inteiro positivo.

# Problema:
Dado um array de números inteiros 'nums' e um inteiro 'k', é necessário retornar true se houver um subarray(subsequência contínua) onde a soma dos elementos seja um múltiplo de k e sua extensão seja de no mínimo dois elementos. Do contrário será false.

Constraints:

    1 <= nums.length <= 105
    0 <= nums[i] <= 109
    0 <= sum(nums[i]) <= 231 - 1
    1 <= k <= 231 - 1


# Solução:
Este projeto é uma aplicação web onde verifica se um array de números inteiros contém um subarray contínuo cuja soma é múltipla de um número dado (k). A aplicação oferece validação de entradas (os valores cujo usuário digitou), permitindo apenas números inteiros positivos e vírgulas no array, além de garantir que k seja um número inteiro positivo.

Sendo assim, é sempre exibido mensagens quando os dados inputados nas entradas não estejam de acordo com as validações necessárias, facilitando assim, a compreensão para que o usuário possa corrigir, também é importante ressaltar que o resultado é exibido dinamicamente na interface.

# Como foi realizado o cálculo:
Levando em consideração o problema principal atrelado ao cuidado com as constraints, pensei em criar uma aplicação dinâmica e repleta de validações que satisfaçam o cuidado e alerta com as constraints, nesse sentido, criei uma abordagem onde faço uma soma acumulada e um hash map para verificar o subarray. 
Abaixo está um passo a passo explicando por que foi estruturado dessa forma.

1. Soma Acumulada e Resto:
    Durante a iteração pelo array, mantém-se uma soma acumulada (contadorSoma).
    Calcula-se o resto da divisão dessa soma acumulada por k (resto = contadorSoma % k).
    O resto representa a "distância" da soma acumulada até o múltiplo mais próximo de k.
    
2. HashMap de Resto e Índice:
    O HashMap armazena o resto como chave e o índice onde esse resto foi encontrado como valor.
    Por exemplo, se o resto r foi encontrado no índice i, o HashMap armazenará r como chave e i como valor: mapeandoIndex.set(r, i).

3. Razão para Armazenar o Índice:    
    Encontrar Subarrays com Soma Múltipla de k: Se o resto da soma acumulada em um determinado índice já foi encontrado anteriormente em um índice anterior, isso indica que a soma dos elementos entre esses dois índices é um múltiplo de k.
    Verificação do Comprimento do Subarray: Armazenar o índice permite verificar a distância entre os índices onde o mesmo resto foi encontrado. Se a distância entre os índices for maior que 1 (i - prevIndex > 1), isso confirma que o subarray tem pelo menos dois elementos.

## Código:

    function checkSubarraySum(nums, k) {
    const mapeandoIndex = new Map();
    mapeandoIndex.set(0, -1);
  
    let contadorSoma = 0;
  
    for (let i = 0; i < nums.length; i++) {
      contadorSoma += nums[i];
      let resto = contadorSoma % k;

    if (resto < 0) resto += k;

    if (mapeandoIndex.has(resto)) {
      const prevIndex = mapeandoIndex.get(resto);
      if (i - prevIndex > 1) {
        return nums.slice(prevIndex + 1, i + 1);
      }
    } else {
      mapeandoIndex.set(resto, i);
      }
    }
      return null;
    }

## Validação dos Inputs

1. Obter Valores: Captura os valores dos inputs do usuário e valida.
2. Verificação de Inputs:
    * Verifica se os valores são válidos e são números.
    * Remove caracteres não numéricos do array de números, ou seja, não é permitido vogais e consoantes.
    * Converte os valores para inteiros.      
      
3. Chamada da Função: Caso os valores sejam válidos, chama checkSubarraySum e exibe o resultado.

## Código:

    function validacaoInputs() {
      const numsInput = document.getElementById('nums').value;
      const kInput = document.getElementById('k').value;
      const resultDiv = document.getElementById('result');
    
      if (!numsInput || !kInput) {
        resultDiv.innerText = 'Por favor, insira valores válidos para o array e k.';
        resultDiv.style.color = '#dc3545';
        return;
      }
    
      const validadorRegexArray = numsInput.replace(/[a-zA-Z]/g, '');
      document.getElementById('nums').value = validadorRegexArray;
    
      const numsArray = validadorRegexArray.split(',').map((num) => parseInt(num.trim()));
      const k = parseInt(kInput);
    
      if (numsArray.some(isNaN) || isNaN(k)) {
        resultDiv.innerText = 'Por favor, certifique-se de que todos os valores inseridos sejam números válidos.';
        resultDiv.style.color = '#dc3545';
        return;
      }
    
      if (numsArray.some((num) => num < 0) || k < 0) {
        resultDiv.innerText = 'Números negativos não são permitidos no array ou no valor de k.';
        resultDiv.style.color = '#dc3545';
        return;
      }
    
      const subarray = checkSubarraySum(numsArray, k);
    
      if (subarray) {
        resultDiv.innerText = `Existe um subarray contínuo que atende aos critérios: [${subarray.join(', ')}]`;
        resultDiv.style.color = '#28a745';
      } else {
        resultDiv.innerText = 'Não existe um subarray contínuo que atenda aos critérios.';
        resultDiv.style.color = '#dc3545';
      }
    }
    
    function limparValor() {
      const numsInput = document.getElementById('nums');
      numsInput.value = '';
      numsInput.focus();
    }
    
    window.addEventListener('DOMContentLoaded', () => {
      const checkButton = document.getElementById('checkButton');
      const clearArray = document.getElementById('clear');
    
      checkButton.addEventListener('click', validacaoInputs);
      clearArray.addEventListener('click', limparValor);
    });

## Informações importantes
Diversas validações foram realizadas para garantir que o código funcione corretamente. Abaixo, seguem as observações:

* Foi realizado um tratamento para restos negativos,  adicionando o valor de k ao resto negativo para assegurar que todos os restos não sejam negativos, facilitando assim a utilização do hash map.
* As mensagens são sempre utilizadas para facilitar a compreensão do usuário.
