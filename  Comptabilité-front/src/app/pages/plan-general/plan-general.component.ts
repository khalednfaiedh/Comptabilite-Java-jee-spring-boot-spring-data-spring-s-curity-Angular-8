import { Component, OnInit } from '@angular/core';
import { PlanGeneralService, Plan } from './plan-general.service';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ModalPlanGeneralComponent } from './modal-plan-general/modal-plan-general.component';
import { ExcerciceService } from '../excercice/excercice.service';
import { ShowPlanGeneralComponent } from './show-plan-general/show-plan-general.component';

@Component({
  selector: 'ngx-plan-general',
  templateUrl: './plan-general.component.html',
  styleUrls: ['./plan-general.component.scss']
})
export class PlanGeneralComponent implements OnInit {
planGeneral = new Plan();
source:any;
  constructor( private servicePlanGenerale:PlanGeneralService,
    private router: Router, 
    private windowService: NbWindowService,
    private exerciceService:ExcerciceService) { }

  ngOnInit() {
    
     
    this.planGeneral = new Plan();
    this.servicePlanGenerale.getAllPlanGeneral().subscribe(
      data => {this.source = data;
              },
      error => {console.log(error);}
      );


  }


  settings = {
    actions :{
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
        ],
          add: false,
          edit: false,
    },
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
          editButtonContent: '<i class="nb-edit"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true,
        },
        columns: {
         
          codeCompte:{
            title: 'Code',
            type: 'string',
          },
          nameCompte:{
            title: 'Intitulé',
            type: 'string'
          },
          // classe:{
          //   title: 'Classe',
          //   type: 'string',
          // },
        },
      };

      creerCompteG(){
        localStorage.setItem("e", "0");
        this.windowService.open( ModalPlanGeneralComponent , {title: 'Ajouter Compte général'});
      }
      onCustom(event): any {
        if (event.action === 'editAction') {
          console.log(event.data.gaccountId);
          localStorage.setItem("e", "1");
          localStorage.setItem('idPlanGeneral',event.data.id.toString());
          this.windowService.open(ModalPlanGeneralComponent , {title: 'Modifier Compte général', context: event.data.id});
        }
        if (event.action === 'showAction') {
          console.log(event.data.gaccountId);
          localStorage.setItem('idPlanGeneral',event.data.id.toString());
           this.windowService.open( ShowPlanGeneralComponent, {title: 'Afficher écriture', context: event.data.id});
        }
      }
      onDeleteConfirm(event):void {
        if (window.confirm(`Vous êtes sûre de vouloir supprimer cette  compte?`)) {
          
          event.confirm.resolve(this.servicePlanGenerale.deletePlanGeneral(event.data.id).subscribe(
            data => {this.source.filter(p => p !== event.data);},
            error => {console.log(error);})
          );
        } else {
          event.confirm.reject();
        }
      }

       

}
