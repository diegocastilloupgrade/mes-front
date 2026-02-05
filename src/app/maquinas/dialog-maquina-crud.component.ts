import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Maquina, TipoMantenimiento, AreaProduccion, MantenimientoConfig } from '../services/maquinas.service';

export interface DialogData {
  mode: 'create' | 'edit' | 'delete';
  maquina?: Maquina;
}

@Component({
  selector: 'app-dialog-maquina-crud',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatDatepickerModule, 
    MatNativeDateModule, MatCheckboxModule, MatExpansionModule, 
    MatIconModule, MatCardModule
  ],
  templateUrl: './dialog-maquina-crud.component.html',
  styleUrls: ['./dialog-maquina-crud.component.scss']
})
export class DialogMaquinaCrudComponent {
  private dialogRef = inject(MatDialogRef<DialogMaquinaCrudComponent>);
  private fb = inject(FormBuilder);
  data: DialogData = inject(MAT_DIALOG_DATA);

  form = this.fb.nonNullable.group({
    codigo: ['', Validators.required],
    nombre: ['', Validators.required],
    tipo: ['torno' as Maquina['tipo'], Validators.required],
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    estado: ['operativa' as Maquina['estado'], Validators.required],
    area: ['extrusion' as AreaProduccion, Validators.required],
    ubicacionDetalle: ['', Validators.required],
    fechaInstalacion: ['', Validators.required],
    horasFuncionamiento: [0, [Validators.required, Validators.min(0)]],
    estimacionHorasMes: [0, [Validators.required, Validators.min(0)]],
    mantenimientos: this.fb.array<FormGroup>([])
  });

  get mantenimientos() {
    return this.form.get('mantenimientos') as FormArray;
  }

  constructor() {
    if (this.data.mode === 'edit' && this.data.maquina) {
      this.form.patchValue({
        codigo: this.data.maquina.codigo,
        nombre: this.data.maquina.nombre,
        tipo: this.data.maquina.tipo,
        marca: this.data.maquina.marca,
        modelo: this.data.maquina.modelo,
        estado: this.data.maquina.estado,
        area: this.data.maquina.area,
        ubicacionDetalle: this.data.maquina.ubicacionDetalle,
        fechaInstalacion: this.data.maquina.fechaInstalacion,
        horasFuncionamiento: this.data.maquina.horasFuncionamiento,
        estimacionHorasMes: this.data.maquina.estimacionHorasMes
      });

      // Cargar mantenimientos existentes
      this.data.maquina.mantenimientos.forEach(mant => {
        this.mantenimientos.push(this.createMantenimientoGroup(mant));
      });
    }
  }

  createMantenimientoGroup(data?: MantenimientoConfig): FormGroup {
    return this.fb.nonNullable.group({
      tipo: [data?.tipo || 'semanal' as TipoMantenimiento, Validators.required],
      activo: [data?.activo ?? true],
      horasIntervalo: [data?.horasIntervalo || null],
      ultimasHorasMantenimiento: [data?.ultimasHorasMantenimiento || null],
      diaSemana: [data?.diaSemana || null],
      diaMes: [data?.diaMes || null],
      mes: [data?.mes || null],
      checklistId: [data?.checklistId || null]
    });
  }

  addMantenimiento() {
    this.mantenimientos.push(this.createMantenimientoGroup());
  }

  removeMantenimiento(index: number) {
    this.mantenimientos.removeAt(index);
  }

  onTipoChange(index: number) {
    const grupo = this.mantenimientos.at(index);
    const tipo = grupo.get('tipo')?.value;

    // Reset campos opcionales
    grupo.patchValue({
      horasIntervalo: null,
      ultimasHorasMantenimiento: null,
      diaSemana: null,
      diaMes: null,
      mes: null
    });

    // Configurar valores por defecto según tipo
    switch (tipo) {
      case 'por_horas':
        grupo.patchValue({
          horasIntervalo: 500,
          ultimasHorasMantenimiento: 0
        });
        break;
      case 'semanal':
        grupo.patchValue({ diaSemana: 1 }); // Lunes
        break;
      case 'mensual':
        grupo.patchValue({ diaMes: 1 });
        break;
      case 'anual':
        grupo.patchValue({ diaMes: 1, mes: 1 }); // 1 de Enero
        break;
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      
      // Limpiar mantenimientos (quitar campos null según tipo)
      const mantenimientosLimpios = formValue.mantenimientos.map((m: any) => {
        const limpio: any = {
          tipo: m.tipo,
          activo: m.activo
        };

        if (m.tipo === 'por_horas') {
          limpio.horasIntervalo = m.horasIntervalo;
          limpio.ultimasHorasMantenimiento = m.ultimasHorasMantenimiento;
        } else if (m.tipo === 'semanal') {
          limpio.diaSemana = m.diaSemana;
        } else if (m.tipo === 'mensual') {
          limpio.diaMes = m.diaMes;
        } else if (m.tipo === 'anual') {
          limpio.diaMes = m.diaMes;
          limpio.mes = m.mes;
        }

        if (m.checklistId) {
          limpio.checklistId = m.checklistId;
        }

        return limpio;
      });

      this.dialogRef.close({
        ...formValue,
        mantenimientos: mantenimientosLimpios
      });
    }
  }

  confirmDelete() {
    this.dialogRef.close(true);
  }
}
