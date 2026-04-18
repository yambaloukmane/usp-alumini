/**
 * Data Service for USP-ALUMNI
 * This service abstracts data operations (Mebers, News, Jobs, Messages).
 * Currently uses localStorage but is structured for future API/DB integration.
 */

import { supabase } from './supabase';

export const dataService = {
  // Members & Auth
  getMembers: async () => {
    try {
      const { data, error } = await supabase.from('members').select('*');
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error("Fetch members failed", e);
      return [];
    }
  },
  
  saveMember: async (member: any) => {
    try {
      const { data, error } = await supabase
        .from('members')
        .upsert({
          email: member.email,
          password: member.password,
          first_name: member.firstName,
          last_name: member.lastName,
          phone: member.phone,
          promo: member.promo,
          job: member.job,
          sector: member.sector,
          city: member.city,
          country: member.country,
          bio: member.bio,
          avatar: member.avatar
        }, { onConflict: 'email' })
        .select();
      if (error) throw error;
      window.dispatchEvent(new Event("storage"));
      return data ? data[0] : null;
    } catch (e) {
      console.error("Save member failed", e);
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
      const { data, error } = await supabase.from('messages').select('*');
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
