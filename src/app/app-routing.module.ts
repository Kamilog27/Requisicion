import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisicionComponent } from './pages/requisicion/requisicion.component';
import { HomeComponent } from './pages/home/home.component';
import { ListarrequisicionComponent } from './pages/listarrequisicion/listarrequisicion.component';


const routes: Routes = [
  {path:'requisicion',component:RequisicionComponent},
  {path:'listarrequisiciones',component:ListarrequisicionComponent},
  {path:'editar/:id',component:RequisicionComponent},
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'listarrequisiciones',pathMatch:'full'},
  {path:'**',pathMatch:"full",redirectTo:'home/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
