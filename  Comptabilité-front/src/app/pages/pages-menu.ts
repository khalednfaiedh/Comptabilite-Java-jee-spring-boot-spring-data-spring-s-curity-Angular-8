import { NbMenuItem } from '@nebular/theme';
import { link } from 'fs';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'nb-e-commerce',
    link: '/pages/dashboard',
    home: true,
  },
  { 
    title: 'Démarrage',
    icon: 'nb-compose',
    children : [
      {
        title : 'Société',
        link: '/pages/entreprise',
      },
     
    ]
  },
  {
    title: 'Strucutre et Etats',
    icon: 'nb-grid-b',
    children: [
      {
        title: 'Plan Général',
        link: '/pages/planGeneral'
      },
      {
        title: 'Plan Tiers',
        link: '/pages/planTiers'
      },
      {title:'import-export',
      link:'/pages/import-export'

      }, {title:'Grand Livre',
      link:'/pages/grandLivre'

      },
    ]
  },
  {
    title: 'Traitements et Saisie',
    icon: 'nb-gear',
    children : [
    {
      title: 'Saisie ',
      link: '/pages/exercice',
    },
     
    ]
  },



  // {
  //   title: 'societe',
  //   icon: 'nb-e-commerce',
  //   link: '/pages/entreprise',
  //   home: true,
  // },{
  //   title: 'PLan Géneral',
  //   icon: 'nb-e-commerce',
  //   link: '/pages/planGeneral',
  //   home: true,
  // } ,{
  //   title: 'PLan Tiers',
  //   icon: 'nb-e-commerce',
  //   link: '/pages/planTiers',
  //   home: true,
  // } ,{
  //   title: '  Excercice',
  //   icon: 'nb-e-commerce',
  //   link: '/pages/exercice',
  //   home: true,
  // } ,{
  //   title: '   Journal',
  //   icon: 'nb-e-commerce',
  //   link: '/pages/journal',
  //   home: true,
  // } 
];
