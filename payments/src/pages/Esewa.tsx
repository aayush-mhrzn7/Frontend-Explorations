import { v4 as uuidv4 } from "uuid";
import { generateEsewaSignature } from "../helpers/index.helper";

const Esewa = () => {
  const uniqueId = uuidv4();
  const format = `total_amount=2120,transaction_uuid=${uniqueId},product_code=${
    import.meta.env.VITE_MERCHANT_CODE
  }`;
  const esewaRequestParams = {
    amount: 2000,
    tax_amount: 10,
    product_service_charge: 10,
    product_delivery_charge: 100,
    product_code: import.meta.env.VITE_MERCHANT_CODE,
    total_amount: 2000 + 10 + 10 + 100,
    transaction_uuid: uniqueId,
    success_url: "http://localhost:5173/success",
    failure_url: "http://localhost:5173/failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: generateEsewaSignature({
      message: format,
      secretKey: import.meta.env.VITE_SECRET_KEY,
    }),
  };
  const initatePaymentRequest = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    Object.entries(esewaRequestParams).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  };
  return (
    <div className="flex h-screen gap-2 items-center justify-center">
      <button
        className="p-2 px-10 text-white font-semibold rounded-md  bg-emerald-600"
        onClick={() => {
          initatePaymentRequest();
        }}
      >
        ESEWA
      </button>
    </div>
  );
};

export default Esewa;
