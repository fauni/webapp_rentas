import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  busquedaForm: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  meses=[];
  gestiones=[];
  detalle: any;
  fechaHoy: string;
  usuario: string;
  codusuario: string;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private boletasService: BoletasService
  ) {
    super();
  }
  ngOnInit(): void {
    this.busquedaForm = this.formBuilder.group({
      // username: ["admin@software.com", Validators.required],
      // password: ["admin@123", Validators.required],
      matricula: ["", Validators.required],
      mes: ["", Validators.required],
      gestion: ["", Validators.required],
    });
    this.obtenerMeses();
    this.obtenerGestiones();
    this.usuario=localStorage.getItem("currentUser");
    this.codusuario = JSON.parse(this.usuario).codope;
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
onBuscar(){

  this.submitted = true;
  this.loading = true;
  this.error = "";
  if (this.busquedaForm.invalid) {
    this.error = "El ingrese datso validos por favor !";
    console.log('this.error', this.error);
    console.log('matricula].value', this.busquedaForm.controls['matricula'].value)
    console.log('mes].value', this.busquedaForm.controls['mes'].value)
    console.log('gestion].value', this.busquedaForm.controls['gestion'].value)
    return;
  } else {
    this.subs.sink = this.boletasService
      .detalleRenta(this.busquedaForm.controls['matricula'].value,this.busquedaForm.controls['mes'].value,this.busquedaForm.controls['gestion'].value )
      .subscribe(
        (res) => {
          if (res) {
           // const token = this.authService.currentUserValue.pasope;
           console.log(res);
           this.detalle =res;
           const tiempoTranscurrido: Date = new Date();
           this.fechaHoy = tiempoTranscurrido.toLocaleString();
          //   if (token) {
          //     this.router.navigate(["/main/home"]);
            }
          // } else {
          //   this.error = "Datos invalidos";
          // }
        },
        (error) => {
          this.error = error;
          this.submitted = false;
          this.loading = false;
        }
      );
  }
}
}
