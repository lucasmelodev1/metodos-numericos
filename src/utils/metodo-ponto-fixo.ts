import {Resposta, RespostaFx} from "@/utils/resposta";

export default function calculaMetodoPontoFixo(
  phi: (x: number) => number,
  x0: number,
  epsilon: number,
  iterMax: number = 1000,
): {r: RespostaFx[], ms: number} {
  const inicio = performance.now()

  let x = x0
  let iter = 0
  let erro = Number.MAX_VALUE
  const respostas: RespostaFx[] = []

  while (erro > epsilon && iter < iterMax) {
    const xProx = phi(x)
    erro = Math.abs(xProx - x)

    respostas.push({
      x,
      fx: erro
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