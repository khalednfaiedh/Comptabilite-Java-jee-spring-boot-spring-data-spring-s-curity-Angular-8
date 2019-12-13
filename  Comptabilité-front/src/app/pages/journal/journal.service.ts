import { Injectable } from '@angular/core';
import { Plan } from '../plan-general/plan-general.service';
import { PagesComponent } from '../pages.component';
import { HttpClient } from '@angular/common/http';
import { Excercice } from '../excercice/excercice.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  url = PagesComponent.API_ENDPOINT + '/journals';
  url2 = PagesComponent.API_ENDPOINT + '/excercice';
  url3 = PagesComponent.API_ENDPOINT + '/journalsParents';


  constructor(private httpClient: HttpClient) { }

  addJournal(journal: Journal) {
    return this.httpClient.post<Journal>(this.url, journal);
  }
  getAllJournal(id:number){
    return this.httpClient.get<Journal[]>(this.url);
  }

  getAllJournalByExerciceAndJournalParent(id:number){
    return this.httpClient.get<Journal[]>(this.url2+'/'+id+'/journals');
  }

  getAllJournalByJournalParentAndMois(id:number,  mois:String){
    return this.httpClient.get<Journal[]>(this.url3+'/'+id+'/journals/'+mois);
  }
  getJournalById(id:number){
    return  this.httpClient.get<Journal>(this.url+'/'+id);
  }
  deleteJournal(id: number) {
    return this.httpClient.delete(this.url+'/'+id);
   }
  updateJournal ( journal: Journal){
     return this.httpClient.put<Journal>(this.url+'/'+journal.idJournal, journal);
   }
}

export class Journal{
   
    idJournal:number;
	  code: string;
    designation:string;
    mois:string
    type:string;
    journalParent:Journal;
    plan:Plan;
    exercice:Excercice;
     
   
}
