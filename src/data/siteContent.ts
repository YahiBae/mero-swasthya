export interface DepartmentLabel {
  en: string;
  np: string;
  keywords: string[];
}

export const DEPARTMENT_CATALOG: DepartmentLabel[] = [
  { en: "General Practice", np: "साधारण तथा आकस्मिक चिकित्सा", keywords: ["general physician", "family medicine", "general medicine"] },
  { en: "Internal Medicine", np: "आन्तरिक चिकित्सा", keywords: ["internal medicine", "physician"] },
  { en: "Cardiology", np: "मुटुरोग सम्बन्धी", keywords: ["cardio", "cardiologist"] },
  { en: "Pediatrics", np: "बालरोग सेवा", keywords: ["pediatric", "child"] },
  { en: "Dermatology", np: "चर्मरोग", keywords: ["dermat", "skin"] },
  { en: "Orthopedics", np: "हाडजोर्नी सेवा", keywords: ["orthopedic", "bone", "joint"] },
  { en: "ENT", np: "नाक कान घाँटी", keywords: ["ent", "ear", "nose", "throat", "otolaryng"] },
  { en: "Neurology", np: "स्नायुशास्त्र", keywords: ["neuro", "neurolog"] },
  { en: "Oncology", np: "क्यान्सर सेवा", keywords: ["oncolog", "cancer"] },
  { en: "Gastroenterology", np: "पेट तथा कलेजो रोग", keywords: ["gastro", "liver", "digestive"] },
  { en: "Psychiatry", np: "मनोरोग", keywords: ["psychiat", "mental"] },
  { en: "Ophthalmology", np: "आँखा", keywords: ["ophthalm", "eye"] },
  { en: "Dental", np: "दन्त सेवा", keywords: ["dental", "dentist"] },
  { en: "Gynecology", np: "स्त्री तथा प्रसूति रोग", keywords: ["gyne", "obstetric"] },
];

export const BRAND_CONTACT = {
  location: "Pani Pokhari, Kathmandu Nepal",
  phones: ["+977-9801985751", "+977-9801985745", "+977-1-5970604"],
  email: "merodoctor.midas@gmail.com",
};

export const BRAND_SOCIALS = {
  facebook: "https://www.facebook.com/MidasTech.MeroDoctor",
  instagram: "https://www.instagram.com/mero.doctor/",
  youtube: "https://www.youtube.com/channel/UCFhzLlHq4KjSZPzG-TPYT_g",
};
