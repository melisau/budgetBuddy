# BudgetBuddy - AI Destekli Bütçe Takip SaaS Uygulaması

BudgetBuddy, **Next.js, Supabase ve Clerk** altyapısını kullanan ve **AI destekli sesli/yazılı öneriler sunan** bir bütçe takip SaaS uygulamasıdır.  
Bu README, projeyi kuracak, çalıştıracak ve geliştirecek kişiler için detaylı rehber sunar.

---

## Table of Contents
1. [Proje Hakkında](#proje-hakkında)
2. [Temel Kavramlar](#temel-kavramlar)
3. [Teknoloji Yığını](#teknoloji-yığını)
4. [Kurulum ve Başlangıç](#kurulum-ve-başlangıç)
5. [Veritabanı Şeması](#veritabanı-şeması)
6. [İş Akışları](#iş-akışları)
7. [UI/UX İlkeleri](#uiux-ilkeleri)
8. [Cursor IDE Önerilen Ayarlar](#cursor-ide-önerilen-ayarlar)
9. [AI Modülleri](#ai-modülleri)
10. [8 Günlük Yol Haritası](#8-günlük-yol-haritası)
11. [Deployment & Operasyon](#deployment--operasyon)
12. [Katkı ve İletişim](#katkı-ve-iletişim)

---

## 1. Proje Hakkında

BudgetBuddy, kullanıcıların **gelir/giderlerini, bütçelerini ve hedeflerini tek bir noktadan yönetmelerini** sağlayan bir SaaS uygulamasıdır.  
Uygulama ayrıca **AI destekli öneriler ve sesli finans koçu** özellikleri ile finansal disiplin sağlamayı hedefler.

---

## 2. Temel Kavramlar

- **SaaS (Software as a Service):** Tarayıcı tabanlı, abonelik modeli ile çalışan yazılım.
- **MVP (Minimum Viable Product):** Hesap ekleme, gelir/gider kaydı, kategori yönetimi, aylık özet.
- **Premium Özellikler:** Çoklu cüzdan, AI öneri, gelişmiş raporlar, oyunlaştırma ligleri.
- **UI/UX Önemi:** Finans verisi yoğun ve hassas olduğundan, düşük bilişsel yük, erişilebilirlik ve mobil uyumluluk kritik.

---

## 3. Teknoloji Yığını

| Teknoloji | Kullanım |
|-----------|---------|
| **Next.js** | Performanslı, SEO dostu, App Router ve Server Actions |
| **TypeScript** | Tür güvenliği, hata azaltma |
| **Tailwind CSS** | Hızlı responsive UI geliştirme |
| **shadcn/ui** | Card, Dialog, Table, Tabs gibi erişilebilir UI bileşenleri |
| **Supabase** | PostgreSQL, gerçek zamanlı, Row-Level Security (RLS) ile kullanıcı güvenliği |
| **Clerk** | Kimlik doğrulama, kullanıcı yönetimi, plan/abonelik kontrolü |
| **Vapi / OpenAI** | AI tabanlı sesli ve yazılı finans koçu |
| **React Hook Form + Zod** | Form yönetimi ve şema tabanlı doğrulama |
| **Sentry** | Prod hata ve performans izleme |
| **JSMastery/utils** | URL parametreleri, filtreleme, debounce arama |

---

## 4. Kurulum ve Başlangıç

### 4.1 Sistem Gereksinimleri
- Node.js ≥ 20  
- npm veya pnpm  
- Git  

### 4.2 Proje Kurulumu
```bash
# Next.js + TypeScript projesi oluştur
npx create-next-app@latest budgetbuddy --ts

# Tailwind CSS kurulumu
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui bileşenleri ekle
npx shadcn-ui@latest add button table dialog sheet dropdown-menu

# React Hook Form + Zod
npm install react-hook-form zod @hookform/resolvers

# Clerk kurulumu
npm install @clerk/nextjs

# Supabase CLI
npm install -g supabase
supabase login
supabase init

# Sentry kurulumu
npm install @sentry/nextjs
