export interface ConsejoMiembro {
  nombre: string;
  telefono: string;
}

export interface DatosCopropiedad {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  nombre_responsable: string;
  telefono_responsable: string;
  ano_construccion: number;
  estrato: number;
  num_torres: number;
  num_pisos: number;
  num_casas: number;
  num_aptos: number;
  num_sotanos: number;
  valor_edificio_area_comun: number;
  valor_muebles: number;
  valor_edificio_area_privada: number;
  valor_dinero: number;
  valor_maquinaria: number;
  valor_rce: number;
  valor_eee: number;
  valor_da: number;
  tvalores_anual: number;
  tvalores_despacho: number;
  valor_manejo: number;
  consejo: ConsejoMiembro[];
  tipo_copropiedad: string;
  num_locales: number;
} 