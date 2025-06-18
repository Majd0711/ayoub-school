interface Program {
  id: string;
  title: string;
  level: string;
  duration: string;
  conditions: string[];
  seats: number;
  imageUrl: string;
}

export const programs: Program[] = [
  {
    id: 'licence-pro',
    title: 'Licence Professionnel',
    level: 'Bac+2 (DUT, BTS, DEUG)',
    duration: '1 an',
    conditions: [
      'Management des organisations',
      'Gestion des ressources humaines',
      'Commerce international',
      'Gestion comptable et financière'
    ],
    seats: 30,
    imageUrl: '/images/graduation.jpg'
  },
  {
    id: 'ts-gestion',
    title: 'TS : Gestion des entreprises',
    level: 'Baccalauréat',
    duration: '2 ans',
    conditions: [
      'Baccalauréat ou niveau technicien requis',
      'Formation en gestion d\'entreprise',
      'Cours pratiques et théoriques'
    ],
    seats: 25,
    imageUrl: '/images/students-class.jpg'
  },
  {
    id: 't-info',
    title: 'T : Gestion Informatisée',
    level: 'Niveau Bac et plus',
    duration: '2 ans',
    conditions: [
      'Niveau Bac ou plus requis',
      'Formation en informatique de gestion',
      'Projets pratiques inclus'
    ],
    seats: 20,
    imageUrl: '/images/tech-student.jpg'
  }
];
