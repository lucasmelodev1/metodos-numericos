import {Resposta} from "@/utils/resposta";

export default function calculaMetodoBissecao(
  funcao: (x: number) => number,
  a: number,
  b: number,
  precisao: number,
  iteracoesMaximas: number = 1000
): {r: Resposta[], ms: number} {
  const inicio = performance.now()

  let x = (a + b) / 2
  let resposta: Resposta = {
    a,
    b,
    x,
    fx: funcao(x),
  }
  let i: Resposta[] = [resposta]

  let fa = funcao(a)
  let fb = funcao(b)
  let fx = funcao(x)
  let iteracoes = 0

  while (Math.abs(fx) > precisao && iteracoes < iteracoesMaximas) {
    if (fa * fx < 0) {
      b = x
      fb = fx
    } else {
      a = x
      fa = fx
    }
    x = (a + b) / 2
    fx = funcao(x)
    iteracoes++

    i.push({
      a,
      b,
      x,
      fx,
    })
  }

  const fim = performance.now()
  // if (Math.abs(fc) <= precisao) {
    return {
      r: i,
      ms: (fim - inicio)
    }
  // }
}