import { getSupabaseClient, getSupabaseCredentials } from './supabase';
import { Database } from './database.types';
import { Review, TESTIMONIALS } from '../data/salonData';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  vipTier: 'Standard' | 'Silver' | 'Gold' | 'Rose Gold' | 'Royal Diamond';
  loyaltyPoints: number;
}

export interface AppointmentRecord {
  id: string;
  userId?: string | null;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: number;
  depositPaid: number;
  amenities: {
    champagne?: string;
    macaron?: string;
    scent?: string;
    acoustic?: string;
  };
  specialRequests?: string | null;
  createdAt: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  preferredDate?: string | null;
  message?: string | null;
  status: 'unread' | 'contacted' | 'resolved';
  createdAt: string;
}

// Complete Copy-Paste SQL Schema for Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- ==============================================================================
-- JESSA'S BEAUTY PARLOR & AESTHETICS — SUPABASE PRODUCTION DATABASE SCHEMA
-- Execute this script directly inside the Supabase SQL Editor
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create User Profiles Table (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  vip_tier TEXT DEFAULT 'Rose Gold' CHECK (vip_tier IN ('Standard', 'Silver', 'Gold', 'Rose Gold', 'Royal Diamond')),
  loyalty_points INTEGER DEFAULT 150,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to automatically create a profile when a new user signs up in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, vip_tier, loyalty_points)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Lady ' || split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'phone',
    'Rose Gold',
    150
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Create Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY DEFAULT ('JBP-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM()*9000 + 1000)::TEXT, 4, '0')),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  stylist_id TEXT NOT NULL,
  stylist_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  total_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  deposit_paid NUMERIC(10,2) NOT NULL DEFAULT 100,
  amenities JSONB DEFAULT '{}'::jsonb,
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for appointment lookup by date and guest email
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_guest_email ON public.appointments(guest_email);

-- Enable RLS on appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert an appointment (Guests & Authenticated)"
  ON public.appointments FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own appointments or matching guest email"
  ON public.appointments FOR SELECT 
  USING (
    auth.uid() = user_id 
    OR guest_email = (SELECT email FROM public.profiles WHERE id = auth.uid())
    OR auth.role() = 'anon'
  );

CREATE POLICY "Users can update their appointments"
  ON public.appointments FOR UPDATE 
  USING (auth.uid() = user_id OR auth.role() = 'anon');

-- 4. Create Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_role TEXT DEFAULT 'VIP Patron • Verified',
  service_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by all"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Anyone can submit a review"
  ON public.reviews FOR INSERT WITH CHECK (true);

-- 5. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_name TEXT NOT NULL,
  preferred_date DATE,
  message TEXT,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'contacted', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert concierge inquiries"
  ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Inquiries viewable by service role or anon insert"
  ON public.inquiries FOR SELECT USING (true);

-- 6. Initial Seed Data for Reviews
INSERT INTO public.reviews (author_name, author_role, service_name, rating, content, verified)
VALUES 
  ('Lady Evelyn Ward', 'Bridal Suite Patron • Verified', 'Royal Bridal Glamour Suite', 5, 'Jessa and her elite team styled my wedding day. From the private champagne suite to the zero-crease airbrush makeup, I felt regal throughout our 14-hour celebration.', true),
  ('Camilla Sterling', 'Creative Director • Verified', '24K Gold Cellular Renewal', 5, 'The Advanced 24K Gold Glow Facial cured my skin fatigue completely before London Fashion Week. The sterile standard is unmatched, and the botanical oils are heavenly.', true),
  ('Natasha Rossi', 'VIP Club Member • Verified', 'Signature Balayage & Silk Gloss', 5, 'Their precision Balayage gave my brunette locks dimension without stripping health. You aren’t just getting a service; you are treated like royalty from the moment you step into the Mayfair suite.', true)
ON CONFLICT DO NOTHING;
`;

// Local Storage keys for offline / fallback persistence
const LOCAL_STORAGE_APPTS_KEY = 'jessa_appointments_db';
const LOCAL_STORAGE_REVIEWS_KEY = 'jessa_reviews_db';
const LOCAL_STORAGE_INQUIRIES_KEY = 'jessa_inquiries_db';

// Fallback initial appointments
const INITIAL_DEMO_APPOINTMENTS: AppointmentRecord[] = [
  {
    id: 'JBP-2025-4192',
    guestName: 'Lady Katherine Holmes',
    guestEmail: 'lady.katherine@mayfair.co.uk',
    guestPhone: '+44 7700 900888',
    serviceId: 'royal-bridal-glamour-suite',
    serviceName: 'Royal Bridal Glamour Suite',
    stylistId: 'jessa-vance',
    stylistName: 'Jessa Vance (Founder & Master)',
    appointmentDate: '2025-06-14',
    appointmentTime: '10:00 AM',
    status: 'confirmed',
    totalPrice: 350,
    depositPaid: 100,
    amenities: {
      champagne: 'Laurent-Perrier Brut Champagne',
      macaron: 'Rose Petal & Gold Leaf',
      scent: 'Neroli & Royal Jasmine',
      acoustic: 'Chamber Strings Baroque',
    },
    specialRequests: 'Veil attachment assistance and extra hairpins.',
    createdAt: new Date().toISOString(),
  },
];

export const BackendService = {
  // Check if live Supabase is active
  isSupabaseLive(): boolean {
    const { isConfigured } = getSupabaseCredentials();
    return isConfigured && Boolean(getSupabaseClient());
  },

  // --------------------------------------------------------------------------
  // AUTHENTICATION
  // --------------------------------------------------------------------------
  async signUp(email: string, password: string, fullName: string, phone?: string) {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || '',
          },
        },
      });
      if (error) throw error;
      return data;
    } else {
      // Mock signup in local storage
      const user = {
        id: `mock-user-${Date.now()}`,
        email,
        fullName,
        phone: phone || '',
        vipTier: 'Rose Gold' as const,
        loyaltyPoints: 150,
      };
      localStorage.setItem('jessa_mock_user', JSON.stringify(user));
      return { user };
    }
  },

  async signIn(email: string, password: string) {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      // Mock login
      const stored = localStorage.getItem('jessa_mock_user');
      const user = stored ? JSON.parse(stored) : {
        id: 'mock-user-1',
        email,
        fullName: 'Lady Katherine Holmes',
        phone: '+44 7700 900888',
        vipTier: 'Rose Gold' as const,
        loyaltyPoints: 150,
      };
      localStorage.setItem('jessa_mock_user', JSON.stringify(user));
      return { user };
    }
  },

  async signOut() {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('jessa_mock_user');
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Query profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return {
        id: user.id,
        email: user.email || '',
        fullName: profile?.full_name || user.user_metadata?.full_name || 'VIP Patron',
        phone: profile?.phone || '',
        vipTier: (profile?.vip_tier as any) || 'Rose Gold',
        loyaltyPoints: profile?.loyalty_points || 150,
      };
    } else {
      const stored = localStorage.getItem('jessa_mock_user');
      if (stored) {
        return JSON.parse(stored);
      }
      return {
        id: 'demo-patron-1',
        email: 'lady.katherine@mayfair.co.uk',
        fullName: 'Lady Katherine Holmes',
        phone: '+44 7700 900888',
        vipTier: 'Rose Gold',
        loyaltyPoints: 150,
      };
    }
  },

  // --------------------------------------------------------------------------
  // APPOINTMENTS CRUD
  // --------------------------------------------------------------------------
  async createAppointment(data: Omit<AppointmentRecord, 'id' | 'createdAt'>): Promise<AppointmentRecord> {
    const generatedId = `JBP-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: AppointmentRecord = {
      ...data,
      id: generatedId,
      createdAt: new Date().toISOString(),
    };

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data: inserted, error } = await supabase
          .from('appointments')
          .insert({
            id: newRecord.id,
            user_id: newRecord.userId || null,
            guest_name: newRecord.guestName,
            guest_email: newRecord.guestEmail,
            guest_phone: newRecord.guestPhone,
            service_id: newRecord.serviceId,
            service_name: newRecord.serviceName,
            stylist_id: newRecord.stylistId,
            stylist_name: newRecord.stylistName,
            appointment_date: newRecord.appointmentDate,
            appointment_time: newRecord.appointmentTime,
            status: newRecord.status,
            total_price: newRecord.totalPrice,
            deposit_paid: newRecord.depositPaid,
            amenities: newRecord.amenities as any,
            special_requests: newRecord.specialRequests,
          })
          .select()
          .single();

        if (!error && inserted) {
          // Also sync to local backup
          this.saveLocalAppointment(newRecord);
          return newRecord;
        }
      } catch (err) {
        console.warn('Supabase insert failed, saving to local repository:', err);
      }
    }

    // Local fallback
    this.saveLocalAppointment(newRecord);
    return newRecord;
  },

  async getAppointments(userEmail?: string): Promise<AppointmentRecord[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        let query = supabase.from('appointments').select('*').order('created_at', { ascending: false });
        if (userEmail) {
          query = query.eq('guest_email', userEmail);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            userId: item.user_id,
            guestName: item.guest_name,
            guestEmail: item.guest_email,
            guestPhone: item.guest_phone,
            serviceId: item.service_id,
            serviceName: item.service_name,
            stylistId: item.stylist_id,
            stylistName: item.stylist_name,
            appointmentDate: item.appointment_date,
            appointmentTime: item.appointment_time,
            status: item.status,
            totalPrice: Number(item.total_price),
            depositPaid: Number(item.deposit_paid),
            amenities: item.amenities || {},
            specialRequests: item.special_requests,
            createdAt: item.created_at,
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, using local store:', err);
      }
    }

    return this.getLocalAppointments(userEmail);
  },

  async updateAppointmentStatus(id: string, status: AppointmentRecord['status']) {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase
          .from('appointments')
          .update({ status })
          .eq('id', id);
      } catch (e) {
        // ignore
      }
    }

    // Update local store
    const local = this.getLocalAppointments();
    const updated = local.map((a) => (a.id === id ? { ...a, status } : a));
    localStorage.setItem(LOCAL_STORAGE_APPTS_KEY, JSON.stringify(updated));
  },

  // Local storage helpers for appointments
  getLocalAppointments(userEmail?: string): AppointmentRecord[] {
    if (typeof window === 'undefined') return INITIAL_DEMO_APPOINTMENTS;
    const stored = localStorage.getItem(LOCAL_STORAGE_APPTS_KEY);
    const list: AppointmentRecord[] = stored ? JSON.parse(stored) : INITIAL_DEMO_APPOINTMENTS;
    if (userEmail) {
      return list.filter((a) => a.guestEmail.toLowerCase() === userEmail.toLowerCase());
    }
    return list;
  },

  saveLocalAppointment(appt: AppointmentRecord) {
    const current = this.getLocalAppointments();
    const updated = [appt, ...current.filter((c) => c.id !== appt.id)];
    localStorage.setItem(LOCAL_STORAGE_APPTS_KEY, JSON.stringify(updated));
  },

  // --------------------------------------------------------------------------
  // REVIEWS CRUD
  // --------------------------------------------------------------------------
  async getReviews(): Promise<Review[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((r: any) => ({
            id: r.id,
            author: r.author_name,
            role: r.author_role || 'VIP Patron • Verified',
            rating: r.rating,
            date: new Date(r.created_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
            service: r.service_name,
            content: r.content,
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi7KRME3aib-yQZEEISF0ESj1j6TYdhpzXCE892_QlTI1BZW8FP8jvfHyNU1uPzhfQoh5ouNhWjxZaYLdhLI1XbRzNf5MlCW7jJMZ4isb5Bn_pMIdK_Y1B7yymzQ3-7SRkDef764Lc59bfMnPR8gowxO85rjPP0_4cdFMf59O529t03BcVxe8nWMa5LDMVG1z_syDVh_ckREEAL-qqHh-6tsRXQmYG2mq_sJrKfMD84fzBtnDIM1Ie',
            verified: r.verified ?? true,
          }));
        }
      } catch (err) {
        console.warn('Reviews fetch fallback:', err);
      }
    }

    const stored = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY) : null;
    return stored ? JSON.parse(stored) : TESTIMONIALS;
  },

  async createReview(review: Omit<Review, 'id' | 'date'>): Promise<Review> {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just Now',
    };

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('reviews').insert({
          author_name: review.author,
          author_role: review.role,
          service_name: review.service,
          rating: review.rating,
          content: review.content,
          verified: review.verified,
        });
      } catch (err) {
        console.warn('Supabase review insert failed:', err);
      }
    }

    // Local update
    const current = await this.getReviews();
    const updated = [newRev, ...current];
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(updated));
    }
    return newRev;
  },

  // --------------------------------------------------------------------------
  // CONCIERGE INQUIRIES CRUD
  // --------------------------------------------------------------------------
  async createInquiry(inquiry: Omit<InquiryRecord, 'id' | 'status' | 'createdAt'>): Promise<InquiryRecord> {
    const newInquiry: InquiryRecord = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('inquiries').insert({
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          service_name: inquiry.serviceName,
          preferred_date: inquiry.preferredDate ? inquiry.preferredDate : null,
          message: inquiry.message || null,
          status: 'unread',
        });
      } catch (e) {
        console.warn('Supabase inquiry insert failed:', e);
      }
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
      const list = stored ? JSON.parse(stored) : [];
      localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify([newInquiry, ...list]));
    }

    return newInquiry;
  },
};
