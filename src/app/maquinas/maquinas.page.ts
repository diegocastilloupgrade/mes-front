import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaquinasService, Maquina, MantenimientoConfig } from '../services/maquinas.service';
import { DialogMaquinaCrudComponent } from './dialog-maquina-crud.component';

@Component({
  selector: 'app-maquinas',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDialogModule,
    MatChipsModule, MatTooltipModule
  ],
  templateUrl: './maquinas.page.html',
  styleUrls: ['./maquinas.page.scss']
})
export class MaquinasPage {
  maquinasService = inject(MaquinasService);  // ← PÚBLICO para template
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns = ['codigo', 'nombre', 'tipo', 'estado', 'area', 'mantenimientos', 'horas', 'acciones'];
  searchTerm = signal('');  // ← DEFINIDO como signal

  filteredMaquinas = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.maquinasService.maquinas();

    return this.maquinasService.maquinas().filter(m =>
      m.codigo.toLowerCase().includes(term) ||
      m.nombre.toLowerCase().includes(term) ||
      m.ubicacionDetalle.toLowerCase().includes(term) ||  // ← CORREGIDO
      m.tipo.toLowerCase().includes(term)
    );
  });

  getEstadoLabel(estado: string): string {
    const labels: Record<string, string> = {
      operativa: 'Operativa',
      mantenimiento: 'Mantenimiento',
      averiada: 'Averiada',
      inactiva: 'Inactiva'
    };
    return labels[estado] || estado;
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(DialogMaquinaCrudComponent, {
      width: '700px',
      maxHeight: '90vh',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.maquinasService.create(result);
        this.snackBar.open('✓ Máquina creada correctamente', 'OK', { duration: 3000 });
      }
    });
  }

  openEditDialog(maquina: Maquina) {
    const dialogRef = this.dialog.open(DialogMaquinaCrudComponent, {
      width: '700px',
      maxHeight: '90vh',
      data: { mode: 'edit', maquina: { ...maquina } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.maquinasService.update(maquina.id, result);
        this.snackBar.open('✓ Máquina actualizada correctamente', 'OK', { duration: 3000 });
      }
    });
  }

  openDeleteDialog(maquina: Maquina) {
    const dialogRef = this.dialog.open(DialogMaquinaCrudComponent, {
      width: '400px',
      data: { mode: 'delete', maquina }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.maquinasService.delete(maquina.id);
        this.snackBar.open('✓ Máquina eliminada correctamente', 'OK', { duration: 3000 });
      }
    });
  }
}
