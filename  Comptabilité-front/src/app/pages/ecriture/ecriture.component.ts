import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EcritureService } from './ecriture.service';
import { error } from 'util';
import { NbWindowService } from '@nebular/theme';
import { ModalEcritureComponent } from './modal-ecriture/modal-ecriture.component';
import { ShowEcritureComponent } from './show-ecriture/show-ecriture.component';
import { Router } from '@angular/router';
import { JournalService, Journal } from '../journal/journal.service';
import { EntrepriseService } from '../entreprise/entreprise.service';
import { Enterprise } from '../entreprise/entreprise';
import { ExcerciceService, Excercice } from '../excercice/excercice.service';
import { ViewCell } from 'ng2-smart-table';
import { UpdateEcritureComponent } from './update-ecriture/update-ecriture.component';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'ngx-button-view03',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" value="opération"/>\n' +
    '    </div>',
})
export class ButtonView04Component implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService,
    private router: Router, ) {

  }
  onClick() {

    localStorage.setItem('idEcriture', this.rowData.idEcriture);
    this.router.navigate(['/pages/operationEcriture']);

  }
}
@Component({
  selector: 'ngx-ecriture',
  templateUrl: './ecriture.component.html',
  styleUrls: ['./ecriture.component.scss']
})
export class EcritureComponent implements OnInit {
  source: any
  journal = new Journal();
  entreprise = new Enterprise();
  exercice = new Excercice();
  mois = "";
  b="";
  constructor(private ecritureService: EcritureService,
    private windowService: NbWindowService,
    private router: Router,
    private serviceJournal: JournalService,
    private entrepriseService: EntrepriseService,
    private exerciceService: ExcerciceService) { }

  ngOnInit() {
    let idJournalFils = localStorage.getItem('idJournalFils')
    console.log(+idJournalFils);

    this.serviceJournal.getJournalById(+idJournalFils).subscribe(
      data => { this.journal = data ;
                this.b=data.mois;

                this.ecritureService.countEciture(this.journal).subscribe(
                  response=>{ 
                    localStorage.removeItem('numero');
                    localStorage.setItem('numero',response) ,
                  console.log(response)  },
                      
                  error=>{console.log("error count ecriture"); }
                );
              }

    )


    this.ecritureService.getAllEcritureByJournal(+idJournalFils).subscribe(

      data => { this.source = data; console.log(data) },
      error => { console.log(error) }

    )

    let idEntreprise = localStorage.getItem('idEntreprise');

    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data => {
      this.entreprise = data;

        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

    let idExercice = localStorage.getItem('idExercice')

    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data => {
      this.exercice = data;
        this.exercice = this.exercice;
      },
      error => { console.log(error); }
    );
this.b=this.journal.mois
console.log("b:"+this.b)
    switch (this.b) {
      case "1": {
        this.mois = "Janvier"
        break;
      }
      case "2": {
        this.mois = "Février"
        break;
      }
      case "3": {
        this.mois = "Mars"
        break;
      }
      case "4": {
        this.mois = "Avril"
        break;
      } case "5": {
        this.mois = "Mai"
        break;
      }
      case "6": {
        this.mois = "juin"
        break;
      }
      case "7": {
        this.mois = "juillet "
        break;
      }
      case "8": {
        this.mois = "août"
        break;
      } case "9": {
        this.mois = "Séptember"
        break;
      }
      case "10": {
        this.mois = "October "
        break;
      }
      case "11": {
        this.mois = "November"
        break;
      }
      case "12": {
        this.mois = "Décember"
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }
 


  settings = {
    actions: {
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',

        },
        {
          name: 'deleteAction',
          title: '<i class="nb-trash" title="Delete"></i>',
        },
      ],
      add: false,
      edit: false,
      delete: false

    },


    columns: {
      numeroEcriture: {
        title: 'Numero Ecriture',
        type: 'number',
        sortDirection :	'asc',

      }, numeroPiece: {
        title: 'Numero Piece',
        type: 'number'
      },
      libelle: {
        title: 'Désignation',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'Date'
      },
      
       

    },
  };
  onClick() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/journalFils']));

  }
  onClick2(){this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  this.router.navigate(['/pages/journal']));}
  addEcritures() {

    localStorage.setItem("e", "0");

    this.router.navigate(['/pages/ajoutEcritures']);


  }

  onCustom(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem("e")
      localStorage.removeItem("idEcriture03")
      localStorage.setItem("e", "1");
      localStorage.setItem('idEcriture03', event.data.idEcriture);
      localStorage.setItem('date', event.data.date);
      localStorage.setItem('numeroPiece', event.data.numeroPiece);
      localStorage.setItem('libille', event.data.libelle);
      // this.windowService.open( ModalEcritureComponent, { title: 'Modifier   Ecriture', context: event.data.idEcriture });
       this.router.navigate(['/pages/ajoutEcritures']);
    }
    if (event.action === 'showAction') {
      localStorage.setItem('idEcriture', event.data.idEcriture.toString());
      this.windowService.open(ShowEcritureComponent, { title: 'Afficher  Ecriture', context: event.data.idEcriture });
    }
  }

}
