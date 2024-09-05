interface LogHistory {
    type: string;
    message: string;
    time: number;
  }
  
interface Log {
  time_spent: number;
  attempts: number;
  authentication: string;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: any[];
  channel: string | null;
  history: LogHistory[];
}
  
  interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    customer_code: string;
    phone: string | null;
    metadata: any;
    risk_action: string;
  }

  interface Metadata {
    details: 'join group' | "add savings";
    groupId: string;
    savingsId: string;
    userId: string;
  }
  
export interface Authorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  account_name: string;
}
  
  export interface ChargeSuccessData {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Metadata;
    log: Log;
    fees: any;
    customer: Customer;
    authorization: Authorization;
  }

//   {
//     amount: 10000,
//     email: "adejumoadeyemi32@gmail.com",
//     metadata: { details: "join group", groupId: "k176ek00vz0z4y08m71xage9a96zn1yd", userId: "jx76m0fbdf962z3c8bae5qjh4x6zjn9n" },
//   }