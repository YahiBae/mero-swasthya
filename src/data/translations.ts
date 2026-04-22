import type { AppLanguage } from "@/contexts/LanguageContext";

interface AppTranslations {
  nav: {
    home: string;
    services: string;
    hospitals: string;
    clinics: string;
    doctors: string;
    departments: string;
    emergency: string;
    diagnostics: string;
    dashboard: string;
    login: string;
    register: string;
    logout: string;
    languageSwitch: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroDescription: string;
    selectDepartment: string;
    findDoctor: string;
    quickSearchTitle: string;
    quickSearchDescription: string;
    startBooking: string;
  };
}

export const translations: Record<AppLanguage, AppTranslations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      hospitals: "Hospitals",
      clinics: "Clinics",
      doctors: "Doctors",
      departments: "Departments",
      emergency: "Emergency",
      diagnostics: "Diagnostics",
      dashboard: "Dashboard",
      login: "Login",
      register: "Register",
      logout: "Logout",
      languageSwitch: "EN / NP",
    },
    home: {
      heroBadge: "Nepal Healthcare Booking Platform",
      heroTitle: "Hospital Appointment in Minutes, Not Days",
      heroDescription: "Search departments, pick available doctors, confirm your slot, and track every appointment from one dashboard.",
      selectDepartment: "Select Department",
      findDoctor: "Find Doctor",
      quickSearchTitle: "Quick Search",
      quickSearchDescription: "Pick your location and specialization to begin.",
      startBooking: "Start Booking",
    },
  },
  np: {
    nav: {
      home: "होम",
      services: "सेवाहरू",
      hospitals: "अस्पतालहरू",
      clinics: "क्लिनिकहरू",
      doctors: "डाक्टरहरू",
      departments: "विभागहरू",
      emergency: "आपतकालीन",
      diagnostics: "डायग्नोस्टिक्स",
      dashboard: "ड्यासबोर्ड",
      login: "लगइन",
      register: "दर्ता",
      logout: "लगआउट",
      languageSwitch: "EN / NP",
    },
    home: {
      heroBadge: "नेपाल स्वास्थ्य बुकिङ प्लेटफर्म",
      heroTitle: "दिन होइन, मिनेटमै अस्पताल अपोइन्टमेन्ट",
      heroDescription: "विभाग खोज्नुहोस्, उपलब्ध डाक्टर छान्नुहोस्, समय पुष्टि गर्नुहोस् र सबै अपोइन्टमेन्ट एउटै ड्यासबोर्डबाट ट्र्याक गर्नुहोस्।",
      selectDepartment: "विभाग छान्नुहोस्",
      findDoctor: "डाक्टर खोज्नुहोस्",
      quickSearchTitle: "छिटो खोज",
      quickSearchDescription: "सुरु गर्न आफ्नो स्थान र विशेषज्ञता छान्नुहोस्।",
      startBooking: "बुकिङ सुरु गर्नुहोस्",
    },
  },
};
