import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DonarComponent } from './donar/donar.component';
import { DonarencursoComponent } from './donarencurso/donarencurso.component';
import { BuscarComponent } from './buscar/buscar.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { EditarEntregaComponent } from './editar-entrega/editar-entrega.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'donar', component: DonarComponent },
  { path: 'donar/en-curso', component: DonarencursoComponent },
  { path: 'donar/editar/:id_entrega', component: EditarEntregaComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
