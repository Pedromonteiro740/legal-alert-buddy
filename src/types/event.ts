
export type EventCategory = 'Contrato' | 'Fiscal' | 'Licença' | 'Outros';
export type ReminderChannel = 'E-mail' | 'WhatsApp';
export type EventStatus = 'Aguardando' | 'Enviado';

export interface LegalEvent {
  id: string;
  name: string;
  category: EventCategory;
  date: Date;
  channel: ReminderChannel;
  contact: string;
  status: EventStatus;
}
