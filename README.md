# 🩺 Healthcare App

A modern healthcare application built with React and Node.js that allows patients to find doctors and book appointments.

## ✨ Features

- **Doctor Search**: Search doctors by name or specialization
- **Doctor Profiles**: View detailed doctor information
- **Appointment Booking**: Book appointments with available doctors
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Validation**: Form validation for appointment booking

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development server

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthcare-app.git
cd healthcare-app
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
healthcare-app/
├── backend/
│   ├── data/
│   │   └── doctors.json      # Sample doctor data
│   ├── package.json
│   └── server.js             # Express server
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── BookingForm.jsx
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   └── DoctorProfile.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 🔧 API Endpoints

### Backend API

- `GET /doctors` - Get all doctors
- `POST /appointments` - Book an appointment

### Frontend Routes

- `/` - Landing page with doctor search
- `/doctor/:id` - Individual doctor profile

## 🎨 Features in Detail

### Doctor Search
- Search by doctor name or specialization
- Real-time filtering
- Available/unavailable status display

### Appointment Booking
- Form validation
- Date and time selection
- Email validation
- Success notifications

## 🔄 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server with HMR
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

The backend serves the built frontend files in production.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- None currently reported

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

Made with ❤️ by [Your Name]
