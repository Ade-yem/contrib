interface Authorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel?: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable?: boolean;
  signature?: string;
  account_name: string;
}

interface Subscription {
  status: string;
  subscription_code: string;
  email_token?: string;
  amount: number;
  cron_expression: string;
  next_payment_date: string;
  open_invoice: string | null;
}

interface Customer {
  id?: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: any;
  risk_action: string;
}

interface Transaction {
  reference?: string;
  status?: string;
  amount?: number;
  currency?: string;
}

export interface Invoice {
  domain: string;
  invoice_code: string;
  amount: number;
  period_start: string;
  period_end: string;
  status: string;
  paid: boolean;
  paid_at: string | null;
  description: string | null;
  authorization: Authorization;
  subscription: Subscription;
  customer: Customer;
  transaction: Transaction;
  created_at: string;
}