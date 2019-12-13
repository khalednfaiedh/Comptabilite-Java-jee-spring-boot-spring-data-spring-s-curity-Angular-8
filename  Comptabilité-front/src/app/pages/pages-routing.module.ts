import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {ParametreComponent} from './parametre/parametre.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { PlanGeneralComponent } from './plan-general/plan-general.component';
import { PlanTiersComponent } from './plan-tiers/plan-tiers.component';
import { ExcerciceComponent } from './excercice/excercice.component';
import { JournalComponent } from './journal/journal.component';
import { JournalFilsComponent } from './journal/journal-fils/journal-fils.component';
import { EcritureComponent } from './ecriture/ecriture.component';
import { ModalEcritureComponent } from './ecriture/modal-ecriture/modal-ecriture.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { GrandLivreComponent } from './grand-livre/grand-livre.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: ECommerceComponent,
  }, {
      path: 'parametre',
      component: ParametreComponent,
    }, 
  {
    path:  'entreprise',
    component: EntrepriseComponent ,
  },{
    path:  'planTiers',
    component:  PlanTiersComponent ,
  },{
    path:  'exercice',
    component:  ExcerciceComponent  ,
  },{
    path:  'planGeneral',
    component:  PlanGeneralComponent ,
  } ,{
    path:  'journal',
    component:   JournalComponent ,
  },{
    path:  'journalFils',
    component:    JournalFilsComponent ,
  }  ,{
    path:  'ecritures',
    component:  EcritureComponent    ,
  }
 ,{

      path:  'ajoutEcritures',
      component:   ModalEcritureComponent    ,
  } ,
  {
    path:  'import-export',
    component:    ImportExportComponent     ,
  },
  {
    path:  'grandLivre',
    component:     GrandLivreComponent     ,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
   {
    path: '**',
    component: NotFoundComponent,
  }, {
      path: 'parametre',
      component: ParametreComponent,
    }],

    
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
