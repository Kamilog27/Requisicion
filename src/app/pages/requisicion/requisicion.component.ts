
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Oficina } from 'src/app/shared/interfaces/office.interface';
import { TipoRequision } from 'src/app/shared/interfaces/tipoRequisicion.interface';
import { RequisicionService } from 'src/app/shared/requisicion.service';
import html2pdf from 'html2pdf.js';
import { Area } from 'src/app/shared/interfaces/area.interface';
import { Usuarios } from 'src/app/shared/interfaces/usuarios.interface';
import { switchMap } from 'rxjs/operators';
import { Productos } from 'src/app/shared/interfaces/productos.interface';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { detalleProducto } from 'src/app/shared/interfaces/detalleProducto.interface';

@Component({
  selector: 'app-requisicion',
  templateUrl: './requisicion.component.html',
  styleUrls: ['./requisicion.component.css']
})
export class RequisicionComponent implements OnInit {

  fechaRequisicion = this.pipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

  fecha_esperada_entrega = this.pipe.transform(new Date(), 'yyyy-MM-dd');
  

  oficina: Oficina[] = [];
  area: Area[] = [];
  usuarios: Usuarios[] = [];
  tipoRequisicion: TipoRequision[] = [];
  productos: Productos[] = [];
  texto: string = '';
  imprimir: boolean = false;

  formulario: FormGroup = this.fb.group({
    codigoRequisicion: 0,
    fechaRequisicion: [this.fechaRequisicion],
    codigoTipoRequisicion: [this.tipoRequisicion, Validators.required],
    codigoOficina: [this.oficina],
    codigoArea: [this.area, Validators.required],
    fechaEsperadaEntrega: [this.fecha_esperada_entrega],
    fechaCreacion: [this.fechaRequisicion],
    codigoRecibe: [this.usuarios],
    codigoUsuarioEncargado: [''],
    codigoUsuarioCrea: [1],
    fechaAsignacion: [this.fechaRequisicion],
    observaciones: [''],
    codigoEstado: [1],
    requisicionDetalle: this.fb.array([this.requisicionDetalleform()]),
  });
  constructor(
    private fb: FormBuilder,
    private pipe: DatePipe,
    private requisicionService: RequisicionService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    

    if (!this.router.url.includes('editar')) {
      this.texto = 'Solicitar';

    } else {
      this.texto = 'Modificar';
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.requisicionService.getRequisicion(id)),
        ).subscribe(requisicion => {
          if (!requisicion) {
            return this.router.navigateByUrl('/listarrequisiciones');
          }
           console.log(requisicion);
          this.imprimir = true;
          
          const arreglo:detalleProducto[]=requisicion.requisicionDetalle;


          if(arreglo&&arreglo.length==1){
          }
          else if(arreglo&&arreglo.length==2){
            this.agregar();
          }
          else if(arreglo&&arreglo.length==3){
            this.agregar();
            this.agregar();
          }
          else if(arreglo&&arreglo.length==4){
            this.agregar();
            this.agregar();
            this.agregar();
          }else if(arreglo&&arreglo.length==5){
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
          }
          else if(arreglo&&arreglo.length==6){
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
          }
          else if(arreglo&&arreglo.length==7){
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
          }
          else if(arreglo&&arreglo.length==8){
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
          }
          else if(arreglo&&arreglo.length==9){
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
          }
          else if(arreglo&&arreglo.length==10){
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
            this.agregar();
          }
          
          let fechaR=this.pipe.transform(requisicion.fechaRequisicion, 'yyyy-MM-dd hh:mm:ss');
        
          let fechaEE=this.pipe.transform(requisicion.fechaEsperadaEntrega, 'yyyy-MM-dd');
          
          // this.formulario.patchValue(requisicion);
          this.formulario.setValue({
            codigoRequisicion: requisicion.codigoRequisicion,
            fechaRequisicion: fechaR,
            codigoTipoRequisicion: requisicion.codigoTipoRequisicion,
            codigoOficina: requisicion.codigoOficina,
            codigoArea: requisicion.codigoArea,
            fechaEsperadaEntrega: fechaEE,
            codigoRecibe: requisicion.codigoRecibe,
            codigoUsuarioCrea: requisicion.codigoUsuarioCrea,
            fechaCreacion: requisicion.fechaCreacion,
            observaciones: requisicion.observaciones,
            codigoEstado: requisicion.codigoEstado,
            codigoUsuarioEncargado: requisicion.codigoUsuarioEncargado,
            fechaAsignacion: requisicion.fechaAsignacion,
            requisicionDetalle: requisicion.requisicionDetalle
          })
        });
      // console.log(this.requisicionDetalle.controls[0]['controls'].cantidad.value);
    } this.requisicionService.getListOffice().subscribe(oficinas => {
      this.oficina = oficinas;
    })
    this.requisicionService.getTipoRequisicion().subscribe(trequisicion => {

      this.tipoRequisicion = trequisicion;
    })
    this.requisicionService.getArea().subscribe(area => {
      this.area = area;
    })
    this.requisicionService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    })
    this.onProductosChanged();
    return;
  }

  onProductosChanged() {
    this.formulario.get('codigoTipoRequisicion')!.valueChanges
      .pipe(
        switchMap(tiporeq => this.requisicionService.getProductos(tiporeq))
      )
      .subscribe(productos => {
        this.productos = productos;

      })
  }


  requisicionDetalleform() {
    return this.fb.group({
      codigoDetalle: [0],
      codigoRequisicion: [0],
      nombre: [''],
      codigoProducto: ['', Validators.required],
      unidadMedida: [''],
      // existencias:[''],
      descripcion: [''],
      marca: [''],
      referencia: [''],
      cantidad: ['', [Validators.required, Validators.min(1)]],
    })
  }

  get requisicionDetalle() {
    return this.formulario.get('requisicionDetalle') as FormArray;
  }

  agregar() {
    this.requisicionDetalle.push(this.requisicionDetalleform());
  }
  eliminar(i: number) {
    this.requisicionDetalle.removeAt(i);
  }


  descargarComoPDF() {
    const element = document.getElementById('contenido-a-descargar');
    const options = {
      filename: 'requisicion.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {},
      jsPDF: { unit: 'cm', format: 'a2', orientation: 'portrait' }
    };

    html2pdf()
      .from(element)
      .set(options)
      .save()
      .outputPdf()
      .then(pdf => {

      })
      .catch(error => {
        console.error('Error al generar el PDF:', error);
      });

  }

  cambiarProducto(event: Event, i) {
    const valorSeleccionado = (event.target as HTMLSelectElement).value;

    if (valorSeleccionado == "0" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('LIBRAS');
      }

    } else if (valorSeleccionado == "1" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('LIBRAS');
      }
    } else if (valorSeleccionado == "2" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('LIBRAS');
      }

    } else if (valorSeleccionado == "3" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('LATAS');
      }

    } else if (valorSeleccionado == "4" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('BOTELLAS');
      }

    } else if (valorSeleccionado == "5" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('LIBRAS');
      }

    } else if (valorSeleccionado == "6" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('BOLSAS');
      }

    } else if (valorSeleccionado == "7" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('FRASCOS');
      }

    } else if (valorSeleccionado == "8" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('FRASCOS');
      }
    } else if (valorSeleccionado == "9" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('PAQUETES');
      }

    } else if (valorSeleccionado == "10" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('BOTELLAS');
      }

    } else if (valorSeleccionado == "11" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('LIBRAS');
      }
    } else if (valorSeleccionado == "12" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('RESMAS 100 HOJAS');
      }
    } else if (valorSeleccionado == "13" && this.requisicionDetalle) {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('#PASAJEROS');
      }

    } else {
      const detalle = this.requisicionDetalle.at(i);

      if (detalle && detalle.get('unidadMedida')) {
        detalle.get('unidadMedida').setValue('');
      }

    }
  }

  guardar() {
    console.log(this.formulario.value);
    const fechaReq=this.formulario.get('fechaRequisicion').value
    const fechaR= this.pipe.transform(fechaReq, 'yyyy-MM-ddTHH:mm:ss');

    const fechaEspEnt=this.formulario.get('fechaEsperadaEntrega').value
    const fechaE= this.pipe.transform(fechaEspEnt, 'yyyy-MM-ddTHH:mm:ss');

    const codUsuEnc=this.formulario.get('codigoRecibe').value;

    this.formulario.patchValue({
      fechaRequisicion:fechaR,
      fechaCreacion:fechaR,
      fechaAsignacion:fechaR,
      fechaEsperadaEntrega:fechaE,
      codigoUsuarioEncargado:codUsuEnc
    });
    console.log(this.formulario.value);
    if (!this.router.url.includes('editar')) {
      Swal.fire({
        title: "Guardar requisición",
        text: "¿Seguro que quieres guardar la requisición?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.requisicionService.postRequisicion(this.formulario.value).subscribe(res => {
            Swal.fire({
              title: "Requisición creada!",
              text: `La requisición ${res.codigoRequisicion} ha sido creada.`,
              icon: "success"
            });
            this.router.navigateByUrl('/listarrequisiciones');
          })
        }
      });
    } else {
      Swal.fire({
        title: "Modificar requisición",
        text: "¿Seguro que quieres modificar la requisición?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.requisicionService.updateRequisicion(this.formulario.value).subscribe(res => {
            Swal.fire({
              title: "Requisición Modificada!",
              text: `La requisición ${res.codigoRequisicion} ha sido modificada.`,
              icon: "success"
            });
            console.log(res);
            this.router.navigateByUrl('/listarrequisiciones');
          })
        }
      });
    }
  }
}


