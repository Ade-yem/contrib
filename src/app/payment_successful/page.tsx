"use client";

import React, { useEffect, useState } from 'react';
import { api } from '../../../convex/_generated/api';
import { useAction } from 'convex/react';
import { useSearchParams } from 'next/navigation';

const PaymentSuccessfulPage: React.FC = () => {
    const query = useSearchParams();
    const reference = query.get("reference") as string;
    const verifyTransaction = useAction(api.payments.verifyTransaction);
    const [status, setStatus] = useState("");
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        const setState = async () => {
            const res = await verifyTransaction({reference: reference});
            setStatus(res.data.status);
            setAmount(res.data.amount);
        };
        setState();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reference])
    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Thank you for your payment!</p>
            {/* Add any additional content or components here */}
        </div>
    );
};

export default PaymentSuccessfulPage;