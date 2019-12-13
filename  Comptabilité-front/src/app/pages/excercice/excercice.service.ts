import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { HttpClient } from '@angular/common/http';
import { Enterprise } from '../entreprise/entreprise';

@Injectable({
  providedIn: 'root'
})
export class ExcerciceService {

  url = PagesComponent.API_ENDPOINT + '/excercices';

  constructor(private httpClient: HttpClient) { }

  addExcercice(excercice: Excercice) {
    return this.httpClient.post<Excercice>(this.url, excercice);
  }
  getAllExcercice(id:number){
    return this.httpClient.get<Excercice[]>(this.url+'/entreprise/'+id);
  }
  getExcerciceById(id:number){
    return  this.httpClient.get<Excercice>(this.url+'/'+id);
  }
  deleteExcercice(id: number) {
    return this.httpClient.delete(this.url+'/'+id);
   }
  updateExcercice ( excercice: Excercice){
     return this.httpClient.put<Excercice>(this.url+'/'+excercice.id, excercice);
   }
}
export class Excercice {
  id: number;
  dateDebut: Date;
  dateFin: Date;
  excerciceState: any;
  entreprise:Enterprise;
  designation:string;
  annee:string;
  editeur:string	;
    
}
