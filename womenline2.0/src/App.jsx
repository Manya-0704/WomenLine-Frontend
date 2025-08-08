import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { EmotionProvider } from "./contexts/EmotionContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import HealthData from "./pages/HealthData";
import ForgotPassword from "./pages/ForgotPassword";
import SafetyTutorial from "./components/SafetyTutorial";
import PeriodTracker from "./components/PeriodTracker";
import MentalWellnessTracker from "./components/MentalWellnessTracker";
import CoinHistory from "./components/CoinHistory";
import EnhancedCoinHistory from "./components/EnhancedCoinHistory";
import PDFGenerator from "./components/PDFGenerator";
import HealthSummaryPDF from "./components/HealthSummaryPDF";
import AppointmentInterface from "./components/AppointmentInterface";
import Leaderboard from "./components/Leaderboard";
import ChatbotPlayer from "./components/ChatbotPlayer";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <EmotionProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<ForgotPassword />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/health" element={
              <ProtectedRoute>
                <HealthData />
              </ProtectedRoute>
            } />
            <Route path="/safety-tutorials" element={<SafetyTutorial />} />
            <Route path="/period-tracker" element={
              <ProtectedRoute>
                <PeriodTracker />
              </ProtectedRoute>
            } />
            <Route path="/mental-wellness" element={
              <ProtectedRoute>
                <MentalWellnessTracker />
              </ProtectedRoute>
            } />
            <Route path="/coin-history" element={
              <ProtectedRoute>
                <CoinHistory />
              </ProtectedRoute>
            } />
            <Route path="/enhanced-coins" element={
              <ProtectedRoute>
                <EnhancedCoinHistory />
              </ProtectedRoute>
            } />
            <Route path="/pdf-generator" element={
              <ProtectedRoute>
                <PDFGenerator />
              </ProtectedRoute>
            } />
            <Route path="/health-summary" element={
              <ProtectedRoute>
                <HealthSummaryPDF />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <AppointmentInterface />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
          </Routes>
          <ChatbotPlayer />
        </Router>
      </EmotionProvider>
    </AuthProvider>
  );
}

export default App; 