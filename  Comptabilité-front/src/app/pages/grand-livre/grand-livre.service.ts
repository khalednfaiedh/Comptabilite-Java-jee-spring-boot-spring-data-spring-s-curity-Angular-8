import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrandLivreService {
  url = PagesComponent.API_ENDPOINT + '/plans/2';
  constructor(private httpClient: HttpClient)  {}

    getAllPlanInEcriture(annee){
      return this.httpClient.get<any[]>(this.url+'/'+annee);
    }
  }

