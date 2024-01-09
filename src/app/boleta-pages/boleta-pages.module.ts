import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { ComponentsModule } from "../shared/components/components.module";
import { BoletaComponent } from "./boleta/boleta.component";
import { BoletaPagesRoutingModule } from "./boleta-pages-routing.module";
@NgModule({
  declarations: [BoletaComponent],
  imports: [
    CommonModule,
    BoletaPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    ComponentsModule,
  ],
})
export class BoletaPagesModule {}
