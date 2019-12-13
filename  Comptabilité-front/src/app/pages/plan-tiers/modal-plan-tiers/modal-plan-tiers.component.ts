import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Plan } from '../../plan-general/plan-general.service';
import { PlanTiersService } from '../plan-tiers.service';
import { NbWindowRef, NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-plan-tiers',
  templateUrl: './modal-plan-tiers.component.html',
  styleUrls: ['./modal-plan-tiers.component.scss']
})
export class ModalPlanTiersComponent implements OnInit {
  planTiers = new Plan();
  valider = "Ajouter";

  //tost
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus 
  title: string;
  content = `  `;
  
  constructor(private servicePlanTiers: PlanTiersService,
              private router: Router,  
              public windowRef: NbWindowRef, 
              private toastrService: NbToastrService) { }

  ngOnInit() {
    let e = localStorage.getItem("e");
    if (e == '1') {
      let idPlanTier = localStorage.getItem('idPlaTier');
      this.valider = "Modifier";
      this.servicePlanTiers.getPlanTiersById(+idPlanTier).subscribe(
        data => {
          this.planTiers = data;
        }
      )
    }
  }
  addPlanTiers() {
    let e = localStorage.getItem("e");
    let e2=localStorage.getItem('indexEcriture');
    localStorage.removeItem('indexEcriture');
    if (e == '0') {//add



      this.servicePlanTiers.addPlanTiers(this.planTiers).subscribe(
        data => {
        this.planTiers = data;
        this.status= NbToastStatus.SUCCESS   ;
        this.title='ajouter réussi'
        this.makeToast();
        this.windowRef.close();
        if(e2!='indexEcriture')
        {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/planTiers"]));
        }
        },
        error => {
          console.log(error);
        }
      );
    }
    if (e == '1') {

      this.servicePlanTiers.updatePlanTiers(this.planTiers).subscribe(
        data => {
        this.planTiers = data

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/planTiers"]));
          this.windowRef.close();
        },
        error => {
          console.log(error);
        }
      );
    }
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
}
