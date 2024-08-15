interface LogHistory {
    type: string;
    message: string;
    time: number;
  }
  
  interface Log {
    start_time: number;
    time_spent: number;
    attempts: number;
    errors: number;
    success: boolean;
    mobile: boolean;
    input: any[];
    history: LogHistory[];
  }
  
  interface FeesSplitParams {
    bearer: string;
    transaction_charge: string;
    percentage_charge: string;
  }
  
  interface FeesSplit {
    paystack: number;
    integration: number;
    subaccount: number;
    params: FeesSplitParams;
  }
  
  interface Authorization {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: string | null;
  }
  
  interface Customer {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    customer_code: string;
    phone: string | null;
    metadata: any;
    risk_action: string;
  }
  
  interface Subaccount {
    id: number;
    subaccount_code: string;
    business_name: string;
    description: string;
    primary_contact_name: string | null;
    primary_contact_email: string | null;
    primary_contact_phone: string | null;
    metadata: any;
    percentage_charge: number;
    settlement_bank: string;
    account_number: string;
  }
  
  interface Data {
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
    metadata: any;
    log: Log;
    fees: number;
    fees_split: FeesSplit;
    authorization: Authorization;
    customer: Customer;
    plan: any;
    order_id: string | null;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    transaction_date: string;
    plan_object: any;
    subaccount: Subaccount;
  }
  
  export interface VerificationResponse {
    status: boolean;
    message: string;
    data: Data;
  }
  