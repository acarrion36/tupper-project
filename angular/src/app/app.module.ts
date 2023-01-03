import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NavsmComponent } from './navsm/navsm.component';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { AsideComponent } from './aside/aside.component';
import { DonarComponent } from './donar/donar.component';
import { DonarencursoComponent } from './donarencurso/donarencurso.component';
import { BuscarComponent } from './buscar/buscar.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { DonarfinalizadasComponent } from './donarfinalizadas/donarfinalizadas.component';
import { PedidosfinalizadosComponent } from './pedidosfinalizados/pedidosfinalizados.component';
import { PedidosrecogidosComponent } from './pedidosrecogidos/pedidosrecogidos.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EditarEntregaComponent } from './editar-entrega/editar-entrega.component';
import { DonarFormularioComponent } from './donar-formulario/donar-formulario.component';
import { PintaalergenosComponent } from './pintaalergenos/pintaalergenos.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PerfilComponent,
    NavsmComponent,
    OpinionesComponent,
    AsideComponent,
    DonarComponent,
    BuscarComponent,
    PedidosComponent,
    AyudaComponent,
    DonarencursoComponent,
    DonarfinalizadasComponent,
    PedidosfinalizadosComponent,
    PedidosrecogidosComponent,
    LoginComponent,
    LogoutComponent,
    EditarEntregaComponent,
    DonarFormularioComponent,
    PintaalergenosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
