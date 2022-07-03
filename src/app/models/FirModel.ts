import { DecisaoModell } from "./DecisaoModell";
import { DefesaModell } from "./DefesaModell";
import { GuardaModell } from "./GuarrdaModel";
import { UserModell } from "./UserModel";

export class FirModell {
  id?: number;
  origem!: string;
  data!: Date|null;
  sintese!: string;
  defesa!: DefesaModell;
  decisao!: DecisaoModell;
  guarda!: GuardaModell;
}
