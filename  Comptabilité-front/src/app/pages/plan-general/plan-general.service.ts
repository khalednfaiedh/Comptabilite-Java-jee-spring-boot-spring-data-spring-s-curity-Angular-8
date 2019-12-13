import { Injectable } from '@angular/core';
import { PagesComponent } from '../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanGeneralService {
  url = PagesComponent.API_ENDPOINT +'/planGenerals';
  url3 = PagesComponent.API_ENDPOINT +'/planGenerals/export';
  url2 = PagesComponent.API_ENDPOINT + '/plans';
  constructor(private httpClient: HttpClient) { }
  addPlanGeneral(plan:Plan) {
    return this.httpClient.post<Plan>(this.url,  plan);
  }
  getAllPlanGeneralAndTiers()
  {
    return this.httpClient.get<Plan[]>(this.url2);
  } 
 
  getAllPlanGeneralPlanExport(){
    return this.httpClient.get<any>(this.url3);
  }
   getAllPlanGeneral(){
    return this.httpClient.get<Plan[]>(this.url);
  }

  getPlanGeneralById(id:number){
    return this.httpClient.get<Plan>(this.url+'/'+id);
  }

  deletePlanGeneral (id: number) {
    return this.httpClient.delete(this.url+'/'+id);
   }
  updatePlanGeneral( plan: Plan){
     return this.httpClient.put<Plan>(this.url+'/'+plan.id, plan);
   }
}

export class Plan{
	  id: number;
    nameCompte : string;
    codeCompte : string;
    nameCode:string
	  
}

export class PlanTier{
  id: number;
  nameCompte : string;
  codeCompte : string;
  
}

export class PlanExport {
  codeCompte : string;
  nameCompte : string;


}
 
