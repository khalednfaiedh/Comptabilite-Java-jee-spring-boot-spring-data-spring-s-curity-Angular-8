import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../entreprise/entreprise.service';
import { Enterprise } from '../entreprise/entreprise';
import { ExcerciceService, Excercice } from '../excercice/excercice.service';
import { Router } from '@angular/router';
import { EcritureService } from '../ecriture/ecriture.service';
import { GrandLivreService } from './grand-livre.service';

@Component({
  selector: 'ngx-grand-livre',
  templateUrl: './grand-livre.component.html',
  styleUrls: ['./grand-livre.component.scss']
})
export class GrandLivreComponent implements OnInit {
  entreprise = new Enterprise();
  exercice= new Excercice();
  operations=[]
  plans=[];
  exercices=[]
  id:any
  constructor(private entrepriseService:EntrepriseService,
              private exerciceService:ExcerciceService,
              private router:Router,
              private ecritureService:EcritureService,
              private grnadLivreService:GrandLivreService) { }

  ngOnInit() {




     
    let idEntreprise=localStorage.getItem('idEntreprise');

    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data=>{this.entreprise = data;
         
      console.log(data);
      },
      error=>{console.log(error);
      }
    );
    this.exerciceService.getAllExcercice(+idEntreprise).subscribe(
      data=>{this.exercices=data},
      error=>{console.log("ereur excercices")}
      

    )

    let idExercice= localStorage.getItem('idExercice')

    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data => {this.exercice = data;
        this.grnadLivreService.getAllPlanInEcriture(this.exercice.annee).subscribe(
          data=>{this.plans=data;console.log(data)},
          error=>{console.log('ok plan')}
          
        );
              },
      error => {console.log(error);}
      );

    // this.ecritureService.getAllOperationEcritureByPlanGenerale(1852).subscribe(

    // data=>{this.operations=data;console.log(data)},
    // error=>{console.log('error get all operation bby  journal')}
    
    // );

     }

  onClick03(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/pages/exercice']));
  }

  getTotolDebit(j)
  {
    var somme=0;
    for(let i=0;i<this.plans[j].operationEcritures.length;i++)
    {
       somme+=this.plans[j].operationEcritures[i].debit;
    }
    return somme;
  }

  getTotolCredit(j)
  {
    var somme=0;
    for(let i=0;i<this.plans[j].operationEcritures.length;i++)
    {
       somme+=this.plans[j].operationEcritures[i].credit;
    }
    return somme;
  }

  getEtatCompte(j)
  {
   var x= this.getTotolDebit(j)- this.getTotolCredit(j);
   if(x==0)
   {
     return "";
   }
   else  if(x<0)
   {
     return " SOLDE DEBITEUR"
   }
   else if(x>0)
   {
    return "  SOLDE CREDITEUR"
   }
  }

  getCumule(j)
  {
    var x= this.getTotolCredit(j)-this.getTotolDebit(j) ;
  ;
    return   x.toFixed(3);
  }

  getGrandLivre(id)
  {
    this.exerciceService.getExcerciceById(+id).subscribe(
      data => {this.exercice = data;
         console.log(data)
         this.grnadLivreService.getAllPlanInEcriture(this.exercice.annee).subscribe(
          data=>{this.plans=data;console.log(data)},
          error=>{console.log('ok plan')}
          
        );
              },
      error => {console.log(error);}
      );


  }

}
