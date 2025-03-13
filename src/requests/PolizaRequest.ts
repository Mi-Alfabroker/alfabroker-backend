import { IsNotEmpty, IsEnum, IsNumber, IsDate, IsOptional, IsObject, ValidateNested, IsString, ValidateIf, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { TipoPoliza } from '../models/poliza';
import { 
  DatosPoliza, 
  Beneficiario, 
  DatosVehiculo, 
  DatosHogar, 
  DatosCopropiedad,
  DatosGeneral
} from '../types/polizas';
import { CoberturaAseguradora } from '../types/aseguradora';

// Clases para validar los datos específicos de cada tipo de póliza
export class BeneficiarioDto implements Beneficiario {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  identificacion: string;

  @IsString()
  @IsNotEmpty()
  parentesco: string;
}

export class CoberturaAseguradoraDto implements CoberturaAseguradora {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsOptional()
  deducible: string;

  @IsString()
  @IsOptional()
  sublimite: string;
}

export class DatosVehiculoDto implements DatosVehiculo {
  @IsString()
  @IsNotEmpty()
  placa: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsNumber()
  @IsNotEmpty()
  ano: number;

  @IsString()
  @IsNotEmpty()
  cod_fasecolda: string;

  @IsNumber()
  @IsNotEmpty()
  valor_accesorios: number;

  @IsNumber()
  @IsNotEmpty()
  valor_vehiculo: number;

  @IsNumber()
  @IsNotEmpty()
  cilindraje: number;

  @IsString()
  @IsNotEmpty()
  tipo_uso: string;

  @IsString()
  @IsNotEmpty()
  tipo_vehiculo: string;
}

export class DatosHogarDto implements DatosHogar {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  tipo_inmueble: string;

  @IsNumber()
  @IsNotEmpty()
  num_pisos: number;

  @IsNumber()
  @IsNotEmpty()
  ano_construccion: number;

  @IsNumber()
  @IsNotEmpty()
  valor_inmueble: number;

  @IsNumber()
  @IsNotEmpty()
  valor_contenidos_normales: number;

  @IsNumber()
  @IsNotEmpty()
  valor_equipos_electronicos: number;

  @IsNumber()
  @IsNotEmpty()
  valor_contenidos_especiales: number;
}

export class ConsejoMiembroDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;
}

export class DatosCopropiedadDto implements DatosCopropiedad {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  nombre_responsable: string;

  @IsString()
  @IsNotEmpty()
  telefono_responsable: string;

  @IsNumber()
  @IsNotEmpty()
  ano_construccion: number;

  @IsNumber()
  @IsNotEmpty()
  estrato: number;

  @IsNumber()
  @IsNotEmpty()
  num_torres: number;

  @IsNumber()
  @IsNotEmpty()
  num_pisos: number;

  @IsNumber()
  @IsNotEmpty()
  num_casas: number;

  @IsNumber()
  @IsNotEmpty()
  num_aptos: number;

  @IsNumber()
  @IsNotEmpty()
  num_sotanos: number;

  @IsNumber()
  @IsNotEmpty()
  valor_edificio_area_comun: number;

  @IsNumber()
  @IsNotEmpty()
  valor_muebles: number;

  @IsNumber()
  @IsNotEmpty()
  valor_edificio_area_privada: number;

  @IsNumber()
  @IsNotEmpty()
  valor_dinero: number;

  @IsNumber()
  @IsNotEmpty()
  valor_maquinaria: number;

  @IsNumber()
  @IsNotEmpty()
  valor_rce: number;

  @IsNumber()
  @IsNotEmpty()
  valor_eee: number;

  @IsNumber()
  @IsNotEmpty()
  valor_da: number;

  @IsNumber()
  @IsNotEmpty()
  tvalores_anual: number;

  @IsNumber()
  @IsNotEmpty()
  tvalores_despacho: number;

  @IsNumber()
  @IsNotEmpty()
  valor_manejo: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsejoMiembroDto)
  consejo: ConsejoMiembroDto[];

  @IsString()
  @IsNotEmpty()
  tipo_copropiedad: string;

  @IsNumber()
  @IsNotEmpty()
  num_locales: number;
}

export class CoberturaGeneralDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsNotEmpty()
  deducible: string;
}

export class DatosGeneralDto implements DatosGeneral {
  @IsString()
  @IsNotEmpty()
  subtipo: string;

  @IsString()
  @IsNotEmpty()
  bien_asegurable: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CoberturaGeneralDto)
  cobertura: CoberturaGeneralDto[];
}

export class PolizaRequest {
  @IsOptional()
  @IsNumber()
  id_user?: number;

  @IsNotEmpty()
  @IsEnum(TipoPoliza)
  tipo_poliza: TipoPoliza;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fecha_inicio: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fecha_fin: Date;

  @IsNotEmpty()
  @IsNumber()
  id_aseguradora: number;

  @IsNotEmpty()
  @IsNumber()
  prima_neta: number;

  @IsOptional()
  @IsNumber()
  iva?: number;

  @IsOptional()
  @IsNumber()
  gastos_expedicion?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => BeneficiarioDto)
  beneficiario?: BeneficiarioDto;

  @IsOptional()
  @ValidateIf((o) => o.tipo_poliza === TipoPoliza.VEHICULOS)
  @ValidateNested()
  @Type(() => DatosVehiculoDto)
  data_vehiculo?: DatosVehiculoDto;

  @IsOptional()
  @ValidateIf((o) => o.tipo_poliza === TipoPoliza.HOGAR)
  @ValidateNested()
  @Type(() => DatosHogarDto)
  data_hogar?: DatosHogarDto;

  @IsOptional()
  @ValidateIf((o) => o.tipo_poliza === TipoPoliza.COPROPIEDADES)
  @ValidateNested()
  @Type(() => DatosCopropiedadDto)
  data_copropiedad?: DatosCopropiedadDto;

  @IsOptional()
  @ValidateIf((o) => ![TipoPoliza.VEHICULOS, TipoPoliza.HOGAR, TipoPoliza.COPROPIEDADES].includes(o.tipo_poliza))
  @ValidateNested()
  @Type(() => DatosGeneralDto)
  data_general?: DatosGeneralDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CoberturaAseguradoraDto)
  coberturas?: CoberturaAseguradoraDto[];
}

export class UpdatePolizaRequest {
  @IsOptional()
  @IsEnum(TipoPoliza)
  tipo_poliza?: TipoPoliza;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha_inicio?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha_fin?: Date;

  @IsOptional()
  @IsNumber()
  id_aseguradora?: number;

  @IsOptional()
  @IsNumber()
  prima_neta?: number;

  @IsOptional()
  @IsNumber()
  iva?: number;

  @IsOptional()
  @IsNumber()
  gastos_expedicion?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => BeneficiarioDto)
  beneficiario?: BeneficiarioDto;

  @IsOptional()
  @ValidateIf((o) => o.tipo_poliza === TipoPoliza.VEHICULOS)
  @ValidateNested()
  @Type(() => DatosVehiculoDto)
  data_vehiculo?: DatosVehiculoDto;

  @IsOptional()
  @ValidateIf((o) => o.tipo_poliza === TipoPoliza.HOGAR)
  @ValidateNested()
  @Type(() => DatosHogarDto)
  data_hogar?: DatosHogarDto;

  @IsOptional()
  @ValidateIf((o) => o.tipo_poliza === TipoPoliza.COPROPIEDADES)
  @ValidateNested()
  @Type(() => DatosCopropiedadDto)
  data_copropiedad?: DatosCopropiedadDto;

  @IsOptional()
  @ValidateIf((o) => ![TipoPoliza.VEHICULOS, TipoPoliza.HOGAR, TipoPoliza.COPROPIEDADES].includes(o.tipo_poliza))
  @ValidateNested()
  @Type(() => DatosGeneralDto)
  data_general?: DatosGeneralDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CoberturaAseguradoraDto)
  coberturas?: CoberturaAseguradoraDto[];
} 