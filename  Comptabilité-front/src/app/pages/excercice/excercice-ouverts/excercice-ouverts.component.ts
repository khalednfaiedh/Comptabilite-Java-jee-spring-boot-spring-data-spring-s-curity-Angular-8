import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ExcerciceService } from '../excercice.service';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Enterprise } from '../../entreprise/entreprise';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ShowExcerciceComponent } from '../show-excercice/show-excercice.component';
import { ModalExcerciceComponent } from '../modal-excercice/modal-excercice.component';
import { ViewCell } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-button-view01',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" value="Journaux"/>\n' +
    '    </div>',
  })
export class ButtonView01Component implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService,
              private router: Router,) {
                
  }
  onClick() {
    console.log(this.rowData.id);
    localStorage.setItem('idExercice',this.rowData.id);
    this.router.navigate(['/pages/journal']);
  
  }
  }
@Component({
  selector: 'ngx-excercice-ouverts',
  templateUrl: './excercice-ouverts.component.html',
  styleUrls: ['./excercice-ouverts.component.scss']
})
export class ExcerciceOuvertsComponent implements OnInit {
source:any;
entreprise = new Enterprise();

  constructor(private excerciceService:ExcerciceService,
              private entrepriseService:EntrepriseService,
              private router: Router,
              private windowService : NbWindowService,) { }

  ngOnInit() {

    let idEntreprise=localStorage.getItem('idEntreprise');

    this.excerciceService.getAllExcercice(+idEntreprise).subscribe(
      data=>{this.source = data;
      console.log(data);
      },
      error=>{console.log(error);
      }
    );

    
  }

  
  settings = {
    actions :{
      add: false,
      edit: false,
        position: 'right',
        custom: [
          {
            name: 'showAction',
            title: '<i class="nb-sunny" title="Consulter" i18n="@@consulter"></i>',
          },
          {
            name: 'closeAction',
            title: '<i class="nb-locked" title="Clôturer" i18n="@@cloturer"></i>',
            confirm:true
    
          },
          {
            name: 'activateAction',
            title: '<i class="nb-power" title="Activer" i18n="@@activer"></i>', 
          },
          
            {
              name: 'editAction',
              title: '<i class="nb-edit" title="Edit"></i>',
            },
          
           
        ],
          
    },
         
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
        columns: {
          dateDebut:{
            title: 'Date début',
            type: 'Date',
            // valuePrepareFunction: (date) => { 
            //   var raw = new Date(date);
            //   var formatted = new DatePipe('fr-FR').transform(raw, 'dd MMM yyyy');
            //   return formatted;
            // }
          },
          dateFin:{
            title: 'Date fin',
            type: 'Date',  
            // valuePrepareFunction: (date) => { 
            //   var raw = new Date(date);
            //   var formatted = new DatePipe('fr-FR').transform(raw, 'dd MMM yyyy');
            //   return formatted;
            // },
            // filterFunction(cell: any, search: string): boolean {
            //   if (cell!=null)
            //     return (cell.includes(search))
            //   else return(true)
            // }
          },
          excerciceState:{
            title: 'Statut',
            type: 'string',
            },
            designation:  {
              title:'Désignation',
              type:'string'

            },
          //   entreprise:{
          //   title: 'Entreprise',
          //   type: 'string',
          //   valuePrepareFunction: (enterprise) => { 
          //     var raw = enterprise.socialReason;
          //     return raw;
          //   },
          //   filterFunction(cell: any, search: string): boolean {
          //     if (cell!=null)
          //       return (cell.socialReason.includes(search))
          //     else return(true)
          //   }
          // },
          annee:{
            title:'Année',
            type:'string'
          },
           journaux: {
            title: 'Journaux',
            type: 'custom',
            renderComponent: ButtonView01Component
           }, 
        }
      };

      // onDeleteConfirm(event): void {
      //   if (window.confirm(`Vous etes sure de supprimer cette   Exercice?`)) {
      //     event.confirm.resolve(this.fyService.deleteExcerciceById(event.data.fyid).subscribe(
      //       data => {
      //         this.data.filter(p => p !== event.data);
      //       }),   
      //     );   
      //   } else {
      //     event.confirm.reject();
      //   }
      // }



      onCustom(event): any {
        // if (event.action === 'closeAction') {
        //   console.log(event.data.id);
        //   localStorage.setItem("d1", "1");
        //   var x = confirm("Un exercice clôturé n'est plus modifiable!!"+
        //   "\nToutes les écritures seront validées automatiquement!!!");
        //   if(x == true){
        //     console.log('you pressed ok');
        //     //valider toutes les écritures
        //   }else{
        //     console.log('you pressed cancel');
        //   }
        // }
        if (event.action === 'showAction') {
           
          localStorage.setItem("idExercice",event.data.id);
          this.windowService.open(ShowExcerciceComponent, {title: 'Afficher Exercice', context: event.data.id});

        }
        // if (event.action === 'activateAction') {
        //   console.log(event.data.fyid);
        //        this.fyService.activateFy(event.data, event.data.fyid).subscribe(
        //     data=>{this.entService.activateEnterprise(event.data.enterprise).subscribe(
        //       data=>{console.log(data); },
        //       error=>{console.log(error)}
        //     );
        //     console.log(data);
        //     // this.refreshPage();
        //     this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        //    this.router.navigate(["/pages/exercice"]));
        //     // this.showToastr();
        //     localStorage.setItem('exercice', event.data.sdate);
        //     localStorage.setItem('fyid', event.data.fyid);
        //     localStorage.setItem('entreprise', event.data.enterprise.socialReason);
        //     localStorage.setItem('entId', event.data.enterprise.enterpriseId.toString());
        //     localStorage.setItem('money', event.data.enterprise.money);
        //     },
        //   error=>{console.log(error);}
        //   );
        // }
        if(event.action === 'editAction')
        {
          localStorage.removeItem('e');
          localStorage.setItem('e', '1'); 
          localStorage.removeItem('e2');
          localStorage.setItem('e2','update')        
          localStorage.removeItem('idExercice');
          localStorage.setItem('idExercice',event.data.id);
          this.windowService.open(  ModalExcerciceComponent, { title: ' Modifier les informations de cette  exercice' });
          console.log('show');

        }

}
}
