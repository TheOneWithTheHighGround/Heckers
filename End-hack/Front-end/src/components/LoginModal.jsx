import { useState, useEffect } from "react";

const ValidIDTypes = {
  AADHAAR: "aadhaar",
  PAN: "pan",
  VOTER_ID: "voter_id",
  DRIVING_LICENSE: "driving_license",
  RATION_CARD: "ration_card"
};

const validateID = (type, value) => {
  const patterns = {
    [ValidIDTypes.AADHAAR]: /^\d{12}$/,
    [ValidIDTypes.PAN]: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    [ValidIDTypes.VOTER_ID]: /^[A-Z]{3}\d{7}$/,
    [ValidIDTypes.DRIVING_LICENSE]: /^[A-Z]{2}\d{13}$/,
    [ValidIDTypes.RATION_CARD]: /^[A-Z0-9]{8,12}$/
  };
  return patterns[type]?.test(value) || false;
};

export default function EnhancedLoginModal({ onClose, onLoginSuccess }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [idType, setIdType] = useState(ValidIDTypes.AADHAAR);
  const [idNumber, setIdNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    // Save original body style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close modal if clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePhoneSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      if (phone.length !== 10) {
        throw new Error("Please enter a valid 10-digit phone number");
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async () => {
    setLoading(true);
    setError("");
    try {
      if (otp.length !== 6) {
        throw new Error("Please enter a valid 6-digit OTP");
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIDVerify = async () => {
    setLoading(true);
    setError("");
    try {
      if (!validateID(idType, idNumber)) {
        throw new Error("Please enter a valid ID number");
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Added onClick handler to backdrop and aria attributes
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Prevent click propagation to backdrop */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="mb-6">
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-1/3 h-2 rounded-full mx-1 ${
                  s <= step ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <h2 id="modal-title" className="text-xl font-bold mb-4">
            {step === 1 && "Phone Verification"}
            {step === 2 && "OTP Verification"}
            {step === 3 && "Government ID Verification"}
          </h2>

          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
              {error}
            </div>
          )}

          {step === 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter 10-digit number"
                maxLength={10}
              />
              <button
                onClick={handlePhoneSubmit}
                disabled={loading || phone.length !== 10}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="otp">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Change Number
                </button>
                <button
                  onClick={handlePhoneSubmit}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Resend OTP
                </button>
              </div>
              <button
                onClick={handleOTPVerify}
                disabled={loading || otp.length !== 6}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="id-type">
                Government ID Type
              </label>
              <select
                id="id-type"
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              >
                <option value={ValidIDTypes.AADHAAR}>Aadhaar Card</option>
                <option value={ValidIDTypes.PAN}>PAN Card</option>
                <option value={ValidIDTypes.VOTER_ID}>Voter ID</option>
                <option value={ValidIDTypes.DRIVING_LICENSE}>Driving License</option>
                <option value={ValidIDTypes.RATION_CARD}>Ration Card</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="id-number">
                ID Number
              </label>
              <input
                id="id-number"
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your ID number"
              />
              
              <div className="mt-2 text-sm text-gray-500">
                {idType === ValidIDTypes.AADHAAR && "12 digits"}
                {idType === ValidIDTypes.PAN && "10 characters (e.g., ABCDE1234F)"}
                {idType === ValidIDTypes.VOTER_ID && "10 characters (e.g., ABC1234567)"}
                {idType === ValidIDTypes.DRIVING_LICENSE && "15 characters"}
                {idType === ValidIDTypes.RATION_CARD && "8-12 characters"}
              </div>

              <button
                onClick={handleIDVerify}
                disabled={loading || !idNumber}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify ID"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
