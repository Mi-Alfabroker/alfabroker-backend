import { DatosCopropiedad } from './copropiedad.interface';
import { DatosVehiculo } from './vehiculos.interface';
import { DatosHogar } from './hogar.interface';
import { DatosGeneral } from './general.interface';

export * from './copropiedad.interface';
export * from './beneficiario.interface';
export * from './vehiculos.interface';
export * from './hogar.interface';
export * from './general.interface';

// Por ahora solo tenemos copropiedad, pero aquí iremos agregando los demás
export type DatosPoliza = 
  | DatosCopropiedad
  | DatosVehiculo
  | DatosHogar
  | DatosGeneral
  | null
  | undefined; 