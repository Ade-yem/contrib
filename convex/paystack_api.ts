"use node";

import https from "https";

function makeHttpsRequest(options: https.RequestOptions, params: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', error => {
      reject(error);
    });

    req.write(params);
    req.end();
  });
}

class PaystackAPI {
  paystack: {
    secret_key: string;
    public_key?: string;
    hostname: string;
  };

  constructor() {
    if (!process.env.PAYSTACK_SECRET) throw new Error("PAYSTACK_SECRET is not set");
    this.paystack = {
      secret_key: process.env.PAYSTACK_SECRET as string,
      // public_key: process.env.PAYSTACK_PUBLIC_KEY as string,
      hostname: "api.paystack.co"
    }
  }

  async initializeTransaction(data: { email: string, amount: number }) {
    const params = JSON.stringify({
        "email": data.email,
        "amount": data.amount,
      })
      const options = {
        hostname: this.paystack.hostname,
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.paystack.secret_key,
          'Content-Type': 'application/json'
        }
      }
      const result = await makeHttpsRequest(options, params);
      return result;
      
  }

  async createPlan(data: { name: string, amount: number, interval: string, invoiceLimit: number, description: string, }) {
    const params = JSON.stringify({
      "name": data.name,
      "interval": data.interval,
      "amount": data.amount,
      "invoice_limit": data.invoiceLimit,
      "description": data.description,
    })
    const options = {
      hostname: this.paystack.hostname,
      port: 443,
      path: '/plan',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.paystack.secret_key,
        'Content-Type': 'application/json'
      }
    }
    return await makeHttpsRequest(options, params);
  }

  async createSubscription(data: { customer: string, plan: string}) {
    const params = JSON.stringify({
      "customer": data.customer,
      "plan": data.plan
    })
    const options = {
      hostname: this.paystack.hostname,
      port: 443,
      path: '/subscription',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.paystack.secret_key,
        'Content-Type': 'application/json'
      }
    }
    return await makeHttpsRequest(options, params);
  }

  async verifyTransaction(data: { reference: string }) {
    const options = {
      hostname: this.paystack.hostname,
      port: 443,
      path: '/transaction/verify/' + data.reference,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.paystack.secret_key,
      }
    }
    return await makeHttpsRequest(options, '');
  }

  async getBanks(data: { currency: "NGN" | "GHS" }) {
    const options = {
      hostname: this.paystack.hostname,
      port: 443,
      path: `/bank?currency=${data.currency}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.paystack.secret_key,
      }
    }
    return await makeHttpsRequest(options, '');
  }

  async resolveAccountNumber(data: { account_number: string, bank_code: string }) {
    const options = {
      hostname: this.paystack.hostname,
      port: 443,
      path: `/bank/resolve?account_number=${data.account_number}&bank_code=${data.bank_code}`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.paystack.secret_key,
      }
    };
    return await makeHttpsRequest(options, '');
  }

  async createTransferRecipient(data: { type: "ghpss" | "nuban", name: string, account_number: string, bank_code: string, currency: string }) {
    const params = JSON.stringify({
      "type": data.type,
      "name": data.name,
      "account_number": data.account_number,
      "bank_code": data.bank_code,
      "currency": data.currency
    });
    const options = {
      hostname: this.paystack.hostname,
      port: 443,
      path: '/transferrecipient',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.paystack.secret_key,
        'Content-Type': 'application/json'
      }
    };
    return await makeHttpsRequest(options, params);
  }

  async initiateTransfer(data: { reference: string, amount: number, recipient: string, reason: string }) {
    const params = JSON.stringify({
      "source": "balance",
      "amount": data.amount,
      "reference": data.reference,
      "recipient": data.recipient,
      "reason": data.reason
    });
    const options = {
      hostname: this.paystack.hostname,
      port: 443,
      path: '/transfer',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.paystack.secret_key,
        'Content-Type': 'application/json'
      }
    };
    return await makeHttpsRequest(options, params);
  }
}

const paystack = new PaystackAPI()
export default paystack;