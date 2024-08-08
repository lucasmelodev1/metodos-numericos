'use client'

import {useEffect, useState} from "react";
import calculaMetodoBissecao from "@/utils/metodo-bissecao";
import calculaMetodoFalsaPosicao from "@/utils/metodo-falsa-posicao";
import calculaMetodoPontoFixo from "@/utils/metodo-ponto-fixo";
import calculaMetodoNewton from "@/utils/metodo-newton";
import calculaMetodoSecante from "@/utils/metodo-secante";

export function Home() {
  let p = 0.0001
  const [epsilon, setEpsilon] = useState(p)
  const [precisao, setPrecisao] = useState(p)

  function funcao(x: number): number {
    return Math.pow(x, 3) - 9 * x + 5;
  }

  function phi(x: number): number {
    return (Math.pow(x, 3) + 5) / 9
  }

  function funcaoLinha(x: number): number {
    return 3 * Math.pow(x, 2) - 9
  }

  const bissecao = {...calculaMetodoBissecao(
      funcao,
      0,
      1,
      epsilon,
    )}

  console.log(bissecao.ms)

  const falsaPosicao = calculaMetodoFalsaPosicao(
    funcao,
    0,
    1,
    epsilon,
  )

  const pontoFixo = calculaMetodoPontoFixo(
    phi,
    0,
    epsilon,
  )

  const newton = calculaMetodoNewton(
    funcao,
    funcaoLinha,
    0,
    epsilon,
  )

  const secante = calculaMetodoSecante(
    funcao,
    0,
    1,
    epsilon,
  )

  return (
    <div className={'flex flex-col'}>
      <div className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Métodos Numéricos</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Os métodos de cálculo numérico são técnicas matemáticas que utilizam algoritmos para aproximar soluções de
            problemas que podem ser difíceis ou impossíveis de resolver analiticamente (ou seja, de forma exata).
          </p>
        </div>
      </div>

      <div className="px-6 py-24 lg:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setEpsilon(precisao)
          }}
          className="mx-auto text-base leading-7 text-gray-700 grid gap-8 grid-cols-1 xl:grid-cols-2 items-end">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Precisão
            </label>
            <div className="mt-2">
              <input
                id="precisao"
                name="precisao"
                type="number"
                value={precisao}
                onChange={(e) => setPrecisao(parseFloat(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>

      <h2 className="self-center text-3xl font-bold tracking-tight text-gray-900" suppressHydrationWarning>Vencedor: {
        [
          {nome: 'Bisseção', ms: bissecao.ms},
          {nome: 'Falsa Posição', ms: falsaPosicao.ms},
          {nome: 'Ponto Fixo', ms: pontoFixo.ms},
          {nome: 'Newton', ms: newton.ms},
          {nome: 'Secante', ms: secante.ms},
        ].sort((a, b) => a.ms - b.ms)[0].nome
      }</h2>
      <p className={'self-center mt-8 text-gray-500'}>Função: x^3 - 9x + 5</p>

      <div className="px-6 py-24 lg:px-8">
        <div className="mx-auto text-base leading-7 text-gray-700 grid gap-8 grid-cols-1 xl:grid-cols-2">

          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
              Bisseção
            </div>
            <div className="px-4 py-5 sm:p-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr className="divide-x divide-gray-200">
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    i
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    a
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    x
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    b
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                    f(x)
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {bissecao.r.map((e, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.a}</td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.x}</td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.b}</td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">{e.fx}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-4 sm:px-6">
              Tempo: {bissecao.ms.toFixed(3)} ms
            </div>
          </div>

          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow h-min">
            <div className="px-4 py-5 sm:px-6">
              Falta Posição
            </div>
            <div className="px-4 py-5 sm:p-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr className="divide-x divide-gray-200">
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    i
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    a
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    x
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    b
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                    f(x)
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {falsaPosicao.r.map((e, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.a}</td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.x}</td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.b}</td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">{e.fx}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-4 sm:px-6" suppressHydrationWarning>
              Tempo: {falsaPosicao.ms.toFixed(3)} ms
            </div>
          </div>

          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow h-min">
            <div className="px-4 py-5 sm:px-6">
              Ponto Fixo
            </div>
            <div className="px-4 py-5 sm:p-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr className="divide-x divide-gray-200">
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    i
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    x
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                    erro
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {pontoFixo.r.map((e, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.x}</td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">{e.erro}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-4 sm:px-6" suppressHydrationWarning>
              Tempo: {pontoFixo.ms.toFixed(3)} ms
            </div>
          </div>

          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow h-min">
            <div className="px-4 py-5 sm:px-6">
              Newton
            </div>
            <div className="px-4 py-5 sm:p-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr className="divide-x divide-gray-200">
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    i
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    x
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                    erro
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {newton.r.map((e, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.x}</td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">{e.erro}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-4 sm:px-6" suppressHydrationWarning>
              Tempo: {newton.ms.toFixed(3)} ms
            </div>
          </div>

          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow h-min">
            <div className="px-4 py-5 sm:px-6">
              Secante
            </div>
            <div className="px-4 py-5 sm:p-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr className="divide-x divide-gray-200">
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    i
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    a
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    x
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    b
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                    f(x)
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {secante.r.map((e, index) => (
                  <tr key={index} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.a}</td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.x}</td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{e.b}</td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">{e.fx}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-4 sm:px-6" suppressHydrationWarning>
              Tempo: {secante.ms.toFixed(3)} ms
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
