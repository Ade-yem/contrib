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
