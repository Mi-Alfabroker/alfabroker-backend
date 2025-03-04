interface Cobertura {
  nombre: string;
  valor: string;
  deducible: string;
}

export interface DatosGeneral {
  subtipo: string;
  bien_asegurable: string;
  cobertura: Cobertura[];
}
