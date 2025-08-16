import CryptoJS from "crypto-js";
export function generateEsewaSignature({
  message,
  secretKey,
}: {
  message: string;
  secretKey: string;
}): string {
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  return CryptoJS.enc.Base64.stringify(hash);
}
