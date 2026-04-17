/**
 * Data Service for USP-ALIMNI
 * This service abstracts data operations (Mebers, News, Jobs, Messages).
 * Currently uses localStorage but is structured for future API/DB integration.
 */

export const dataService = {
  // Members & Auth
  getMembers: () => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem("usp_members");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
  
  saveMember: (member: any) => {
    try {
      const members = dataService.getMembers();
      const existingIndex = members.findIndex((m: any) => m.email === member.email);
      if (existingIndex > -1) {
        members[existingIndex] = { ...members[existingIndex], ...member };
      } else {
        members.push(member);
      }
      localStorage.setItem("usp_members", JSON.stringify(members));
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error("Save member failed", e);
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

  // News
  getNews: () => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem("usp_news");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addNews: (item: any) => {
    const news = dataService.getNews();
    const updated = [item, ...news];
    localStorage.setItem("usp_news", JSON.stringify(updated));
  },

  // Jobs
  getJobs: () => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem("usp_jobs");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addJob: (job: any) => {
    const jobs = dataService.getJobs();
    const updated = [job, ...jobs];
    localStorage.setItem("usp_jobs", JSON.stringify(updated));
  },

  // Messages
  getMessages: () => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem("usp_messages");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveMessage: (msg: any) => {
    try {
      const messages = dataService.getMessages();
      messages.push({ ...msg, isRead: false });
      localStorage.setItem("usp_messages", JSON.stringify(messages));
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error("Save message failed", e);
    }
  },

  markAsRead: (currentUserId: string, contactId: string) => {
    try {
      const messages = dataService.getMessages();
      let hasChanged = false;
      const updated = messages.map((m: any) => {
        if (m.senderId === contactId && m.receiverId === currentUserId && !m.isRead) {
          hasChanged = true;
          return { ...m, isRead: true };
        }
        return m;
      });
      if (hasChanged) {
        localStorage.setItem("usp_messages", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (e) {
      console.error("Mark as read failed", e);
    }
  },

  getUnreadCount: (userId: string) => {
    const messages = dataService.getMessages();
    return messages.filter((m: any) => m.receiverId === userId && !m.isRead).length;
  },

  getConversation: (user1: string, user2: string) => {
    const messages = dataService.getMessages();
    return messages.filter((m: any) => 
      (m.senderId === user1 && m.receiverId === user2) ||
      (m.senderId === user2 && m.receiverId === user1)
    );
  }
};
