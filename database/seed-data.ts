
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'TAREA PENDIENTE',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'TAREA EN PROCESO',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      description: 'TAREA FINALIZADA',
      status: 'finished',
      createdAt: Date.now() - 1500000
    }
  ]
}