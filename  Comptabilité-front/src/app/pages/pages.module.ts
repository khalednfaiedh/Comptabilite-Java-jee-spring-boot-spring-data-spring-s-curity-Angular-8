import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ParametreModule} from './parametre/parametre.module';
import { EntrepriseComponent, ButtonViewComponent } from './entreprise/entreprise.component';
import { ModalEntrepriseComponent } from './entreprise/modal-entreprise/modal-entreprise.component';
import { ShowEntrepriseComponent } from './entreprise/show-entreprise/show-entreprise.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { PlanGeneralComponent } from './plan-general/plan-general.component';
import { ModalPlanGeneralComponent } from './plan-general/modal-plan-general/modal-plan-general.component';
import { ShowPlanGeneralComponent } from './plan-general/show-plan-general/show-plan-general.component';
import { PlanTiersComponent } from './plan-tiers/plan-tiers.component';
import { ModalPlanTiersComponent } from './plan-tiers/modal-plan-tiers/modal-plan-tiers.component';
import { ShowPlanTiersComponent } from './plan-tiers/show-plan-tiers/show-plan-tiers.component';
import { ExcerciceComponent } from './excercice/excercice.component';
import { ModalExcerciceComponent } from './excercice/modal-excercice/modal-excercice.component';
import { ShowExcerciceComponent } from './excercice/show-excercice/show-excercice.component';
import { ExcerciceOuvertsComponent, ButtonView01Component } from './excercice/excercice-ouverts/excercice-ouverts.component';
import { ExcerciceCloturesComponent } from './excercice/excercice-clotures/excercice-clotures.component';
import { JournalComponent, ButtonView02Component } from './journal/journal.component';
import { ModalJournalComponent } from './journal/modal-journal/modal-journal.component';
import { ShowJournalComponent } from './journal/show-journal/show-journal.component';
import { TitreComponent } from './excercice/titre/titre.component';
import { TitreExerciceComponent } from './journal/titre-exercice/titre-exercice.component';
import { JournalFilsComponent, ButtonView03Component } from './journal/journal-fils/journal-fils.component';
import { EcritureComponent, ButtonView04Component } from './ecriture/ecriture.component';
import { ModalEcritureComponent } from './ecriture/modal-ecriture/modal-ecriture.component';
import { ShowEcritureComponent } from './ecriture/show-ecriture/show-ecriture.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { TitreJournalComponent } from './journal/titre-journal/titre-journal.component';
import { UpdateEcritureComponent } from './ecriture/update-ecriture/update-ecriture.component';
import {TextMaskModule} from 'angular2-text-mask';
import { ImportExportService } from './import-export/import-export.service';
import { GrandLivreComponent } from './grand-livre/grand-livre.component';
 
    

const PAGES_COMPONENTS = [
     PagesComponent,
     EntrepriseComponent,
     ModalEntrepriseComponent,
     ShowEntrepriseComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    ECommerceModule,
    MiscellaneousModule,
    ParametreModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    TextMaskModule,
   
   

  ],
  declarations: [
    ...PAGES_COMPONENTS,
    EntrepriseComponent,
    ModalEntrepriseComponent,
    ShowEntrepriseComponent,
    PlanGeneralComponent,
    ModalPlanGeneralComponent,
    ShowPlanGeneralComponent,
    PlanTiersComponent,
    ModalPlanTiersComponent,
    ShowPlanTiersComponent,
    ExcerciceComponent,
    ModalExcerciceComponent,
    ShowExcerciceComponent,
    ExcerciceOuvertsComponent,
    ExcerciceCloturesComponent,
    ButtonViewComponent,
    JournalComponent,
    ModalJournalComponent,
    ShowJournalComponent,
    ButtonView01Component,
    TitreComponent,
    TitreExerciceComponent,
    ButtonView02Component,
    JournalFilsComponent,
    EcritureComponent,
    ModalEcritureComponent,
    ShowEcritureComponent,
    ButtonView03Component,
    ButtonView04Component,
    ImportExportComponent,
    TitreJournalComponent,
    UpdateEcritureComponent,
    GrandLivreComponent,
    
  ],
  exports: [
    ...PAGES_COMPONENTS,  
  ],

   entryComponents: [
    ModalEntrepriseComponent,
    ShowEntrepriseComponent,
    ModalPlanGeneralComponent,
    ShowPlanGeneralComponent, 
     ModalPlanTiersComponent,
    ShowPlanTiersComponent,
    ModalExcerciceComponent,   
    ButtonViewComponent  ,  
    ShowExcerciceComponent,     
    ModalJournalComponent,
    ShowJournalComponent,   
    ButtonView01Component,      
    ButtonView02Component ,
    ButtonView03Component  ,
    ButtonView04Component,
    UpdateEcritureComponent,
    
    ShowEcritureComponent,                                                                                                                                                                                                                                                
    ],
    providers: [ImportExportService]
})
export class PagesModule {
}
