# Configuration de la base de données Supabase

Pour faire fonctionner la base de données réelle, suivez ces étapes :

## 1. Créer un projet Supabase
Allez sur [supabase.com](https://supabase.com/) et créez un nouveau projet.

## 2. Configurer les clés
Copiez votre **Project URL** et votre **Anon Key** dans le fichier `.env.local` à la racine du projet :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_ici
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_ici
```

## 3. Créer les tables (SQL Editor)
Copiez et collez ce code dans le "SQL Editor" de votre tableau de bord Supabase et cliquez sur **Run** :

```sql
-- Table des membres
CREATE TABLE IF NOT EXISTS members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  first_name text,
  last_name text,
  phone text,
  promo text,
  job text,
  sector text,
  city text,
  country text,
  bio text,
  avatar text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des messages
CREATE TABLE IF NOT EXISTS messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id text NOT NULL,
  receiver_id text NOT NULL,
  text text NOT NULL,
  time text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des actualités
CREATE TABLE IF NOT EXISTS news (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  date text NOT NULL,
  "desc" text NOT NULL,
  img text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des emplois
CREATE TABLE IF NOT EXISTS jobs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  salary text,
  type text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activer Row Level Security (RLS) - Optionnel pour le moment si vous voulez tester vite
-- Mais recommandé pour la production.
```
