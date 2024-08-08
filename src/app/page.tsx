import calculaMetodoBissecao from "@/utils/metodo-bissecao";
import calculaMetodoFalsaPosicao from "@/utils/metodo-falsa-posicao";
import calculaMetodoPontoFixo from "@/utils/metodo-ponto-fixo";
import calculaMetodoNewton from "@/utils/metodo-newton";
import calculaMetodoSecante from "@/utils/metodo-secante";
import dynamic from "next/dynamic";

const Page = dynamic(
  () => import('@/components/home').then(mod => mod.Home),
  {ssr: false}
);

export default Page