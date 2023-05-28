export type paymentStatusType = 'Unpaid' | 'Paid' | 'Overdue Payment';

export interface IDataPrincipalType {
  name: string;
  valor: string;
  day: number;
  paymentStatus: paymentStatusType;
  id: string;
}
