import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoletasService } from 'src/app/core/service/boletas.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.sass']
})
export class BoletaComponent 
extends UnsubscribeOnDestroyAdapter
implements OnInit{
  authForm: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  meses=[];
  gestiones=[];
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private boletasService: BoletasService
  ) {
    super();
  }
  ngOnInit(): void {
    this.obtenerMeses();
    this.obtenerGestiones();
    //throw new Error('Method not implemented.');
  }

  obtenerMeses(){ 
      this.submitted = true;
      this.loading = true;
      this.error = "";
      // if (this.authForm.invalid) {
      //   this.error = "El nombre de usuario y el password no son validos!";
      //   return;
      // } else {
        this.subs.sink = this.boletasService
          .meses()
          .subscribe(
            (res) => {
              if (res) {
                this.meses=res;
                console.log('res', this.meses[0]);
              } else {
                this.error = "Datos invalidos";
              }
              this.submitted = false;
              this.loading = false;
            },
            (error) => {
              this.error = error;
              this.submitted = false;
              this.loading = false;
            }
          );
     // }
    
  }
  obtenerGestiones(){ 
    this.submitted = true;
    this.loading = true;
    this.error = "";
    // if (this.authForm.invalid) {
    //   this.error = "El nombre de usuario y el password no son validos!";
    //   return;
    // } else {
      this.subs.sink = this.boletasService
        .gestiones()
        .subscribe(
          (res) => {
            if (res) {
              this.gestiones=res;
              console.log('res', this.gestiones[0]);
            } else {
              this.error = "Datos invalidos";
            }
            this.submitted = false;
            this.loading = false;
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );
   // }
  
}

}
