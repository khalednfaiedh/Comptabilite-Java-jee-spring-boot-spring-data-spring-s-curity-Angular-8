import { Injectable } from '@angular/core';
import { JournalService, Journal } from '../journal/journal.service';
import { PagesComponent } from '../pages.component';
import { HttpClient } from '@angular/common/http';
import { Plan } from '../plan-general/plan-general.service';
 

@Injectable({
  providedIn: 'root'
})
export class EcritureService {
  url = PagesComponent.API_ENDPOINT + '/ecritures';
  url2 = PagesComponent.API_ENDPOINT + '/journals';
  url3 = PagesComponent.API_ENDPOINT + '/operations';
  url4= PagesComponent.API_ENDPOINT + '/ecriture';
  url5= PagesComponent.API_ENDPOINT + '/count';
  url6= PagesComponent.API_ENDPOINT + '/planGeneral';
  url7= PagesComponent.API_ENDPOINT + '/planTier';
  constructor(private httpClient: HttpClient) { }

  addEcriture(ecriture: Ecriture) {
    return this.httpClient.post<Ecriture>(this.url, ecriture);
  }
  getAllEcritureByJournal(idJournal:number){
    return this.httpClient.get<Ecriture[]>(this.url2+'/'+idJournal+'/ecritures/');
  }
  getEcritureById(id:number){
    return  this.httpClient.get<Ecriture>(this.url+'/'+id);
  }
  deleteEcriture(id: number) {
    return this.httpClient.delete(this.url+'/'+id);
   }
  updateEcriture ( ecriture: Ecriture){
     return this.httpClient.put<Ecriture>(this.url+'/'+ecriture.idEcriture, ecriture);
   }

   saveAllecriture(formData)
   {
    return this.httpClient.post<Ecriture>(this.url3, formData);
   }

   getAlloperationEcritureByEciture(id)
   {
    return this.httpClient.get<OperationEcriture[]>(this.url4+'/'+id+'/operations/');
   }

   updateOperationEcritureAndEcriture(formData)
   {return this.httpClient.put< any>(this.url4+'/'+formData.idEcriture+'/operations', formData);}

   countEciture(journal)
   {
    
    return this.httpClient.get<any>(this.url5+'/'+journal.designation+'/'+journal.mois);
   }

   getAllOperationEcritureByPlanGenerale(id)
   {
    return this.httpClient.get<any>(this.url6+'/'+id+'/operations');
   }

   getAllOperationEcritureByPlanTier(id)
   {
    return this.httpClient.get<any>(this.url7+'/'+id+'/operations');
   }
}

export class Ecriture {
  
  idEcriture: number;

  numeroEcriture: number;

  numeroPiece: number;

  libelle: string;

  date: Date;

  journal: Journal;

}

export class OperationEcriture{


  debit: number;

  credit: number;

  journal: Journal;

  compteTiers:Plan

  compteGeneral:Plan

  
}