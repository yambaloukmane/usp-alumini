/**
 * Data Service for AEPS-ALUMNI
 * This service abstracts data operations (Mebers, News, Jobs, Messages).
 * Currently uses localStorage but is structured for future API/DB integration.
 */

import { supabase } from './supabase';

export const dataService = {
  // Members & Auth
  checkConnection: async () => {
    try {
      const { error } = await supabase.from('members').select('count', { count: 'exact', head: true });
      if (error) {
        console.error("Full Supabase Error:", error);
        if (error.message.includes('fetch')) {
          return "Erreur de connexion : L'URL Supabase est injoignable.";
        }
        return "Erreur API : " + (error.message || error.details || "Clé incorrecte ou accès refusé");
      }
      return "OK";
    } catch (e: any) {
      return "Erreur fatale : " + (e.message || "Problème réseau inconnu");
    }
  },

  getMembers: async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return (data || []).map(m => ({
        id: m.id,
        email: m.email,
        password: m.password,
        first_name: m.first_name,
        last_name: m.last_name,
        phone: m.phone,
        promo: m.promo,
        job: m.job,
        sector: m.sector,
        city: m.city,
        country: m.country,
        bio: m.bio,
        avatar: m.avatar,
        created_at: m.created_at
      }));
    } catch (e) {
      console.error("Fetch members failed", e);
      return [];
    }
  },
  
  saveMember: async (member: any) => {
    try {
      const payload: any = {
        email: member.email,
        first_name: member.first_name,
        last_name: member.last_name,
        phone: member.phone,
        promo: member.promo,
        job: member.job,
        sector: member.sector,
        city: member.city,
        country: member.country,
        bio: member.bio,
        avatar: member.avatar
      };

      if (member.password) {
        payload.password = member.password;
      }

      // Supprimer les clés dont la valeur est undefined
      Object.keys(payload).forEach(key => {
        if (payload[key] === undefined) {
          delete payload[key];
        }
      });

      let query;
      if (member.id) {
        // Pour une mise à jour, on utilise update sur l'ID
        query = supabase.from('members').update(payload).eq('id', member.id);
      } else if (member.email && !member.password) {
        // Si on a l'email mais pas de mot de passe, c'est forcément une mise à jour de profil existant
        query = supabase.from('members').update(payload).eq('email', member.email);
      } else {
        // Pour une création ou si on a tout, on utilise upsert sur l'email
        query = supabase.from('members').upsert(payload, { onConflict: 'email' });
      }

      const { data, error } = await query.select();
      
      if (error) {
        console.error("Supabase Save Error:", error);
        throw error;
      }
      
      const saved = data ? data[0] : null;
      if (saved) {
        return {
          id: saved.id,
          email: saved.email,
          first_name: saved.first_name,
          last_name: saved.last_name,
          phone: saved.phone,
          promo: saved.promo,
          job: saved.job,
          sector: saved.sector,
          city: saved.city,
          country: saved.country,
          bio: saved.bio,
          avatar: saved.avatar
        };
      }
      return null;
    } catch (e: any) {
      console.error("Save member failed", e);
      throw e;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();
      
      if (error) throw error;
      
      if (data) {
        const user = {
          id: data.id,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          promo: data.promo,
          job: data.job,
          sector: data.sector,
          city: data.city,
          country: data.country,
          bio: data.bio,
          avatar: data.avatar
        };
        dataService.setCurrentUser(user);
        return user;
      }
      return null;
    } catch (e) {
      console.error("Login failed", e);
      return null;
    }
  },

  getCurrentUser: () => {
    if (typeof window === "undefined") return null;
    try {
      const data = localStorage.getItem("usp_current_user");
      return (data && data !== "undefined") ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  setCurrentUser: (user: any) => {
    try {
      localStorage.setItem("usp_current_user", JSON.stringify(user));
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error("Set current user failed", e);
    }
  },

  logout: () => {
    localStorage.removeItem("usp_current_user");
    window.dispatchEvent(new Event("storage"));
  },

  deleteMember: async (id: string) => {
    try {
      if (!id) return;
      const { error } = await supabase.from('members').delete().eq('id', id);
      if (error) {
        alert("Erreur Supabase : " + error.message);
        throw error;
      }
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error("Delete member failed", e);
    }
  },

  // News
  getNews: async () => {
    try {
      const { data, error } = await supabase.from('news').select('*');
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error("Fetch news failed", e);
      return [];
    }
  },

  addNews: async (item: any) => {
    try {
      const { error } = await supabase.from('news').insert([item]);
      if (error) throw error;
    } catch (e) {
      console.error("Add news failed", e);
    }
  },

  deleteNews: async (id: string) => {
    try {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error("Delete news failed", e);
    }
  },

  // Jobs
  getJobs: async () => {
    try {
      const { data, error } = await supabase.from('jobs').select('*');
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error("Fetch jobs failed", e);
      return [];
    }
  },

  addJob: async (job: any) => {
    try {
      const { error } = await supabase.from('jobs').insert([job]);
      if (error) throw error;
    } catch (e) {
      console.error("Add job failed", e);
    }
  },

  deleteJob: async (id: string) => {
    try {
      const { error } = await supabase.from('jobs').delete().eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error("Delete job failed", e);
    }
  },

  // Messages
  getMessages: async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error("Fetch messages failed", e);
      return [];
    }
  },

  saveMessage: async (msg: any) => {
    try {
      const { error } = await supabase.from('messages').insert([{
        sender_id: msg.senderId,
        receiver_id: msg.receiverId,
        text: msg.text,
        time: msg.time,
        is_read: false
      }]);
      if (error) throw error;
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error("Save message failed", e);
    }
  },

  markAsRead: async (currentUserId: string, contactId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .match({ receiver_id: currentUserId, sender_id: contactId, is_read: false });
      if (error) throw error;
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error("Mark as read failed", e);
    }
  },

  getUnreadCount: async (userId: string) => {
    try {
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .match({ receiver_id: userId, is_read: false });
      if (error) throw error;
      return count || 0;
    } catch (e) {
      return 0;
    }
  },

  getConversation: async (user1: string, user2: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user1},receiver_id.eq.${user2}),and(sender_id.eq.${user2},receiver_id.eq.${user1})`)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data || []).map(m => ({
        id: m.id,
        senderId: m.sender_id,
        receiverId: m.receiver_id,
        text: m.text,
        time: m.time,
        isRead: m.is_read
      }));
    } catch (e) {
      console.error("Fetch conversation failed", e);
      return [];
    }
  }
};
