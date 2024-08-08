import {RespostaErro} from "@/utils/resposta";

export default function calculaMetodoNewton(
  f: (x: number) => number,
  fLinha: (x: number) => number,
  x0: number,
  erro: number
): {r: RespostaErro[], ms: number} {
  const inicio = performance.now()

  let x = x0
  let xAnterior = x0
  let erroAtual = 1

  const respostas: RespostaErro[] = []

  while (erroAtual > erro) {
    x = xAnterior - f(xAnterior) / fLinha(xAnterior)
    erroAtual = Math.abs(x - xAnterior)
    xAnterior = x

    respostas.push({x, erro: erroAtual})
  }

  const fim = performance.now()

  return {
    r: respostas,
    ms: fim - inicio
  }
}