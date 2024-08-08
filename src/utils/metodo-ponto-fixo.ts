import {Resposta, RespostaErro} from "@/utils/resposta";

export default function calculaMetodoPontoFixo(
  f: (x: number) => number,
  x0: number,
  epsilon: number,
  iterMax: number = 1000,
): {r: RespostaErro[], ms: number} {
  const inicio = performance.now()

  let x = x0
  let iter = 0
  let erro = Number.MAX_VALUE
  const respostas: RespostaErro[] = []

  while (erro > epsilon && iter < iterMax) {
    const xProx = f(x)
    erro = Math.abs(xProx - x)

    respostas.push({
      x,
      erro
    })

    x = xProx
    iter++
  }

  const fim = performance.now()

  return {
    r: respostas,
    ms: fim - inicio
  }
}