import {Resposta} from "@/utils/resposta";

export default function calculaMetodoFalsaPosicao(
  f: (x: number) => number,
  a: number,
  b: number,
  precisao: number,
  iteracoesMaximas: number = 1000
): {r: Resposta[], ms: number} {
  const inicio = performance.now()

  let erro = Number.MAX_VALUE;
  let iteracoes = 0;
  let x = 0;
  let fx = 0;
  let fa = f(a);
  let fb = f(b);

  const resposta: Resposta = {
    a,
    b,
    x,
    fx
  }

  const respostas: Resposta[] = [resposta]

  if (fa * fb > 0) {
    throw new Error('Não há raiz no intervalo fornecido');
  }

  while (erro > precisao && iteracoes < iteracoesMaximas) {
    x = (a * fb - b * fa) / (fb - fa);
    fx = f(x);

    if (fa * fx < 0) {
      b = x;
      fb = fx;
    } else {
      a = x;
      fa = fx;
    }

    erro = Math.abs(fx);
    iteracoes++;

    respostas.push({
      a,
      b,
      x,
      fx
    })
  }

  const fim = performance.now()

  return {
    r: respostas,
    ms: fim - inicio
  };
}