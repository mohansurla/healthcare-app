import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";
import { ArrowLeft, MapPin, Clock, Award } from "lucide-react";

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((doc) => doc.id === parseInt(id));
        setDoctor(found);
      });
  }, [id]);

  if (!doctor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading doctor details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mb-6 font-medium hover:bg-blue-50 px-3 py-2 rounded-lg"
      >
        <ArrowLeft size={18} /> Back to Doctors
      </button>

      {/* Doctor Profile Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-40 relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-36 h-36 rounded-full border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 top-16 object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="pt-24 pb-8 px-8">
          {/* Doctor Info */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{doctor.name}</h1>
            <p className="text-xl text-blue-600 font-medium mb-4">{doctor.specialization}</p>

            {/* Availability Badge */}
            <span
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full ${
                doctor.available
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-600 border border-red-200"
              }`}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
              {doctor.available ? "Available for Appointments" : "Currently Unavailable"}
            </span>
          </div>

          

          {/* Available Time Slots Display */}
          {doctor.available && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Available Time Slots</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {doctor.timeSlots.map((slot) => (
                  <span
                    key={slot}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium border border-blue-200"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <button
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition shadow-lg ${
                doctor.available
                  ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl transform hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => setShowForm(true)}
              disabled={!doctor.available}
            >
              {doctor.available ? "📅 Book Appointment" : "❌ Not Accepting Bookings"}
            </button>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showForm && (
        <BookingForm
          doctor={doctor}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}