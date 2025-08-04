import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Award, Clock } from "lucide-react";

export default function LandingPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase()) ||
      doc.location.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
          Find Your Doctor 🩺
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          Search and book appointments with top specialists.
        </p>
      </div>

      {/* Search bar */}
      <div className="max-w-2xl mx-auto relative mb-12">
        <Search className="absolute left-4 top-4 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by doctor name, specialization, or location..."
          className="pl-12 pr-4 py-4 w-full border border-gray-200 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-bold text-blue-600">{doctors.length}</h3>
            <p className="text-gray-600">Total Doctors</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-bold text-green-600">{doctors.filter(d => d.available).length}</h3>
            <p className="text-gray-600">Available Now</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-bold text-purple-600">{new Set(doctors.map(d => d.specialization)).size}</h3>
            <p className="text-gray-600">Specializations</p>
          </div>
        </div>
      </div>

      {/* Doctor cards */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
          >
            {/* Doctor image and availability indicator */}
            <div className="relative p-6 text-center">
              <div className="relative inline-block">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
                />
                {/* Availability dot */}
                <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                  doc.available ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
              
              <h2 className="text-xl font-semibold mt-4 text-gray-800">{doc.name}</h2>
              <p className="text-blue-600 font-medium">{doc.specialization}</p>

              {/* Availability tag */}
              <span
                className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full ${
                  doc.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {doc.available ? "Available" : "Not Available"}
              </span>
            </div>

            {/* Doctor details */}
            <div className="px-6 pb-6 space-y-3">

              {/* Time slots */}
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2 text-purple-500" />
                <span>{doc.timeSlots.length} time slots available</span>
              </div>

              {/* Action button */}
              <div className="pt-4">
                <Link
                  to={`/doctor/${doc.id}`}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  View Profile & Book
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredDoctors.length === 0 && !loading && (
        <div className="text-center mt-16 p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or browse all available doctors.
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-16 py-8 border-t border-gray-200">
        <p className="text-gray-500">
          Need help? Contact our support team for assistance with booking appointments.
        </p>
      </div>
    </div>
  );
}