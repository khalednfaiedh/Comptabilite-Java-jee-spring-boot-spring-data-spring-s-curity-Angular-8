import { Component, OnInit } from '@angular/core';
import { Plan } from '../plan-general/plan-general.service';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { PlanTiersService } from './plan-tiers.service';
import { ModalPlanTiersComponent } from './modal-plan-tiers/modal-plan-tiers.component';
import { ShowPlanTiersComponent } from './show-plan-tiers/show-plan-tiers.component';

@Component({
  selector: 'ngx-plan-tiers',
  templateUrl: './plan-tiers.component.html',
  styleUrls: ['./plan-tiers.component.scss']
})
export class PlanTiersComponent implements OnInit {
planTiers = new Plan ();
  source:any;
  constructor( private servicePlanTiers: PlanTiersService,
    private router: Router, 
    private windowService: NbWindowService,) { }

  ngOnInit() {

    this.planTiers = new Plan();
    this.servicePlanTiers.getAllPlanTiers().subscribe(
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
          }, nameCompte:{
            title: 'Intitulé',
            type: 'string'
          },
         
          // classe:{
          //   title: 'Classe',
          //   type: 'string',
          // },
        },
      };

      addPlanTiers(){
        localStorage.setItem("e", "0");
        this.windowService.open(  ModalPlanTiersComponent , {title: 'Ajouter Compte  tier'});
      }
      onCustom(event): any {
        if (event.action === 'editAction') {
          
          localStorage.setItem("e", "1");
          localStorage.setItem('idPlaTier',event.data.id.toString());
          this.windowService.open(ModalPlanTiersComponent , {title: 'Modifier Compte tier', context: event.data.id});
        }
        if (event.action === 'showAction') {
          
          localStorage.setItem('idPlaTier',event.data.id.toString());
           this.windowService.open(ShowPlanTiersComponent, {title: 'Afficher  Compte tier', context: event.data.id});
        }
      }
      onDeleteConfirm(event):void {
        if (window.confirm(`Vous êtes sûre de vouloir supprimer cette  compte?`)) {
          
          event.confirm.resolve(this.servicePlanTiers.deletePlanTiers(event.data.id).subscribe(
            data => {this.source.filter(p => p !== event.data);},
            error => {console.log(error);})
          );
        } else {
          event.confirm.reject();
        }
      }

       

}
