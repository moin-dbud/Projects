import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User, LoginCredentials, SignUpCredentials, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
}

// This is a simplified auth store for the MVP
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;
      await get().getUser();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (credentials: SignUpCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            first_name: credentials.firstName,
            last_name: credentials.lastName,
            role: credentials.role,
          },
        },
      });

      if (error) throw error;
      
      // In a real app, we would handle email verification and role assignment
      // For this MVP, we'll assume the user is immediately registered
      await get().getUser();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  getUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // For MVP, we'll use auth metadata directly
        // In a production app, you'd fetch more details from your user table
        const userData: User = {
          id: user.id,
          email: user.email!,
          firstName: user.user_metadata.first_name || 'User',
          lastName: user.user_metadata.last_name || '',
          role: (user.user_metadata.role as UserRole) || 'student',
          createdAt: user.created_at,
        };
        set({ user: userData });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));