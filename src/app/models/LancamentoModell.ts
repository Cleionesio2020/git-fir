import { FirModell } from "./FirModel";
import { tipoLancamento } from "./TipoLancamento";
import { UserModell } from "./UserModel";

export class LancamentoModell{
  id?:number;
  tipoLancamento!:tipoLancamento;
  dataLancamento! :Date;
  fir!: FirModell;
  userResponsavel?: UserModell;
}
