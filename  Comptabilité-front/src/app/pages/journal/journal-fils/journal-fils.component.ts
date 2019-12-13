import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JournalService, Journal } from '../journal.service';
import { ModalJournalComponent } from '../modal-journal/modal-journal.component';
import { ShowJournalComponent } from '../show-journal/show-journal.component';
import { NbWindowService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';
@Component({
  selector: 'ngx-button-view03',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" value="ECRITURES"/>\n' +
    '    </div>',
  })
export class ButtonView03Component implements ViewCell, OnInit {
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
     
    localStorage.setItem('idJournalFils',this.rowData.idJournal);
    this.router.navigate(['/pages/ecritures']);
  
  }
  }
@Component({
  selector: 'ngx-journal-fils',
  templateUrl: './journal-fils.component.html',
  styleUrls: ['./journal-fils.component.scss']
})
export class JournalFilsComponent implements OnInit {
  journalParent = new Journal();
  source:any;
  exercice= new Excercice()
  id:any;
  constructor(private journalService:JournalService,
    private windowService: NbWindowService,private router :Router,private exerciceService:ExcerciceService) { }

  ngOnInit() {

    let idJournalParent= localStorage.getItem('idJournalParent')
    this.id=+idJournalParent;
    console.log("id journal parent"+idJournalParent)
    this.journalService.getJournalById(+idJournalParent).subscribe(

      data=>{this.journalParent=data}
    )
    
    let idExercice= localStorage.getItem('idExercice')

    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data => {this.exercice = data;
        this.exercice=this.exercice;
              },
      error => {console.log(error);}
      );
  }

  


  onClick(mois:string)
  {
    this.journalService.getAllJournalByJournalParentAndMois(this.id,mois).subscribe(
      data => {
        this.source = data;
        console.log(data)
              },
      error => {
        console.log(error);}
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
          idJournal:   {
            title:'id',
            type:'number'

          },code:{
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
         mois: {
          title:'Mois',
          type:'string'
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
          journaux: {
            title: 'ECRITURES',
            type: 'custom',
            renderComponent: ButtonView03Component
           }, 
            
       
        },
      };
      onClick03(){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/pages/journal']));

      }
         
      onCustom(event): any {
        if (event.action === 'editAction') {
          localStorage.removeItem('e')
          localStorage.removeItem('idJournal')
          localStorage.setItem("e", "1");
          localStorage.setItem('idJournal',event.data.idJournal.toString());
          this.windowService.open(ModalJournalComponent, {title: 'Modifier  JOurnal', context: event.data.idJournal});
        }
        if (event.action === 'showAction') {
          localStorage.setItem('idJournal',event.data.idJournal.toString());
          this.windowService.open(  ShowJournalComponent, {title: 'Afficher  Journal', context: event.data.idJournal});
        }
      }

}
