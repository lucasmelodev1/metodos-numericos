import {Resposta, RespostaFx} from "@/utils/resposta";

export default function calculaMetodoSecante(
  f: (x: number) => number,
  a: number,
  b: number,
  tol: number,
  iterMax: number = 1000
): {r: Resposta[], ms: number} {
  const inicio = performance.now()

  let x = 0
  let iter = 0
  const respostas: Resposta[] = []

  while (iter < iterMax) {
    x = b - f(b) * (b - a) / (f(b) - f(a))

    respostas.push({
      a,
      b,
      x,
      fx: f(x),
    })

    if (Math.abs(f(x)) < tol) {
      const fim = performance.now()

      return {
        r: respostas,
        ms: fim - inicio
      }
    }

    a = b
    b = x
    iter++
  }

  const fim = performance.now()

  return {
    r: [],
    ms: fim - inicio
  }
}