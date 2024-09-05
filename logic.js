function checkSubarraySum(nums, k) {
  // Dicionário para armazenar o resto da divisão e seu índice
  const mapeandoIndex = new Map();
  mapeandoIndex.set(0, -1);

  // Soma total dos elementos contidos no 'nums' até o índice atual
  let contadorSoma = 0;

  for (let i = 0; i < nums.length; i++) {
    contadorSoma += nums[i];
    let resto = contadorSoma % k;

    // Ajuste de caso onde o resto é negativo
    if (resto < 0) resto += k;

    if (mapeandoIndex.has(resto)) {
      const prevIndex = mapeandoIndex.get(resto);
      if (i - prevIndex > 1) {
        // Caso for encontrado o SubArray, ele retorna mostrando os valores
        return nums.slice(prevIndex + 1, i + 1);
      }
    } else {
      mapeandoIndex.set(resto, i);
    }
  }
  return null; // Retorna null se nenhum subarray foi encontrado
}

// Função para validar as informações em que o usuário colocou
function validacaoInputs() {
  const numsInput = document.getElementById('nums').value;
  const kInput = document.getElementById('k').value;
  const resultDiv = document.getElementById('result');

  // Validação dos valores
  if (!numsInput || !kInput) {
    resultDiv.innerText = 'Por favor, insira valores válidos para o array e k.';
    resultDiv.style.color = '#dc3545';
    return;
  }

  // Remover letras do array usando regex para melhor validação
  const validadorRegexArray = numsInput.replace(/[a-zA-Z]/g, '');

  // Atualizar o campo com o regex feito caso tenha vogais e/ou consoantes
  document.getElementById('nums').value = validadorRegexArray;

  // Conversão dos valores
  const numsArray = validadorRegexArray
    .split(',')
    .map((num) => parseInt(num.trim()));
  const k = parseInt(kInput);

  // Verificação dos valores inválidos no array e em k
  if (numsArray.some(isNaN) || isNaN(k)) {
    resultDiv.innerText =
      'Por favor, certifique-se de que todos os valores inseridos sejam números válidos.';
    resultDiv.style.color = '#dc3545';
    return;
  }

  // Verificação de números negativos no array e em k
  if (numsArray.some((num) => num < 0) || k < 0) {
    resultDiv.innerText =
      'Números negativos não são permitidos no array ou no valor de k.';
    resultDiv.style.color = '#dc3545';
    return;
  }

  // Chamada da função principal para validar o array
  const subarray = checkSubarraySum(numsArray, k);

  // Exibição do resultado
  if (subarray) {
    resultDiv.innerText = `Existe um subarray contínuo que atende aos critérios: [${subarray.join(
      ', ',
    )}]`;
    resultDiv.style.color = '#28a745';
  } else {
    resultDiv.innerText =
      'Não existe um subarray contínuo que atenda aos critérios.';
    resultDiv.style.color = '#dc3545';
  }
}

// Função para limpar os valores salvos do array
function limparValor() {
  const numsInput = document.getElementById('nums');
  numsInput.value = '';
  numsInput.focus();
}

// Adicionando o evento de clique ao botão após o carregamento da página
window.addEventListener('DOMContentLoaded', () => {
  const checkButton = document.getElementById('checkButton');
  const clearArray = document.getElementById('clear');

  checkButton.addEventListener('click', validacaoInputs);
  clearArray.addEventListener('click', limparValor);
});
