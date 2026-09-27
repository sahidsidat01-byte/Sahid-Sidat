export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          vip_tier: 'Standard' | 'Silver' | 'Gold' | 'Rose Gold' | 'Royal Diamond';
          loyalty_points: number;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          vip_tier?: 'Standard' | 'Silver' | 'Gold' | 'Rose Gold' | 'Royal Diamond';
          loyalty_points?: number;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          vip_tier?: 'Standard' | 'Silver' | 'Gold' | 'Rose Gold' | 'Royal Diamond';
          loyalty_points?: number;
          updated_at?: string | null;
        };
      };
      appointments: {
        Row: {
          id: string;
          user_id: string | null;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          service_id: string;
          service_name: string;
          stylist_id: string;
          stylist_name: string;
          appointment_date: string;
          appointment_time: string;
          status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
          total_price: number;
          deposit_paid: number;
          amenities: Json;
          special_requests: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          service_id: string;
          service_name: string;
          stylist_id: string;
          stylist_name: string;
          appointment_date: string;
          appointment_time: string;
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
          total_price: number;
          deposit_paid: number;
          amenities?: Json;
          special_requests?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          guest_name?: string;
          guest_email?: string;
          guest_phone?: string;
          service_id?: string;
          service_name?: string;
          stylist_id?: string;
          stylist_name?: string;
          appointment_date?: string;
          appointment_time?: string;
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
          total_price?: number;
          deposit_paid?: number;
          amenities?: Json;
          special_requests?: string | null;
          updated_at?: string | null;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string | null;
          author_name: string;
          author_role: string;
          service_name: string;
          rating: number;
          content: string;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          author_name: string;
          author_role?: string;
          service_name: string;
          rating: number;
          content: string;
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          author_name?: string;
          author_role?: string;
          service_name?: string;
          rating?: number;
          content?: string;
          verified?: boolean;
        };
      };
      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          service_name: string;
          preferred_date: string | null;
          message: string | null;
          status: 'unread' | 'contacted' | 'resolved';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          service_name: string;
          preferred_date?: string | null;
          message?: string | null;
          status?: 'unread' | 'contacted' | 'resolved';
          created_at?: string;
        };
        Update: {
          status?: 'unread' | 'contacted' | 'resolved';
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
