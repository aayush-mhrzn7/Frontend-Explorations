import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type PaymentDataType = {
  status: string;
  transaction_code: string;
  total_amount: string;
};

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    if (!data) {
      setStatus("Error: Missing payment data");
      return;
    }

    try {
      const decodedString = atob(data);

      const decodedData: PaymentDataType = JSON.parse(decodedString);

      // Check the status property from the decoded object
      setStatus(
        decodedData?.status === "COMPLETE" ? "Success" : "Payment Failed"
      );
    } catch (error) {
      console.error("Failed to decode and parse data:", error);
      setStatus("Error: Invalid payment data format");
    }
  }, [data]);

  return <div>{status}</div>;
};

export default PaymentStatus;
