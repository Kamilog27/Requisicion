import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Requisiciones } from 'src/app/shared/interfaces/requisiciones.interfaces';
import { RequisicionService } from 'src/app/shared/requisicion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listarrequisicion',
  templateUrl: './listarrequisicion.component.html',
  styleUrls: ['./listarrequisicion.component.css']
})
export class ListarrequisicionComponent implements OnInit {

  listarRequisiciones: Requisiciones[] = [];
  page=0;
  constructor(private requisicionService: RequisicionService,
    private router: Router) { }

  ngOnInit(): void {
    this.requisicionService.getListRequisiciones().subscribe(listar => {
      this.listarRequisiciones = listar;
    })
  }
  del(requisicion) {
    if (requisicion.codigoEstado != 1) {
      Swal.fire({
        title: "NO PUEDE BORRAR ESTA REQUISICION",
        text: "No se encuentra en estado solicitado",
        icon: "info",
      })
    } else {
      Swal.fire({
        title: "¿Estas seguro de borrar?",
        text: "Si borras este cambio no se podra reversar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.requisicionService.deleteRequisicion(requisicion.codigoRequisicion).subscribe(resp => {
            this.ngOnInit();
            Swal.fire({
              title: "Borrado!",
              text: `La requisición ${requisicion.codigoRequisicion} ha sido borrada.`,
              icon: "success"
            });
          })

        }
      });
    }
  }
  
  edit(requisicion) {
    if (requisicion.codigoEstado != 1) {
      Swal.fire({
        title: "NO PUEDE MODIFICAR ESTA REQUISICION",
        text: "No se encuentra en estado solicitado",
        icon: "info",
      })
    }else{
      this.router.navigate(['/editar/', requisicion.codigoRequisicion]);

    }
  }

  prevPage(){
    
      this.page+=5;
    
  }
  nextPage(){
    if(this.page>0){
      this.page-=5;
    }   
  }
}
