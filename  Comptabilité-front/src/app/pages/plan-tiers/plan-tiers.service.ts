import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { HttpClient } from '@angular/common/http';
import { Plan, PlanExport } from '../plan-general/plan-general.service';

@Injectable({
  providedIn: 'root'
})
export class PlanTiersService {
  url = PagesComponent.API_ENDPOINT + '/planTiers';
  url2 = PagesComponent.API_ENDPOINT + '/planTiers/export';
  constructor(private httpClient: HttpClient) { }

  addPlanTiers(plan: Plan) {
    return this.httpClient.post<Plan>(this.url, plan);
  }
   
  getAllPlanTiersPlanExport(){
    return this.httpClient.get<any>(this.url2);
  }

  getAllPlanTiers(){
    return this.httpClient.get<Plan[]>(this.url);
  }

  getPlanTiersById(id:number){
    return this.httpClient.get<Plan>(this.url+'/'+id);
  }

  deletePlanTiers (id: number) {
    return this.httpClient.delete(this.url+'/'+id);
   }
  updatePlanTiers( plan: Plan){
     return this.httpClient.put<Plan>(this.url+'/'+plan.id, plan);
   }
}
 
