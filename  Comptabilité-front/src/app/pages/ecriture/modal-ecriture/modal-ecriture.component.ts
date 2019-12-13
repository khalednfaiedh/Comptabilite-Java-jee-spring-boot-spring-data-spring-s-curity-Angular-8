import { Component, OnInit, ɵConsole } from '@angular/core';
import { Ecriture, EcritureService, OperationEcriture } from '../ecriture.service';
import { PlanTiersService } from '../../plan-tiers/plan-tiers.service';
import { PlanGeneralService, Plan, PlanTier } from '../../plan-general/plan-general.service';
import { error } from '@angular/compiler/src/util';
import { JournalService, Journal } from '../../journal/journal.service';
import { NbWindowRef, NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService, NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ModalPlanTiersComponent } from '../../plan-tiers/modal-plan-tiers/modal-plan-tiers.component';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { IfStmt } from '@angular/compiler';
import { JournalComponent } from '../../journal/journal.component';
import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { and } from '@angular/router/src/utils/collection';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { timeout } from 'rxjs/operators';
import {createNumberMask} from 'text-mask-addons/dist/textMaskAddons';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Enterprise } from '../../entreprise/entreprise';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';

@Component({
  selector: 'ngx-modal-ecriture',
  templateUrl: './modal-ecriture.component.html',
  styleUrls: ['./modal-ecriture.component.scss']
})
export class ModalEcritureComponent implements OnInit {
  ecriture = new Ecriture();
  comptesGeneral = []
  comptesTiers = []
  journal = new Journal();
  idPlan: number;
  A = "";
  money = "";
  count: number = 0;
  valide: boolean;
  nameCompteTiers = "";
  number: number = 1000;
 countEcriture:any;
   
  operationEcriture = [];

  //tost

  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;
  //form Group
  orderForm: FormGroup;
  items: FormArray;
  public totalfiles: Array<any> = [];

  //test update
   
  entreprise = new Enterprise();
  exercice= new Excercice();


  constructor(private planTierService: PlanTiersService,
    private planGeneralService: PlanGeneralService,
    private journalService: JournalService,
    // private windowRef: NbWindowRef, 
    private router: Router,
    private ecritureService: EcritureService,
    private toastrService: NbToastrService, private windowService: NbWindowService,
    private formBuilder: FormBuilder,
    private entrepriseService:EntrepriseService,
    private exerciceService:ExcerciceService ) {
  }

  ngOnInit() {

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

    let idJournalFils = localStorage.getItem('idJournalFils')
    let idEcriture = localStorage.getItem('idEcriture03')
    console.log("id ecriture:" + idEcriture)

    this.ecritureService.getEcritureById(+idEcriture).subscribe(
      data => {
      this.ecriture = data;
        //    console.log("ok")
        console.log(data);
        console.log("ici" + this.number)

      }
    )

   


    
 
    this.journalService.getJournalById(+idJournalFils).subscribe(
      data => {
        this.journal = data;
        this.ecriture.journal = data;
        this.money = this.journal.exercice.entreprise.money;
//1
       
     
//2
 

      },
      Error => { console.log("error get journal by id") }
    )
 
   


    this.planGeneralService.getAllPlanGeneral().subscribe(
      data => { this.comptesGeneral = data },
      error => { console.log("error get all pla general") }
    )

    this.planTierService.getAllPlanTiers().subscribe(
      data => { this.comptesTiers = data },
      error => { console.log("error get all pla  tier") }
    )


    let e = localStorage.getItem('e')
    if (e == '0') {
      let numeroEcriture = localStorage.getItem('numero');
   console.log('ok khaled'+numeroEcriture)
      
      this.A = "Enregistrer"
      this.orderForm = this.formBuilder.group({
      idjournal: idJournalFils,
      numeroEcriture:numeroEcriture,
      numeroPiece: [],
      date: [],
      libelle: [],
      items: this.formBuilder.array([this.createItem()])

      });
      this.addItem();
    }
   
      if (e == "1") {
        this.A = "Modifier"
        let id = localStorage.getItem('idEcriture03');
        let date = localStorage.getItem('date');
        let num = localStorage.getItem('numeroPiece');
        let libille = localStorage.getItem('libille');
        this.ecritureService.getAlloperationEcritureByEciture(+id).subscribe(
          data => {
          this.operationEcriture = data;
            console.log(data);

            this.orderForm = this.formBuilder.group({
              idEcriture:id,
              idjournal: idJournalFils,
              numeroEcriture:numeroEcriture,
              numeroPiece: num,
              date: new Date(date),
              libelle: libille,
              items: this.formBuilder.array([])

            });
            const books = this.orderForm.get('items') as FormArray;
            //    books.clearAsyncValidators()
            this.operationEcriture.forEach(b => {
              console.log(b)
              books.push(this.createItem2(b))

            });



          },
          error => { console.log("error get operation ecriture") }
        );

        console.log("ok" + this.operationEcriture.length)
        let numeroEcriture = localStorage.getItem('numero');
        console.log('ok khaled'+numeroEcriture)
        this.orderForm = this.formBuilder.group({
          idEcriture:id,
          idjournal: idJournalFils,
          numeroEcriture:numeroEcriture,
          numeroPiece: num,
          date: new Date(date),
          libelle: libille,
          items: this.formBuilder.array([])
        });

        this.items = this.orderForm.get('items') as FormArray;
        //    books.clearAsyncValidators()
        this.operationEcriture.forEach(b => {
          this.items.push(this.createItem2(b))
        });

        /// this.orderForm.setControl('items', this.formBuilder.array(this.operationEcriture || []));
      }

  }


  addEcriture() {
    let e = localStorage.getItem('e')
    // console.log("compte génerale"+this.ecriture.compteGeneral.nameCompte)
    // console.log("compte  tiers"+this.ecriture.compteTier.nameCompte)

    if (e == '0') {
      this.ecritureService.addEcriture(this.ecriture).subscribe(

        data => {
          this.ecriture = data
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/pages/ecritures']));
          this.content = 'ajouter écriture  réussi'
          this.status = NbToastStatus.SUCCESS;
          this.makeToast();

        },
        error => {
          this.content = `Interdiction de saisir une date d'une écriture ayant une année différente à l'année en cours `;
          this.status = NbToastStatus.DANGER;
          this.makeToast()
          console.log("error add  ecriture")
        }
      )

    }

    else
      if (e == '1') {
        this.ecritureService.updateEcriture(this.ecriture).subscribe(


          data => {
            this.ecriture = data
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(['/pages/ecritures']));
            this.content = ' Mis à jour écriture  réussi'
            this.status = NbToastStatus.SUCCESS;
            this.makeToast();


          },
          error => {
            this.content = `Interdiction de saisir une date d'une écriture ayant une année différente à l'année en cours `;
            this.status = NbToastStatus.DANGER;
            this.makeToast()
            console.log("error add  ecriture")
          }
        )

      }

  }

  openWindowCompteTiers() {
    localStorage.setItem("e", "0");
    localStorage.setItem("indexEcriture", "indexEcriture");
    this.windowService.open(ModalPlanTiersComponent, { title: 'Ajouter Compte  tier' });
  }

  makeToast() {
    this.showToast(this.status, this.title, this.content);
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';


    this.toastrService.show(
      body,
      `Toast ${titleContent}`,
      config);
  }

  public documentGrp: FormGroup;




  ////////VERSION 02
  get formData() { return <FormArray>this.orderForm.get('items'); }


  createItem(): FormGroup {
    return this.formBuilder.group({
      compteGeneral: new Plan(),
      compteTiers: new Plan(),
      credit: new FormControl(),
      debit: new FormControl(),
      // numeroEcriture:new FormControl(),
      // numeroPiece:new FormControl(),
      // date:new FormControl(),
      // libelle:new FormControl(),
    });
  }

  createItem2(operation: any) {
    // create a new form group containing controls and validators for a product

    return this.formBuilder.group({
      compteGeneral: new FormControl(operation.compteGeneral || new Plan()),
      compteTiers: new FormControl(operation.compteTiers || new Plan()),
      credit: new FormControl(operation.credit || new Number()),
      debit: new FormControl(operation.debit || new Number()),
    })


  }

  createBin(bin: any) {
    return new FormGroup({
      id: new FormControl(bin.id || ''),
      system: new FormControl(bin.system || ''),
      shape: new FormControl(bin.shape || '')
    })
  }

  setUpForm(operations: any[]) {
    return new FormGroup({
      items: new FormArray(operations.map((operation) => this.createItem2(operation)))
    });
  }

  // Au clic de l'utilisateur sur le bouton "Ajouter une ligne"
  addItem(): void {

    this.items = this.orderForm.get('items') as FormArray;
    for (let i = 0; i < 12; i++) {

      this.items.push(this.createItem());
    }
  }

  deleteItemLine(e, i): void {
    e.preventDefault();
    this.items = this.orderForm.get('items') as FormArray;
    console.log(this.items);
    this.items.removeAt(i);
  }

  submitForm(formdata) {
    
let e = localStorage.getItem('e');

    this.items = this.orderForm.get('items') as FormArray;
    let items = this.items.value;

    for (let item of items) {

      //  console.log("ok "+item.compteGeneral != null)
      //  if( item.compteGeneral.id==null   && item.compteTiers.id==null   && item.credit==null  && item.debit==null)
      if (item.compteGeneral.id == null && item.compteTiers.id == null && item.credit == 0 && item.debit == 0) {
        this.count += 0;

      }
      else if (item.compteGeneral.id != null && (item.credit == 0 && item.debit == 0)) {
        this.count += 1;
      } else if (item.compteGeneral.id != null && (item.credit != 0 && item.debit != 0)) {
        this.count += 1;
      }
      else if (item.compteGeneral.id == null && (item.credit != 0 || item.debit != 0)) {
        this.count += 1;
      }




    }
    console.log("count" + this.count);

  if(e=='0') // add  
   {
    if (this.count == 0) {
      this.ecritureService.saveAllecriture(formdata).subscribe(

        data => {
          formdata = data;
          console.log(data);
          this.status = NbToastStatus.SUCCESS;
          this.title = ' Votre Ecriture  a été ajouté avec succès  '
          this.content = '',
          this.makeToast();
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/pages/ecritures']));
        },
        error => {
          console.log(error.status)
          if (error.status == "403") {
            this.status = NbToastStatus.DANGER;
            this.title = ' DATE INVALIDE   '
            this.content = "Interdiction de saisir une date d'une écriture ayant une année ET mois différente à l'année en cours "
            this.makeToast();
          }

        }
      )
    }
    else {
      this.status = NbToastStatus.DANGER;
      this.title = "INTERDICTION  D'ÀJOUTER UNE ECRITURE"
      this.content = ' votre formulaire est invalide';
      this.makeToast();
    }
  }
  else// update
  {

    // console.log("update");
    // console.log(formdata);
    // this.ecritureService.updateOperationEcritureAndEcriture(formdata).subscribe(
    // data=>{formdata=data},
    // error=>{console.log("error")}  
    // )

    if (this.count == 0) {
      this.ecritureService.updateOperationEcritureAndEcriture(formdata).subscribe(

        data => {
          formdata = data;
          console.log(data);
          this.status = NbToastStatus.SUCCESS;
          this.title = ' Votre Ecriture  a été  Modifier avec succès  '
          this.content = '',
          this.makeToast();
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/pages/ecritures']));
        },
        error => {
          console.log(error.status)
          if (error.status == "403") {
            this.status = NbToastStatus.DANGER;
            this.title = ' DATE INVALIDE   '
            this.content = "Interdiction de saisir une date d'une écriture ayant une année ET mois différente à l'année en cours "
            this.makeToast();
          }

        }
      )
    }
    else {
      this.status = NbToastStatus.DANGER;
      this.title = "INTERDICTION Du MODIFIER UNE ECRITURE"
      this.content = ' votre formulaire est invalide';
      this.makeToast();
    }
  }





    this.count = 0;
  }

  getTotalDebit() {
    this.items = this.orderForm.get('items') as FormArray;

    let items = this.items.value;
    let total = 0;
    for (let item of items) {
      if (item.debit === null) {
        item.debit = 0;
      }

      total += parseFloat(item.debit)


    }

    if (!isNaN(total)) {
      return total.toFixed(3);

    }
  }


  getTotalCredit() {
    this.items = this.orderForm.get('items') as FormArray;

    let items = this.items.value;
    let total = 0;
    for (let item of items) {
      if (item.credit === null) {
        item.credit = 0;
      }
      total += parseFloat(item.credit)
    }
    if (!isNaN(total)) {
      return total.toFixed(3);
    }
  }

  getEcartDebitCredit() {
    let debit = parseFloat(this.getTotalDebit());
    let credit = parseFloat((this.getTotalCredit()));
    let ecart = debit - credit;
    return ecart.toFixed(3);
  }
  validForm() {
    if (parseFloat(this.getEcartDebitCredit()) == 0 && parseFloat(this.getTotalDebit()) != 0 && parseFloat(this.getTotalCredit())) {

      return (this.valide = false)
    }
    else {
      return (this.valide = true)

    }


  }
  refreshCompteTiers() {
    console.log("refrech compte")
    this.planTierService.getAllPlanTiers().subscribe(
      data => { this.comptesTiers = data },
      error => { console.log("error get all plaN  tier") }
    )
  }

  getNameCompteTiers(i) {
    return (this.orderForm.value.items[i].compteTiers.nameCompte);
  }
  getNameCompteGeneral(i) {
    return (this.orderForm.value.items[i].compteGeneral.nameCompte);
  }
  transformeDecimal()
  {
    //this.orderForm.value.numeroPiece |  Number: '3.2-5';
  }
  // transformDecimaleNumber(num)
  // {
  //   return this.decimalPipe.transform(num,'1-3.3')
  // }

  get mask2(): any {
   
     return {mask:createNumberMask({
        prefix:'',
        suffix:'TND',
        thousandsSeparatorSymbol : ' ',
        decimalSymbol:'.',
        requireDecimal:  false,
        includeThousandsSeparator: true,  
        allowDecimal: true,  
        decimalLimit: 3,
        integerLimit:  true,
        allowNegative: true,
        allowLeadingZeroes: true,
       
       
      })
   
      
    };
    
  }  

  onClick() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/ecritures']));

  }

  onClick2(){this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  this.router.navigate(['/pages/journal']));}
  
}
