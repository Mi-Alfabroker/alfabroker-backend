interface Cobertura {
  nombre: string;
  valor: number;
  deducible: string;
}

export interface DatosGeneral {
  subtipo: string;
  bien_asegurable: string;
  cobertura: Cobertura[];
}
