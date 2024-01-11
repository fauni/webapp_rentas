import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BoletasService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  meses() {
    return this.http
      .get<any>(`${environment.apiUrl2}meses`)
      .pipe(
        map((meses) => {
          console.log('Json', JSON.stringify(meses))
          return meses;
        })
      );
  }

  gestiones() {
    return this.http
    .get<any>(`${environment.apiUrl2}meses/gestiones`)
    .pipe(
      map((gestiones) => {
        console.log('Json', JSON.stringify(gestiones))
        return gestiones;
      })
    );
  }
  detalleRenta(matricula: string,mes: string, gestion:string) {
    return this.http
    .get<any>(`${environment.apiUrl2}rentas/compuesto/${matricula}/${mes}/${gestion}`)
    .pipe(
      map((detallle) => {
        console.log('Json', JSON.stringify(detallle))
        return detallle;
      })
    );
  }
}
