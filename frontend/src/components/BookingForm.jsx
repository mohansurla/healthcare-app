import { useState } from "react";
import { CheckCircle, X, Clock } from "lucide-react";

export default function BookingForm({ doctor, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      return "⚠️ All fields are required!";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      return "⚠️ Please enter a valid email address!";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);
    if (selectedDate < today) {
      return "⚠️ Appointment date cannot be in the past!";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setMessage(error);
      return;
    }

    fetch("http://localhost:5000/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, doctorId: doctor.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2000);
        setFormData({ name: "", email: "", date: "", time: "" });
      })
      .catch(() => setMessage("❌ Something went wrong"));
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-fadeInScale max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
          <p className="text-gray-600 mt-1">with {doctor.name}</p>
          <p className="text-sm text-blue-600">{doctor.specialization}</p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Date
            </label>
            <input
              type="date"
              name="date"
              min={getMinDate()}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Clock className="inline mr-2" size={16} />
              Available Time Slots
            </label>
            <div className="grid grid-cols-3 gap-2">
              {doctor.timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`p-3 border rounded-lg text-sm font-medium transition ${
                    formData.time === slot
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  onClick={() => setFormData({ ...formData, time: slot })}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition font-medium"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn z-60">
          <CheckCircle size={20} />
          <div>
            <p className="font-medium">Appointment Confirmed!</p>
            <p className="text-sm opacity-90">You'll receive a confirmation email shortly.</p>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeInScale { animation: fadeInScale 0.25s ease-out; }
          .animate-slideIn { animation: slideIn 0.3s ease-out; }
        `}
      </style>
    </div>
  );
}