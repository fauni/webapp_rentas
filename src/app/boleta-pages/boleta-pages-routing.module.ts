import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BoletaComponent } from "./boleta/boleta.component";
const routes: Routes = [
  {
    path: "general",
    component: BoletaComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletaPagesRoutingModule {}
