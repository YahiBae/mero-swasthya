export interface Hospital {
  id: number;
  name: string;
  location: string;
  city: string;
  image: string;
  rating: number;
  specialties: string[];
  beds: number;
  description: string;
  departments: string[];
  phone: string;
  email: string;
  established: number;
  doctorIds: number[];
}

export interface Clinic {
  id: number;
  name: string;
  location: string;
  city: string;
  image: string;
  rating: number;
  type: string;
  services: string[];
  description: string;
  workingHours: { day: string; time: string }[];
  phone: string;
  doctorIds: number[];
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  hospitalId: number;
  image: string;
  rating: number;
  experience: number;
  fee: number;
  city: string;
  description: string;
  qualifications: string[];
  availability: { day: string; slots: string[] }[];
  languages: string[];
}

export const hospitals: Hospital[] = [
  {
    id: 1, name: "Tribhuvan University Teaching Hospital", location: "Maharajgunj, Kathmandu", city: "Kathmandu",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=300&fit=crop", rating: 4.5,
    specialties: ["Cardiology", "Neurology", "Orthopedics"], beds: 450,
    description: "Tribhuvan University Teaching Hospital (TUTH) is one of the largest and most prestigious government hospitals in Nepal. Established as the teaching hospital of the Institute of Medicine, it provides comprehensive healthcare services and serves as a major referral center for patients across the country.",
    departments: ["Cardiology", "Neurology", "Orthopedics", "General Surgery", "Internal Medicine", "Pediatrics", "Gynecology", "Ophthalmology", "ENT", "Radiology"],
    phone: "+977-1-4412303", email: "info@tuth.edu.np", established: 1983, doctorIds: [2, 5]
  },
  {
    id: 2, name: "Grande International Hospital", location: "Dhapasi, Kathmandu", city: "Kathmandu",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop", rating: 4.7,
    specialties: ["Oncology", "Cardiology", "Gastroenterology"], beds: 300,
    description: "Grande International Hospital is a multi-specialty tertiary care hospital offering world-class healthcare services. With state-of-the-art facilities and internationally trained medical professionals, it is one of Nepal's leading private hospitals.",
    departments: ["Oncology", "Cardiology", "Gastroenterology", "Nephrology", "Urology", "Pulmonology", "Dermatology", "Psychiatry"],
    phone: "+977-1-5159266", email: "info@grandehospital.com", established: 2009, doctorIds: [1, 4]
  },
  {
    id: 3, name: "Norvic International Hospital", location: "Thapathali, Kathmandu", city: "Kathmandu",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop", rating: 4.3,
    specialties: ["Cardiac Surgery", "Neurosurgery", "Orthopedics"], beds: 200,
    description: "Norvic International Hospital is a premier healthcare institution known for its excellence in cardiac care and neurosurgery. The hospital features modern operating theaters and advanced diagnostic equipment.",
    departments: ["Cardiac Surgery", "Neurosurgery", "Orthopedics", "General Medicine", "Emergency Medicine", "Radiology"],
    phone: "+977-1-4258554", email: "info@norvic.com.np", established: 2001, doctorIds: [3]
  },
  {
    id: 4, name: "B&B Hospital", location: "Gwarko, Lalitpur", city: "Lalitpur",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop", rating: 4.4,
    specialties: ["ENT", "Dermatology", "Pediatrics"], beds: 250,
    description: "B&B Hospital is a leading multi-specialty hospital in Lalitpur offering comprehensive healthcare services. It combines modern medical technology with compassionate patient care.",
    departments: ["ENT", "Dermatology", "Pediatrics", "General Surgery", "Internal Medicine", "Ophthalmology", "Dental"],
    phone: "+977-1-5537119", email: "info@bnbhospital.com", established: 2007, doctorIds: [4]
  },
  {
    id: 5, name: "Bir Hospital", location: "Mahaboudha, Kathmandu", city: "Kathmandu",
    image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=400&h=300&fit=crop", rating: 4.1,
    specialties: ["General Surgery", "Internal Medicine", "Emergency"], beds: 500,
    description: "Bir Hospital is the oldest hospital in Nepal, established during the Rana regime. As a government hospital, it provides affordable healthcare to a large population and serves as a critical emergency and trauma center.",
    departments: ["General Surgery", "Internal Medicine", "Emergency Medicine", "Orthopedics", "Gynecology", "Anesthesiology"],
    phone: "+977-1-4221119", email: "info@birhospital.gov.np", established: 1889, doctorIds: [6]
  },
  {
    id: 6, name: "Patan Hospital", location: "Lagankhel, Lalitpur", city: "Lalitpur",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop", rating: 4.2,
    specialties: ["Gynecology", "Pediatrics", "Ophthalmology"], beds: 350,
    description: "Patan Hospital is a well-established government hospital known for its community health programs and quality maternity care. It serves as a major healthcare facility for the Lalitpur district.",
    departments: ["Gynecology", "Pediatrics", "Ophthalmology", "Internal Medicine", "Surgery", "Radiology", "Pathology"],
    phone: "+977-1-5522266", email: "info@patanhospital.gov.np", established: 1956, doctorIds: [5]
  },
];

export const clinics: Clinic[] = [
  {
    id: 1, name: "Nepal Mediciti Clinic", location: "Bhaisepati, Lalitpur", city: "Lalitpur",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop", rating: 4.6, type: "Multi-specialty",
    services: ["General Consultation", "Health Checkup", "Lab Tests", "Vaccination", "Minor Surgery"],
    description: "Nepal Mediciti Clinic offers comprehensive multi-specialty healthcare services with modern diagnostic facilities and experienced medical professionals.",
    workingHours: [
      { day: "Sunday - Friday", time: "8:00 AM - 8:00 PM" },
      { day: "Saturday", time: "9:00 AM - 2:00 PM" },
    ],
    phone: "+977-1-4217766", doctorIds: [1, 2]
  },
  {
    id: 2, name: "Hams Clinic", location: "Dhumbarahi, Kathmandu", city: "Kathmandu",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop", rating: 4.4, type: "General Practice",
    services: ["Family Medicine", "Preventive Care", "Chronic Disease Management", "Health Screening"],
    description: "Hams Clinic provides personalized general practice services focused on preventive care and chronic disease management in a comfortable setting.",
    workingHours: [
      { day: "Sunday - Friday", time: "7:00 AM - 7:00 PM" },
      { day: "Saturday", time: "8:00 AM - 1:00 PM" },
    ],
    phone: "+977-1-4370605", doctorIds: [5]
  },
  {
    id: 3, name: "Om Dental Clinic", location: "Putalisadak, Kathmandu", city: "Kathmandu",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop", rating: 4.8, type: "Dental",
    services: ["Dental Cleaning", "Root Canal", "Dental Implants", "Orthodontics", "Cosmetic Dentistry"],
    description: "Om Dental Clinic is a premier dental care center offering advanced dental treatments with state-of-the-art equipment and experienced dentists.",
    workingHours: [
      { day: "Sunday - Friday", time: "9:00 AM - 6:00 PM" },
      { day: "Saturday", time: "10:00 AM - 3:00 PM" },
    ],
    phone: "+977-1-4231234", doctorIds: []
  },
  {
    id: 4, name: "Skin Care Nepal", location: "Lazimpat, Kathmandu", city: "Kathmandu",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop", rating: 4.5, type: "Dermatology",
    services: ["Skin Consultation", "Acne Treatment", "Laser Therapy", "Hair Treatment", "Cosmetic Procedures"],
    description: "Skin Care Nepal specializes in dermatological treatments and cosmetic procedures, using the latest technology for optimal results.",
    workingHours: [
      { day: "Sunday - Friday", time: "10:00 AM - 5:00 PM" },
      { day: "Saturday", time: "Closed" },
    ],
    phone: "+977-1-4415678", doctorIds: [4]
  },
  {
    id: 5, name: "Nepal Eye Hospital Clinic", location: "Tripureshwor, Kathmandu", city: "Kathmandu",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop", rating: 4.3, type: "Ophthalmology",
    services: ["Eye Examination", "Cataract Surgery", "Glaucoma Treatment", "LASIK", "Contact Lens Fitting"],
    description: "Nepal Eye Hospital Clinic provides comprehensive eye care services including advanced surgical procedures and vision correction treatments.",
    workingHours: [
      { day: "Sunday - Friday", time: "8:00 AM - 4:00 PM" },
      { day: "Saturday", time: "9:00 AM - 12:00 PM" },
    ],
    phone: "+977-1-4261389", doctorIds: []
  },
  {
    id: 6, name: "PhysioNepal Clinic", location: "Baneshwor, Kathmandu", city: "Kathmandu",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop", rating: 4.7, type: "Physiotherapy",
    services: ["Sports Rehabilitation", "Post-Surgery Recovery", "Pain Management", "Manual Therapy", "Exercise Therapy"],
    description: "PhysioNepal Clinic is dedicated to physical rehabilitation and pain management, helping patients recover from injuries and surgeries effectively.",
    workingHours: [
      { day: "Sunday - Friday", time: "7:00 AM - 6:00 PM" },
      { day: "Saturday", time: "8:00 AM - 2:00 PM" },
    ],
    phone: "+977-1-4780123", doctorIds: [3]
  },
];

export const doctors: Doctor[] = [
  {
    id: 1, name: "Dr. Rajesh Sharma", specialty: "Cardiologist", hospital: "Grande International Hospital", hospitalId: 2,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face", rating: 4.9, experience: 15, fee: 1500, city: "Kathmandu",
    description: "Dr. Rajesh Sharma is a renowned cardiologist with over 15 years of experience in interventional cardiology and cardiac care. He has performed over 2,000 cardiac procedures and is known for his patient-centric approach.",
    qualifications: ["MBBS - IOM, TU", "MD Cardiology - BPKIHS", "Fellowship in Interventional Cardiology - India"],
    availability: [
      { day: "Sunday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
      { day: "Monday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
      { day: "Tuesday", slots: ["2:00 PM", "3:00 PM", "4:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM", "10:00 AM"] },
      { day: "Friday", slots: ["2:00 PM", "3:00 PM", "4:00 PM"] },
    ],
    languages: ["Nepali", "English", "Hindi"]
  },
  {
    id: 2, name: "Dr. Sunita Rai", specialty: "Neurologist", hospital: "Tribhuvan University Teaching Hospital", hospitalId: 1,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face", rating: 4.8, experience: 12, fee: 1200, city: "Kathmandu",
    description: "Dr. Sunita Rai is an expert neurologist specializing in stroke management, epilepsy, and neurodegenerative disorders. She is actively involved in neurological research.",
    qualifications: ["MBBS - IOM, TU", "MD Neurology - NAMS", "Training in Neurophysiology - UK"],
    availability: [
      { day: "Sunday", slots: ["10:00 AM", "11:00 AM", "2:00 PM"] },
      { day: "Monday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
      { day: "Friday", slots: ["2:00 PM", "3:00 PM"] },
    ],
    languages: ["Nepali", "English"]
  },
  {
    id: 3, name: "Dr. Anil Shrestha", specialty: "Orthopedic Surgeon", hospital: "Norvic International Hospital", hospitalId: 3,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face", rating: 4.7, experience: 18, fee: 2000, city: "Kathmandu",
    description: "Dr. Anil Shrestha is a highly experienced orthopedic surgeon specializing in joint replacements, sports injuries, and trauma surgery. He has extensive training from international institutions.",
    qualifications: ["MBBS - KU", "MS Orthopedics - IOM, TU", "Fellowship in Joint Replacement - South Korea"],
    availability: [
      { day: "Sunday", slots: ["9:00 AM", "10:00 AM"] },
      { day: "Tuesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
      { day: "Friday", slots: ["2:00 PM", "3:00 PM", "4:00 PM"] },
    ],
    languages: ["Nepali", "English", "Newari"]
  },
  {
    id: 4, name: "Dr. Priya Adhikari", specialty: "Dermatologist", hospital: "B&B Hospital", hospitalId: 4,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face", rating: 4.6, experience: 8, fee: 1000, city: "Lalitpur",
    description: "Dr. Priya Adhikari is a skilled dermatologist with expertise in both medical and cosmetic dermatology. She specializes in treating chronic skin conditions and performing laser treatments.",
    qualifications: ["MBBS - BPKIHS", "MD Dermatology - IOM, TU"],
    availability: [
      { day: "Sunday", slots: ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
      { day: "Monday", slots: ["10:00 AM", "11:00 AM"] },
      { day: "Wednesday", slots: ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
      { day: "Thursday", slots: ["10:00 AM", "11:00 AM"] },
      { day: "Friday", slots: ["2:00 PM", "3:00 PM"] },
    ],
    languages: ["Nepali", "English"]
  },
  {
    id: 5, name: "Dr. Bikash Thapa", specialty: "Pediatrician", hospital: "Patan Hospital", hospitalId: 6,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face", rating: 4.8, experience: 10, fee: 800, city: "Lalitpur",
    description: "Dr. Bikash Thapa is a compassionate pediatrician dedicated to children's health. He specializes in neonatal care, childhood infections, and developmental pediatrics.",
    qualifications: ["MBBS - IOM, TU", "MD Pediatrics - NAMS", "DCH - India"],
    availability: [
      { day: "Sunday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
      { day: "Monday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
      { day: "Tuesday", slots: ["2:00 PM", "3:00 PM", "4:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
      { day: "Thursday", slots: ["2:00 PM", "3:00 PM"] },
      { day: "Friday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"] },
    ],
    languages: ["Nepali", "English", "Maithili"]
  },
  {
    id: 6, name: "Dr. Manisha Gurung", specialty: "Gynecologist", hospital: "Bir Hospital", hospitalId: 5,
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face", rating: 4.5, experience: 14, fee: 1300, city: "Kathmandu",
    description: "Dr. Manisha Gurung is an experienced gynecologist and obstetrician providing comprehensive women's healthcare. She is skilled in high-risk pregnancies and minimally invasive gynecological surgeries.",
    qualifications: ["MBBS - KU", "MD Obstetrics & Gynecology - IOM, TU", "Training in Laparoscopic Surgery - Thailand"],
    availability: [
      { day: "Sunday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
      { day: "Monday", slots: ["2:00 PM", "3:00 PM", "4:00 PM"] },
      { day: "Tuesday", slots: ["9:00 AM", "10:00 AM"] },
      { day: "Wednesday", slots: ["2:00 PM", "3:00 PM", "4:00 PM"] },
      { day: "Friday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"] },
    ],
    languages: ["Nepali", "English", "Gurung"]
  },
];

export const specializations = [
  "Cardiology", "Neurology", "Orthopedics", "Dermatology", "Pediatrics",
  "Gynecology", "Oncology", "ENT", "Ophthalmology", "Dental",
  "General Surgery", "Internal Medicine", "Gastroenterology", "Psychiatry",
];

export const locations = [
  "Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Biratnagar",
];

export const allDepartments = [
  "Cardiology", "Neurology", "Orthopedics", "General Surgery", "Internal Medicine",
  "Pediatrics", "Gynecology", "Ophthalmology", "ENT", "Dermatology",
  "Oncology", "Gastroenterology", "Nephrology", "Urology", "Radiology",
  "Emergency Medicine", "Psychiatry", "Pulmonology", "Dental", "Anesthesiology",
];
