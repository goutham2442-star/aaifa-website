-- ============================================================
-- AAIFA DATABASE — Complete Schema + Seed Data
-- Run in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: programs
-- ============================================================
CREATE TABLE IF NOT EXISTS programs (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  subtitle         TEXT,
  description      TEXT NOT NULL,
  long_description TEXT,
  min_age          TEXT,
  duration         TEXT,
  mode             TEXT CHECK (mode IN ('offline','online','hybrid')) DEFAULT 'offline',
  icon             TEXT,
  image_url        TEXT,
  highlights       TEXT[],
  levels           JSONB,
  is_featured      BOOLEAN DEFAULT false,
  sort_order       INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: gallery_images
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title        TEXT,
  description  TEXT,
  url          TEXT NOT NULL,
  storage_path TEXT NOT NULL DEFAULT '',
  category     TEXT CHECK (category IN ('performances','events','classes','awards','general')) DEFAULT 'general',
  alt_text     TEXT,
  is_featured  BOOLEAN DEFAULT false,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_role TEXT DEFAULT 'Parent of Student',
  content     TEXT NOT NULL,
  rating      INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  program     TEXT,
  avatar_url  TEXT,
  is_featured BOOLEAN DEFAULT true,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: inquiries (contact form submissions)
-- ============================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name         TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT,
  subject           TEXT,
  message           TEXT NOT NULL,
  preferred_program TEXT,
  inquiry_type      TEXT CHECK (inquiry_type IN ('general','enrollment','collaboration','media')) DEFAULT 'general',
  status            TEXT CHECK (status IN ('new','read','replied','archived')) DEFAULT 'new',
  ip_address        TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: newsletter_subscribers
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  name          TEXT,
  is_active     BOOLEAN DEFAULT true,
  source        TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: events
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT,
  event_date   DATE NOT NULL,
  event_time   TEXT,
  location     TEXT,
  image_url    TEXT,
  type         TEXT CHECK (type IN ('performance','workshop','exam','arangetram','festival')) DEFAULT 'performance',
  is_published BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: awards
-- ============================================================
CREATE TABLE IF NOT EXISTS awards (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title       TEXT NOT NULL,
  year        INTEGER,
  description TEXT,
  image_url   TEXT,
  recipient   TEXT DEFAULT 'Guru Smt. Haripriya Pettem',
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE programs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images       ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials         ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries            ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events               ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards               ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read programs"     ON programs         FOR SELECT USING (true);
CREATE POLICY "Public can read gallery"      ON gallery_images   FOR SELECT USING (true);
CREATE POLICY "Public can read testimonials" ON testimonials     FOR SELECT USING (true);
CREATE POLICY "Public can read events"       ON events           FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read awards"       ON awards           FOR SELECT USING (true);

-- Public write policies (contact forms)
CREATE POLICY "Public can insert inquiries"  ON inquiries        FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Admin policies (authenticated users)
CREATE POLICY "Admin full programs"    ON programs          FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full gallery"     ON gallery_images    FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full testimonials"ON testimonials      FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read inquiries"   ON inquiries         FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update inquiries" ON inquiries         FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full events"      ON events            FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full awards"      ON awards            FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read newsletter"  ON newsletter_subscribers FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- SUPABASE STORAGE BUCKET
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated can upload gallery"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete gallery"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA — Programs
-- ============================================================
INSERT INTO programs (slug, title, subtitle, description, long_description, min_age, mode, icon, is_featured, sort_order, highlights)
VALUES
(
  'bharatanatyam',
  'Bharatanatyam',
  'Classical Dance of South India',
  'A deeply expressive and disciplined art form rooted in tradition. Students receive structured training in adavus, mudras, abhinaya, margam, and advanced choreography. Suitable for beginners as well as advanced learners.',
  'Bharatanatyam is one of the oldest and most revered classical dance forms of India, originating from Tamil Nadu. At Avighna Abhyasa, students are trained under the guidance of Guru Smt. Haripriya Pettem who brings over 16 years of experience. The curriculum follows a systematic progression from fundamental adavus to complete margam presentation and arangetram. Regular assessments, performance workshops, and stage opportunities ensure holistic development of every student.',
  '6+',
  'hybrid',
  'Drama',
  true,
  1,
  ARRAY['Adavus & Footwork','Mudras & Expressions','Margam Choreography','Abhinaya Training','Arangetram Support','Online Classes Available']
),
(
  'carnatic-music',
  'Carnatic Music',
  'South Indian Classical Vocal',
  'Vocal training rooted in South Indian tradition. Students are nurtured in ragas, talas, varnams and kritis, helping them develop voice control, rhythm, and emotional depth. Theory and practical sessions provided.',
  'Carnatic music is the classical music tradition of South India, rich in melodic structures (ragas) and rhythmic cycles (talas). Our vocal program nurtures students from foundational swara practice through advanced concert repertoire. Emphasis is placed on pitch accuracy, voice development, and musical sensitivity. Students are prepared for both certification exams and public performances.',
  'All ages',
  'hybrid',
  'Music',
  true,
  2,
  ARRAY['Swara Foundation','Raga Training','Tala & Rhythm','Varnams & Kritis','Concert Readiness','Online Classes Available']
),
(
  'mridangam',
  'Mridangam',
  'Classical Percussion',
  'Students are trained in the ancient percussion art of Mridangam under systematic guidance, focusing on rhythm patterns, korvais, eduppu, tempo control, and stage accompaniment.',
  'The Mridangam is the principal rhythmic accompaniment for Carnatic music and Bharatanatyam. This double-headed drum requires rigorous training in strokes, patterns, and musicality. At AAIFA, students develop foundational techniques through structured lessons and gradually advance to accompanying vocal and dance performances. Our systematic approach builds strong rhythmic foundations for lifelong musical growth.',
  '8+',
  'offline',
  'Drum',
  true,
  3,
  ARRAY['Basic Strokes','Korvais & Patterns','Eduppu Techniques','Rhythm Theory','Performance Accompaniment']
),
(
  'drawing-painting',
  'Drawing & Painting',
  'Visual Arts',
  'Explore creativity through colors, form, and texture. Covers sketching, color theory, mixed media, still life, portrait, and creative composition suited for hobbyists and aspiring artists.',
  'Our Drawing & Painting program provides a complete visual arts education encompassing foundational drawing skills through advanced mixed media techniques. Students explore pencil sketching, charcoal, watercolors, acrylics, and oil painting. Projects range from still life and landscape to portrait study and creative composition. This program encourages imagination and develops fine motor skills, artistic sensibility, and observational abilities.',
  'All ages',
  'offline',
  'Palette',
  true,
  4,
  ARRAY['Pencil Sketching','Color Theory','Mixed Media','Portrait Study','Creative Composition','All Skill Levels']
),
(
  'workshops',
  'Workshops & Art Camps',
  'Short-Term Intensive Programs',
  'Special sessions conducted during holidays and festivals to enhance practical learning and offer exposure to different cultural and artistic aspects. Duration: 3–14 days.',
  'Avighna Abhyasa organizes intensive workshops and art camps during school holidays and cultural festivals. These programs offer focused learning experiences in dance, music, percussion, and visual arts. Guest artists and senior practitioners are invited to share their expertise. Thematic choreography, stagecraft, and abhinaya modules are featured. These camps are ideal for students who want concentrated learning without long-term commitment.',
  'All ages',
  'offline',
  'CalendarDays',
  false,
  5,
  ARRAY['Intensive Modules','Guest Artists','Thematic Choreography','Holiday Camps','Festival Programs','3–14 Days Duration']
),
(
  'certification',
  'Examinations & Certifications',
  'University-Affiliated',
  'Affiliated with Bir Tikendrajit University, Manipur. Courses follow a structured syllabus designed for professional certification and skill validation. Includes practical and theory components.',
  'AAIFA is officially affiliated with Bir Tikendrajit University, Manipur, enabling students to appear for recognized examinations and earn university-certified qualifications in Bharatanatyam, Carnatic Music, and Mridangam. The structured syllabus covers both practical performance and theoretical understanding. Certification provides academic recognition for artistic achievement and opens pathways for teaching and higher study in classical arts.',
  'All ages',
  'hybrid',
  'GraduationCap',
  false,
  6,
  ARRAY['University Affiliation','Structured Syllabus','Practical Exams','Theory Components','Official Certificate','Recognized Qualification']
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED DATA — Gallery Images (real institute photos)
-- ============================================================
INSERT INTO gallery_images (title, url, storage_path, category, alt_text, is_featured, sort_order)
VALUES
('Bharatanatyam Performance', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.41.30.jpeg', 'external/gallery-1.jpeg', 'performances', 'Bharatanatyam performance at Avighna Abhyasa Institute', true, 1),
('Cultural Dance Event', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.41.30-1.jpeg', 'external/gallery-2.jpeg', 'performances', 'Classical dance event at AAIFA Bengaluru', true, 2),
('Students Performance', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.42.jpeg', 'external/gallery-3.jpeg', 'performances', 'Students performing Bharatanatyam on stage', true, 3),
('Dance Recital', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.42-1.jpeg', 'external/gallery-4.jpeg', 'events', 'Dance recital at Avighna Abhyasa Institute of Fine Arts', true, 4),
('AAIFA Cultural Event', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.41.jpeg', 'external/gallery-5.jpeg', 'events', 'AAIFA cultural program event', false, 5),
('Guru Haripriya Pettem', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.00.jpeg', 'external/gallery-6.jpeg', 'classes', 'Guru Smt. Haripriya Pettem — Founder & Co-Director', true, 6),
('Classical Arts Training', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.01-1.jpeg', 'external/gallery-7.jpeg', 'classes', 'Classical arts training session at AAIFA', false, 7),
('Bharatanatyam Class', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.01-2.jpeg', 'external/gallery-8.jpeg', 'classes', 'Bharatanatyam class at Avighna Abhyasa', false, 8),
('Dance Training Session', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.01.jpeg', 'external/gallery-9.jpeg', 'classes', 'Dance training session with Guru Haripriya', false, 9),
('Stage Performance', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.27.jpeg', 'external/gallery-10.jpeg', 'performances', 'AAIFA stage performance event', false, 10),
('Institute Program', 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.40.jpeg', 'external/gallery-11.jpeg', 'events', 'Institute program showcase at Avighna Abhyasa', false, 11)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED DATA — Testimonials (real, from the institute website)
-- ============================================================
INSERT INTO testimonials (author_name, author_role, content, rating, program, is_featured, sort_order)
VALUES
(
  'Priya Sharma',
  'Parent of Student',
  'My daughter has been learning dance here since 1 year and I am so happy with the Haripriya madam passion and dedication towards dance. The classes helped my daughter gain confidence and improve her dance skills. I also want to thank the teacher for giving wonderful opportunities and programs for my daughter to perform and showcase her talent. We truly feel blessed to have such a caring and inspiring mentor. Highly recommended.',
  5, 'Bharatanatyam', true, 1
),
(
  'Sunitha Rao',
  'Parent of Students',
  'My kids are learning Bharatanatyam from Haripriya mam from couple of years. We are very happy with the way she teaches and cares my kids. Very patient, also she encourages us to give stage performances. My kids have given multiple performances in local and outstation. We are super happy with the overall teaching/guidance. Would highly recommend incase if you are looking for bharatanatyam courses around TC palya, kr puram. Also I believe she is flexible for online teaching as well.',
  5, 'Bharatanatyam', true, 2
),
(
  'Meera Krishnan',
  'Parent of Student',
  'My daughter has been learning dance here and I''m truly impressed with the Guru Haripriya madam dedication, patience, and passion for dance. We feel very lucky to have found such a wonderful mentor! Highly recommended for anyone looking for quality dance training.',
  5, 'Bharatanatyam', true, 3
),
(
  'Anand Kumar',
  'Student / Parent',
  'School of dance for all age groups. Especially HariPriya mam has lot of patience and so responsible. She connects with each and every student such that the student feels as if she is the only good guide for them. Once again congratulations for the new branch mam.',
  5, 'Bharatanatyam', true, 4
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED DATA — Awards (all 8 real awards)
-- ============================================================
INSERT INTO awards (title, year, description, recipient, sort_order)
VALUES
('Natya Mayuri Award', 2022, 'Recognized for outstanding contribution to classical Bharatanatyam dance and artistic excellence', 'Guru Smt. Haripriya Pettem', 1),
('IWM Art and Culture Award', 2022, 'Indian Women Matters award for excellence in arts entrepreneurship — Mompreneur category', 'Guru Smt. Haripriya Pettem', 2),
('Natya Keerthi Award', 2023, 'Honored for sustained excellence and dedicated promotion of Indian classical dance', 'Guru Smt. Haripriya Pettem', 3),
('Guru Ratna Award', 2023, 'Recognizing outstanding teaching and mentorship in classical arts education', 'Guru Smt. Haripriya Pettem', 4),
('Sathir Narthaki Award', 2023, 'Honoring mastery and significant contribution to the Bharatanatyam tradition', 'Guru Smt. Haripriya Pettem', 5),
('Laasya Sangama Award', 2024, 'Excellence in graceful classical dance expression and cultural promotion', 'Guru Smt. Haripriya Pettem', 6),
('Guru Vriksha Award', 2024, 'Recognizing an exemplary guru who nurtures students like a tree nourishes its branches', 'Guru Smt. Haripriya Pettem', 7),
('Kala Shree Award', 2025, 'Awarded for lifelong dedication and contribution to Indian classical fine arts', 'Guru Smt. Haripriya Pettem', 8)
ON CONFLICT DO NOTHING;
