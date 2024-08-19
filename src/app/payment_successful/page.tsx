"use client";

import React, { useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { useAction } from 'convex/react';
import { useRouter, useSearchParams } from 'next/navigation';

const PaymentSuccessfulPage: React.FC = () => {
    const query = useSearchParams();
    const router = useRouter();
    const reference = query.get("reference") as string;
    const verifyTransaction = useAction(api.payments.verifyTransaction);
    const [status, setStatus] = useState("");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const setState = async () => {
            setLoading(true);
            const res = await verifyTransaction({reference: reference});
            setStatus(res.data.status);
            setAmount(res.data.amount);
            setLoading(false);
        };
        setState();
        router.back();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reference])
    return (
        <div>
            { !loading && status === "success" && <div>
            <h1>Payment Successful</h1>
            <p>Thank you for your payment!</p>
            <p>{amount}</p>
            </div>}
            {loading && <span className='loading loading-infinity loading-lg'>Loading...</span>}
            {!loading && status !== "success" && <div>
                <h1>Payment Failed</h1>
                <p>Sorry, your payment was not successful. Please try again.</p>
            </div>}
        </div>
    );
};

export default PaymentSuccessfulPage;