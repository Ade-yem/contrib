"use node";

import { encode } from "./utils";
import {ConvexError} from "convex/values";

class MonnifyApi {
  monnifyData: {
    accessToken: string;
    baseUrl: string;
  };

  constructor() {
    this.monnifyData = {
      accessToken: '',
      baseUrl: process.env.MONNIFY_URL || ''
    };

    if (!process.env.MONNIFY_SECRET) throw new Error("MONNIFY_SECRET is not set");
    if (!process.env.MONNIFY_API_KEY) throw new Error("MONNIFY_API_KEY is not set");
    if (!process.env.MONNIFY_URL) throw new Error("MONNIFY_URL is not set");

    this.init();
  }

  async init() {
    const params = JSON.stringify({});
    try {
      const res = await fetch(`${this.monnifyData.baseUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + encode(process.env.MONNIFY_API_KEY + ":" + process.env.MONNIFY_SECRET),
          'Content-Type': 'application/json'
        },
        body: params
      })
      const data = await res.json();
      if (data.requestSuccessful) {
        this.monnifyData.accessToken = data.responseBody.accessToken;
      } else {
        throw new Error(data.responseMessage);
      }
    } catch (error) {
      console.error("Error during Monnify authentication:", error);
    }
  }

  async verifyBvn(data: {bvn: string; name: string; dob: string; phone: string;}) {
    const params = JSON.stringify({
      "bvn": data.bvn,
      "name": data.name,
      "dateOfBirth": data.dob,
      "mobileNo": data.phone
    })
    const dat = await fetch(`${this.monnifyData.baseUrl}/api/v1/vas/bvn-details-match`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + encode(process.env.MONNIFY_API_KEY + ":" + process.env.MONNIFY_SECRET),
        'Content-Type': 'application/json'
      },
      body: params
    })
    const res = await dat.json();
    if (!res.requestSuccessful) throw new ConvexError(res.responseMessage)
    else return res.responseBody;

  }

  async verifyNin(nin: string) {
    const params = JSON.stringify({
      "nin": nin
    })
    const dat = await fetch(`${this.monnifyData.baseUrl}/api/v1/vas/nin-details`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + encode(process.env.MONNIFY_API_KEY + ":" + process.env.MONNIFY_SECRET),
        'Content-Type': 'application/json'
      },
      body: params
    })
    const res = await dat.json();
    if (!res.requestSuccessful) throw new ConvexError(res.responseMessage)
    else return res.responseBody;
  }
}
const monnify = new MonnifyApi();
export default monnify;

