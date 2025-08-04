import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";
import { ArrowLeft } from "lucide-react"; // Icon for back button

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
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading doctor details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mb-6 font-medium"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Doctor Profile Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-32 relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 top-12 object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="pt-20 pb-8 px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{doctor.name}</h2>
          <p className="text-gray-500 mt-1">{doctor.specialization}</p>

          {/* Availability Badge */}
          <span
            className={`inline-block mt-3 px-4 py-1 text-sm font-medium rounded-full ${
              doctor.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {doctor.available ? "Available for Appointments" : "Currently Unavailable"}
          </span>

          {/* Action Button */}
          <div className="mt-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg shadow-md font-medium"
              onClick={() => setShowForm(true)}
              disabled={!doctor.available}
            >
              {doctor.available ? "Book Appointment" : "Not Accepting Bookings"}
            </button>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showForm && (
        <BookingForm
          doctorId={doctor.id}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
