export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface SiteSettings {
  shopName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  businessHours: BusinessHours[];
  socialLinks: { platform: string; url: string }[];
}
