import {RespostaFx} from "@/utils/resposta";

export default function calculaMetodoNewton(
  f: (x: number) => number,
  fLinha: (x: number) => number,
  x0: number,
  tolerancia: number
): {r: RespostaFx[], ms: number} {
  const inicio = performance.now()

  let x = x0
  let fx = f(x)

  const respostas: RespostaFx[] = []

  do {
    x = x - (f(x) / fLinha(x))
    fx = f(x)

    respostas.push({x, fx})
  } while (Math.abs(fx) > tolerancia)

  const fim = performance.now()

  return {
    r: respostas,
    ms: fim - inicio
  }
}