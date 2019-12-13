import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { JournalService } from './journal.service';
import { ModalJournalComponent } from './modal-journal/modal-journal.component';
import { ShowJournalComponent } from './show-journal/show-journal.component';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-button-view02',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" value="JOURNAUX FILS"/>\n' +
    '    </div>',
  })
export class ButtonView02Component implements ViewCell, OnInit {
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
    
    localStorage.setItem('idJournalParent',this.rowData.idJournal);
    this.router.navigate(['/pages/journalFils']);
  
  }
  }
@Component({
  selector: 'ngx-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
source:any
test:true;
  constructor(private windowService: NbWindowService,
              private journalService:JournalService) { }

  ngOnInit() {
    
    let idExercice= localStorage.getItem('idExercice')
    this.journalService.getAllJournalByExerciceAndJournalParent(+idExercice).subscribe(
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
          {
            name: 'deleteAction',
            title: '<i class="nb-trash" title="Delete"></i>',
          }, 
        ],
          add: false,
          edit: false,
          delete:false
          
    },
        // add: {
        //   addButtonContent: '<i class="nb-plus"></i>',
        //   createButtonContent: '<i class="nb-checkmark"></i>',
        //   cancelButtonContent: '<i class="nb-close"></i>',
        // },
        // edit: {
        //   editButtonContent: '<i class="nb-edit"></i>',
        //   saveButtonContent: '<i class="nb-checkmark"></i>',
        //   cancelButtonContent: '<i class="nb-close"></i>',
        // },
        
        columns: {
          code:{
            title: 'Code',


            type: 'string'
          },
          designation:{
            title: 'Désignation',
            type: 'string',
          },
          type:{
            title: 'Type',
            type: 'string'
          },
          exercice:{
            title: 'Année',
            type: 'string',
            valuePrepareFunction: (exercice) => { 
              var raw = exercice.annee;
              return raw;
            },
            filterFunction(cell: any, search: string): boolean {
              if (cell!=null)
                return (cell.socialReason.includes(search))
              else return(true)
            }
          },
          
           fils: {
            title: 'Fils',
            type: 'custom',
            renderComponent: ButtonView02Component
           }, 
         
       
        },
      };

         addJournal() {
          localStorage.setItem("e","0");
          this.windowService.open(ModalJournalComponent, { title: `Créer un  journal` });  
        }

         
        onCustom(event): any {
          if (event.action === 'editAction') {
            localStorage.removeItem("e")
            localStorage.removeItem("idJournal")
            localStorage.setItem("e", "1");
            localStorage.setItem('idJournal',event.data.idJournal.toString());
            this.windowService.open(ModalJournalComponent, {title: 'Modifier  JOurnal', context: event.data.idJournal});
          }
          if (event.action === 'showAction') {
            localStorage.setItem('idJournal',event.data.idJournal.toString());
            this.windowService.open(  ShowJournalComponent, {title: 'Afficher  Journal', context: event.data.id});
          }
        }

}
