interface SelectionProcess {
  id: string;
  title: string;
  createdAt?: string;
  finalDate?: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'PENDING' | 'STOPPED';
}

export const selectionProcess: SelectionProcess[] = [
  {
    id: '1',
    title: 'Desenvolvedor Frontend',
    createdAt: '2023-01-01',
    finalDate: '2023-01-31',
    status: 'IN_PROGRESS',
  },
  {
    id: '2',
    title: 'Analista de Dados',
    createdAt: '2023-02-01',
    finalDate: '2023-02-28',
    status: 'PENDING',
  },
  {
    id: '3',
    title: 'Gerente de Projetos',
    createdAt: '2022-12-01',
    finalDate: '2022-12-31',
    status: 'COMPLETED',
  },
  {
    id: '4',
    title: 'Desenvolvedor Backend',
    createdAt: '2023-03-01',
    finalDate: '2023-03-31',
    status: 'IN_PROGRESS',
  },
  {
    id: '5',
    title: 'Designer UX/UI',
    createdAt: '2023-02-15',
    finalDate: '2023-03-15',
    status: 'PENDING',
  },
  {
    id: '6',
    title: 'Analista de QA',
    createdAt: '2023-01-15',
    finalDate: '2023-02-15',
    status: 'COMPLETED',
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    createdAt: '2023-03-10',
    finalDate: '2023-04-10',
    status: 'IN_PROGRESS',
  },
  {
    id: '8',
    title: 'Product Owner',
    createdAt: '2023-02-20',
    finalDate: '2023-03-20',
    status: 'PENDING',
  },
];