type resData = {
    authorization_url: string;
    access_code: string;
    reference: string;
}
export interface InitializeResponse {
    status: boolean
    message: string;
    data: resData;
}

type createPlanResponseData = {
    name: string;
    interval: string;
    amount: number;
    integration: number;
    domain: string;
    currency: string;
    plan_code: string;
    invoice_limit: number;
    send_invoices: boolean;
    send_sms: boolean;
    hosted_page: boolean;
    migrate: boolean;
    id: number;
    createdAt: Date;
    updatedAt: Date
  }
export interface createPlanResponse {
    status: boolean;
    message: string;
    data: createPlanResponseData;
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
    metadata: string | null;
    risk_action: string;
  }
  
  interface Data {
    amount: number;
    currency: string;
    transaction_date: string;
    status: string;
    reference: string;
    domain: string;
    metadata: string;
    gateway_response: string;
    message: string | null;
    channel: string;
    ip_address: string | null;
    log: string | null;
    fees: number;
    authorization: Authorization;
    customer: Customer;
    plan: string | null;
    id: number;
  }
  
  export interface ChargeAttemptResponse {
    status: boolean;
    message: string;
    data: Data;
  }