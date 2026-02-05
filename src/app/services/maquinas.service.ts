// src/app/services/maquinas.service.ts
import { Injectable, signal } from '@angular/core';

export type TipoMantenimiento = 'por_horas' | 'semanal' | 'mensual' | 'anual';
export type AreaProduccion = 'extrusion' | 'confeccion_acabado' | 'taller_moldes';

export interface MantenimientoConfig {
  tipo: TipoMantenimiento;
  activo: boolean;
  // Para mantenimiento por horas
  horasIntervalo?: number;  // Cada X horas
  ultimasHorasMantenimiento?: number;  // Última vez que se hizo
  // Para mantenimiento semanal
  diaSemana?: number;  // 0=Domingo, 1=Lunes... 6=Sábado
  // Para mantenimiento mensual/anual
  diaMes?: number;  // Día del mes (1-31)
  mes?: number;  // Solo para anual (1-12)
  // Checklist asociado (crearemos en siguiente paso)
  checklistId?: string;
}

export interface Maquina {
  id: string;
  codigo: string;
  nombre: string;
  tipo: 'torno' | 'fresadora' | 'prensa' | 'soldadora' | 'otro';
  marca: string;
  modelo: string;
  estado: 'operativa' | 'mantenimiento' | 'averiada' | 'inactiva';
  area: AreaProduccion;  // ← CAMBIO: ahora es enum, no texto libre
  ubicacionDetalle: string;  // Ej: "Sector 1"
  fechaInstalacion: string;
  horasFuncionamiento: number;
  estimacionHorasMes: number;  // ← NUEVO: para planificación
  mantenimientos: MantenimientoConfig[];  // ← NUEVO: tipos asignados
  documentacionTecnica?: string[];  // URLs a docs (opcional)
}

@Injectable({ providedIn: 'root' })
export class MaquinasService {
  private maquinasSignal = signal<Maquina[]>([
    {
      id: '1',
      codigo: 'TOR-001',
      nombre: 'Torno CNC T-200',
      tipo: 'torno',
      marca: 'Haas',
      modelo: 'ST-20',
      estado: 'operativa',
      area: 'extrusion',
      ubicacionDetalle: 'Sector 1',
      fechaInstalacion: '2022-03-15',
      horasFuncionamiento: 12450,
      estimacionHorasMes: 320,
      mantenimientos: [
        {
          tipo: 'por_horas',
          activo: true,
          horasIntervalo: 500,
          ultimasHorasMantenimiento: 12000
        },
        {
          tipo: 'semanal',
          activo: true,
          diaSemana: 1  // Lunes
        }
      ]
    },
    {
      id: '2',
      codigo: 'FRE-001',
      nombre: 'Fresadora F-350',
      tipo: 'fresadora',
      marca: 'DMG Mori',
      modelo: 'NVX 5100',
      estado: 'operativa',
      area: 'extrusion',
      ubicacionDetalle: 'Sector 2',
      fechaInstalacion: '2021-11-20',
      horasFuncionamiento: 18200,
      estimacionHorasMes: 280,
      mantenimientos: [
        {
          tipo: 'mensual',
          activo: true,
          diaMes: 15
        },
        {
          tipo: 'anual',
          activo: true,
          diaMes: 1,
          mes: 6  // Junio
        }
      ]
    },
    {
      id: '3',
      codigo: 'PRE-001',
      nombre: 'Prensa Hidráulica P-500',
      tipo: 'prensa',
      marca: 'Schuler',
      modelo: 'PHS-500',
      estado: 'mantenimiento',
      area: 'confeccion_acabado',
      ubicacionDetalle: 'Sector 1',
      fechaInstalacion: '2020-06-10',
      horasFuncionamiento: 24800,
      estimacionHorasMes: 400,
      mantenimientos: [
        {
          tipo: 'semanal',
          activo: true,
          diaSemana: 5  // Viernes
        }
      ]
    },
    {
      id: '4',
      codigo: 'TOR-002',
      nombre: 'Torno Manual TM-150',
      tipo: 'torno',
      marca: 'Pinacho',
      modelo: 'SP-150',
      estado: 'operativa',
      area: 'extrusion',
      ubicacionDetalle: 'Sector 1',
      fechaInstalacion: '2019-01-15',
      horasFuncionamiento: 35600,
      estimacionHorasMes: 250,
      mantenimientos: [
        {
          tipo: 'por_horas',
          activo: true,
          horasIntervalo: 1000,
          ultimasHorasMantenimiento: 35000
        }
      ]
    },
    {
      id: '5',
      codigo: 'SOL-001',
      nombre: 'Soldadora Robotizada SR-300',
      tipo: 'soldadora',
      marca: 'KUKA',
      modelo: 'KR-300',
      estado: 'averiada',
      area: 'taller_moldes',
      ubicacionDetalle: 'Sector 1',
      fechaInstalacion: '2023-08-05',
      horasFuncionamiento: 3200,
      estimacionHorasMes: 180,
      mantenimientos: []
    },
    {
      id: '6',
      codigo: 'FRE-002',
      nombre: 'Fresadora Vertical FV-250',
      tipo: 'fresadora',
      marca: 'Mazak',
      modelo: 'VTC-250',
      estado: 'operativa',
      area: 'extrusion',
      ubicacionDetalle: 'Sector 3',
      fechaInstalacion: '2021-05-12',
      horasFuncionamiento: 16900,
      estimacionHorasMes: 300,
      mantenimientos: [
        {
          tipo: 'semanal',
          activo: true,
          diaSemana: 3  // Miércoles
        },
        {
          tipo: 'anual',
          activo: true,
          diaMes: 15,
          mes: 12  // Diciembre
        }
      ]
    }
  ]);

  maquinas = this.maquinasSignal.asReadonly();

  getAll(): Maquina[] {
    return this.maquinasSignal();
  }

  getById(id: string): Maquina | undefined {
    return this.maquinasSignal().find(m => m.id === id);
  }

  create(maquina: Omit<Maquina, 'id'>): Maquina {
    const newMaquina: Maquina = {
      ...maquina,
      id: Date.now().toString()
    };
    this.maquinasSignal.update(list => [...list, newMaquina]);
    return newMaquina;
  }

  update(id: string, data: Partial<Maquina>): Maquina | null {
    const index = this.maquinasSignal().findIndex(m => m.id === id);
    if (index === -1) return null;

    this.maquinasSignal.update(list => {
      const updated = [...list];
      updated[index] = { ...updated[index], ...data };
      return updated;
    });

    return this.maquinasSignal()[index];
  }

  delete(id: string): boolean {
    const initialLength = this.maquinasSignal().length;
    this.maquinasSignal.update(list => list.filter(m => m.id !== id));
    return this.maquinasSignal().length < initialLength;
  }

  // Helpers para labels
  getAreaLabel(area: AreaProduccion): string {
    const labels: Record<AreaProduccion, string> = {
      extrusion: 'Extrusión',
      confeccion_acabado: 'Confección y Acabado',
      taller_moldes: 'Taller de Moldes'
    };
    return labels[area];
  }

  getTipoMantenimientoLabel(tipo: TipoMantenimiento): string {
    const labels: Record<TipoMantenimiento, string> = {
      por_horas: 'Por Horas',
      semanal: 'Semanal',
      mensual: 'Mensual',
      anual: 'Anual'
    };
    return labels[tipo];
  }
}
