import { FirModell } from "./FirModel";
import { UserModell } from "./UserModel";

export class LancamentoModell{
  id?:number;
  tipoLancamento!:any;
  dataLancamento!: Date;
   fir!: FirModell;
   userResponsavel!: UserModell;
}
