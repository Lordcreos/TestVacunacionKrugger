export type taskModel = {
  id: number;
  userId: number;
  title: string;
  description: string;
  dosis: number; // Numero de Dosis
  status: string;  // Lista/Esperando
  createdAt: Date;
};
