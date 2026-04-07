import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Hospitals from "./pages/Hospitals";
import Clinics from "./pages/Clinics";
import Doctors from "./pages/Doctors";
import Departments from "./pages/Departments";
import EmergencyService from "./pages/EmergencyService";
import Diagnostics from "./pages/Diagnostics";
import HospitalDetails from "./pages/HospitalDetails";
import ClinicDetails from "./pages/ClinicDetails";
import DoctorDetails from "./pages/DoctorDetails";
import PatientDashboard from "./pages/PatientDashboard";
import PatientAppointments from "./pages/PatientAppointments";
import ProfilePage from "./pages/ProfilePage";
import ProviderDashboard from "./pages/ProviderDashboard";
import ProviderAppointments from "./pages/ProviderAppointments";
import ProviderSchedule from "./pages/ProviderSchedule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/hospitals/:id" element={<HospitalDetails />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/clinics/:id" element={<ClinicDetails />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/emergency" element={<EmergencyService />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          {/* Patient Dashboard */}
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/dashboard/appointments" element={<PatientAppointments />} />
          <Route path="/dashboard/profile" element={<ProfilePage role="patient" />} />
          {/* Provider Dashboard */}
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/provider/appointments" element={<ProviderAppointments />} />
          <Route path="/provider/schedule" element={<ProviderSchedule />} />
          <Route path="/provider/profile" element={<ProfilePage role="provider" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
