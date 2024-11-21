import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Copy, IndianRupee } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface UPIPaymentProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function UPIPayment({ amount, onSuccess, onCancel }: UPIPaymentProps) {
  const [copied, setCopied] = useState(false);
  const upiId = "merchant@upi"; // Replace with your actual UPI ID
  const upiLink = `upi://pay?pa=${upiId}&pn=GameVault&am=${amount}&cu=INR&tn=Game Purchase`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success('UPI ID copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentVerification = () => {
    // In a real implementation, you would verify the payment with your backend
    toast.success('Payment verified successfully!');
    onSuccess();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">UPI Payment</h3>
        <div className="flex items-center space-x-2">
          <IndianRupee className="w-5 h-5 text-green-500" />
          <span className="text-2xl font-bold text-white">${amount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-6">
        <div className="bg-white p-4 rounded-lg">
          <QRCodeSVG value={upiLink} size={200} />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-300">UPI ID:</span>
          <code className="bg-gray-700 px-3 py-1 rounded text-white">{upiId}</code>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Copy UPI ID"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={handlePaymentVerification}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            I've made the payment
          </button>
          <button
            onClick={onCancel}
            className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        </div>

        <p className="text-sm text-gray-400 text-center max-w-sm">
          Scan the QR code or copy the UPI ID to make the payment. After completing the transaction, click "I've made the payment" to verify.
        </p>
      </div>
    </div>
  );
}