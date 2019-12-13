import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../entreprise/entreprise';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { ExcerciceService, Excercice } from '../excercice.service';

@Component({
  selector: 'ngx-show-excercice',
  templateUrl: './show-excercice.component.html',
  styleUrls: ['./show-excercice.component.scss']
})
export class ShowExcerciceComponent implements OnInit {

  entreprise = new Enterprise();
  exercice= new Excercice();
  societe:  string;
  constructor(private entrepriseService:EntrepriseService,
              private exerciceService:ExcerciceService ) { }

  ngOnInit() {

     

    let idEntreprise = localStorage.getItem('idEntreprise')
    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data=>{
        this.entreprise=data;
        this.societe=this.entreprise.socialReason;
      }
    )
    let idExercice = localStorage.getItem("idExercice");
    this.exerciceService.getExcerciceById(+idExercice) .subscribe(
      data=>{this.exercice = data;
      },
      error=>{console.log(error);
      }
    );
  }

}
