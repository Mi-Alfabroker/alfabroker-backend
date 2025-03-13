import { Aseguradora } from '../models';
import { UserType } from '../models/user';
import { TipoPoliza } from '../models/poliza';

/**
 * Servicio para inicializar datos por defecto en la base de datos
 */
export default class InitService {
  /**
   * Inicializa aseguradoras por defecto si no existen
   */
  static async initAseguradoras(): Promise<void> {
    try {
      const count = await Aseguradora.count();
      
      // Si ya hay aseguradoras, no hacer nada
      if (count > 0) {
        console.log(`Ya existen ${count} aseguradoras en la base de datos.`);
        return;
      }
      
      // Crear aseguradoras por defecto
      const aseguradoras = [
        {
          nombre: 'Seguros Alfa',
          telefono: '6013123456',
          cobertura: [
            {
              nombre: 'Incendio y Aliadas',
              descripcion: 'Cubre daños por incendio y eventos naturales',
              valor: 100000000,
              deducible: '2% del valor asegurado',
              sublimite: 'Hasta el valor asegurado'
            },
            {
              nombre: 'Responsabilidad Civil Extracontractual',
              descripcion: 'Cubre daños a terceros',
              valor: 50000000,
              deducible: '5% del valor del siniestro',
              sublimite: 'Hasta el valor asegurado'
            }
          ],
          comisiones: [
            {
              p_comision: 15,
              tipo_poliza: TipoPoliza.VEHICULOS
            },
            {
              p_comision: 20,
              tipo_poliza: TipoPoliza.HOGAR
            },
            {
              p_comision: 25,
              tipo_poliza: TipoPoliza.COPROPIEDADES
            }
          ]
        },
        {
          nombre: 'Seguros Bolívar',
          telefono: '6014567890',
          cobertura: [
            {
              nombre: 'Pérdida Total',
              descripcion: 'Cubre pérdida total por daños o hurto',
              valor: 100000000,
              deducible: '10% del valor del siniestro',
              sublimite: 'Hasta el valor asegurado'
            },
            {
              nombre: 'Pérdida Parcial',
              descripcion: 'Cubre pérdida parcial por daños o hurto',
              valor: 50000000,
              deducible: '10% del valor del siniestro',
              sublimite: 'Hasta el valor asegurado'
            }
          ],
          comisiones: [
            {
              p_comision: 18,
              tipo_poliza: TipoPoliza.VEHICULOS
            },
            {
              p_comision: 22,
              tipo_poliza: TipoPoliza.VIDA
            }
          ]
        },
        {
          nombre: 'Mapfre Seguros',
          telefono: '6017890123',
          cobertura: [
            {
              nombre: 'Daños por Agua',
              descripcion: 'Cubre daños por agua en el hogar',
              valor: 80000000,
              deducible: '3% del valor del siniestro',
              sublimite: 'Hasta el valor asegurado'
            },
            {
              nombre: 'Robo',
              descripcion: 'Cubre robo de contenidos',
              valor: 60000000,
              deducible: '5% del valor del siniestro',
              sublimite: 'Hasta el valor asegurado'
            }
          ],
          comisiones: [
            {
              p_comision: 20,
              tipo_poliza: TipoPoliza.HOGAR
            },
            {
              p_comision: 15,
              tipo_poliza: TipoPoliza.SALUD
            }
          ]
        }
      ];
      
      // Crear las aseguradoras en la base de datos
      await Promise.all(aseguradoras.map(aseguradora => Aseguradora.create(aseguradora)));
      
      console.log(`Se han creado ${aseguradoras.length} aseguradoras por defecto.`);
    } catch (error) {
      console.error('Error al inicializar aseguradoras:', error);
    }
  }
  
  /**
   * Inicializa todos los datos por defecto
   */
  static async initAll(): Promise<void> {
    await this.initAseguradoras();
    // Aquí se pueden añadir más métodos de inicialización para otros modelos
  }
} 