import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { DonarComponent } from './donar/donar.component';
import { DonarencursoComponent } from './donarencurso/donarencurso.component';
import { DonarfinalizadasComponent } from './donarfinalizadas/donarfinalizadas.component';
import { BuscarComponent } from './buscar/buscar.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosfinalizadosComponent } from './pedidosfinalizados/pedidosfinalizados.component';
import { PedidosrecogidosComponent } from './pedidosrecogidos/pedidosrecogidos.component';
import { AyudaComponent } from './ayuda/ayuda.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'perfil/opiniones', component: OpinionesComponent },
  { path: 'donar', component: DonarComponent },
  { path: 'donar/en-curso', component: DonarencursoComponent },
  { path: 'donar/finalizadas', component: DonarfinalizadasComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'pedidos/finalizados', component: PedidosfinalizadosComponent },
  { path: 'pedidos/recogidos', component: PedidosrecogidosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
