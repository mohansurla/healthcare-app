import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react"; // Install lucide-react for nice icons

export default function LandingPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700">Find a Doctor 🩺</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Search and book appointments with top specialists.
        </p>
      </div>

      {/* Search bar */}
      <div className="max-w-xl mx-auto relative mb-10">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or specialization..."
          className="pl-12 pr-4 py-3 w-full border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-300 outline-none transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Doctor cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            {/* Doctor image */}
            <div className="p-6 text-center">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-md object-cover"
              />
              <h2 className="text-xl font-semibold mt-4 text-gray-800">{doc.name}</h2>
              <p className="text-gray-500">{doc.specialization}</p>

              {/* Availability tag */}
              <span
                className={`inline-block mt-3 px-4 py-1 text-sm font-medium rounded-full ${
                  doc.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {doc.available ? "Available" : "Not Available"}
              </span>

              {/* Action button */}
              <div className="mt-5">
                <Link
                  to={`/doctor/${doc.id}`}
                  className="inline-block w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredDoctors.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No doctors found matching your search.
        </p>
      )}
    </div>
  );
}
