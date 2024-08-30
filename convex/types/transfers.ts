interface TransferRecipientDetails {
    authorization_code: string | null;
    account_number: string;
    account_name: string | null;
    bank_code: string;
    bank_name: string;
}
  
interface TransferRecipientData {
  active: boolean;
  createdAt: string;
  currency: string;
  domain: string;
  id: number;
  integration: number;
  name: string;
  recipient_code: string;
  type: string;
  updatedAt: string;
  is_deleted: boolean;
  details: TransferRecipientDetails;
}
  
export interface TransferRecipientResponse {
  status: boolean;
  message: string;
  data: TransferRecipientData;
}

interface Bank {
    name: string;
    slug: string;
    code: string;
    longcode: string;
    gateway: string | null;
    pay_with_bank: boolean;
    active: boolean;
    is_deleted: boolean;
    country: string;
    currency: string;
    type: string;
    id: number;
    createdAt: string;
    updatedAt: string;
}
  
export interface BanksResponse {
    status: boolean;
    message: string;
    data: Bank[];
}
  
interface TransferData {
    reference: string;
    integration: number;
    domain: string;
    amount: number;
    currency: string;
    source: string;
    reason: string;
    recipient: number;
    status: string;
    transfer_code: string;
    id: number;
    createdAt: string;
    updatedAt: string;
}
  
export interface TransferResponse {
    status: boolean;
    message: string;
    data: TransferData;
}
