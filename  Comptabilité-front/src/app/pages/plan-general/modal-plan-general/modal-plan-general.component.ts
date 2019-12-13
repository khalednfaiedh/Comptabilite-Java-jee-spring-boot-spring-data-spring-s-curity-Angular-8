import { Component, OnInit } from '@angular/core';
import { Plan, PlanGeneralService } from '../plan-general.service';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-modal-plan-general',
  templateUrl: './modal-plan-general.component.html',
  styleUrls: ['./modal-plan-general.component.scss']
})
export class ModalPlanGeneralComponent implements OnInit {
planGeneral= new Plan();
valider = "Ajouter";
   
  constructor(private servicePlanGeneral:PlanGeneralService,
       private router:Router, public windowRef: NbWindowRef) { }

  ngOnInit() {

    let e = localStorage.getItem('e');
    if(e == '1'){
   this.valider='Modifier'   
    
    let idPlanGeneral = localStorage.getItem("idPlanGeneral");
    this.servicePlanGeneral.getPlanGeneralById(+idPlanGeneral).subscribe(
      data=>{this.planGeneral = data;},
      error=>{console.log(error);
      }
    );
  }
}


creerGAccount(){
  let e = localStorage.getItem("e");
  if (e == '0') {//add
  
  
    
    this.servicePlanGeneral.addPlanGeneral(this.planGeneral).subscribe(
      data=>{this.planGeneral  = data;
        
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
         this.router.navigate(["/pages/planGeneral"]));
         this.windowRef.close();
      },
      error=>{console.log(error);
      }
    );
  }
  if(e==='1')
  {
    this.servicePlanGeneral.updatePlanGeneral(this.planGeneral).subscribe(
      data=>{this.planGeneral  = data;
        
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
         this.router.navigate(["/pages/planGeneral"]));
         this.windowRef.close();
      },
      error=>{console.log(error);
      }
    );
  }
}
}
