CREATE TABLE IF NOT EXISTS plazas (
  id  INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT NOT NULL,
  piso INTEGER NOT NULL,
  minusvalido BOOLEAN NOT NULL,
  electrico BOOLEAN NOT NULL,
  ocupado BOOLEAN NOT NULL
);

-- Piso 1: 5 privadas, 5 minusválidos, 5 eléctricos y 5 públicas
INSERT INTO plazas (tipo, piso, minusvalido, electrico, ocupado) VALUES
  ('privadas', 1, false, false, false),
  ('privadas', 1, false, false, false),
  ('privadas', 1, false, false, false),
  ('privadas', 1, false, false, false),
  ('privadas', 1, false, false, false),
  ('publicas', 1, true, false, false),
  ('publicas', 1, true, false, false),
  ('publicas', 1, true, false, false),
  ('publicas', 1, true, false, false),
  ('publicas', 1, true, false, false),
  ('publicas', 1, false, true, false),
  ('publicas', 1, false, true, false),
  ('publicas', 1, false, true, false),
  ('publicas', 1, false, true, false),
  ('publicas', 1, false, true, false),
  ('publicas', 1, false, false, false),
  ('publicas', 1, false, false, false),
  ('publicas', 1, false, false, false),
  ('publicas', 1, false, false, false),
  ('publicas', 1, false, false, false);

-- Piso 2: 10 públicas y 10 privadas
INSERT INTO plazas (tipo, piso, minusvalido, electrico, ocupado) VALUES
  ('privadas', 2, false, false, false),
  ('privadas', 2, false, false, false),
  ('privadas', 2, false, false, false),
  ('privadas', 2, false, false, false),
  ('privadas', 2, false, false, false),
  ('privadas', 2, false, false, false),
  ('privadas', 2, false, false, false),
  ('privadas', 2, false, false, false),
  ('privadas', 2, false, false, false),
  ('privadas', 2, false, false, false),
  ('publicas', 2, false, false, false),
  ('publicas', 2, false, false, false),
  ('publicas', 2, false, false, false),
  ('publicas', 2, false, false, false),
  ('publicas', 2, false, false, false),
  ('publicas', 2, false, false, false),
  ('publicas', 2, false, false, false),
  ('publicas', 2, false, false, false),
  ('publicas', 2, false, false, false),
  ('publicas', 2, false, false, false);

-- Piso 3: 20 públicas
INSERT INTO plazas (tipo, piso, minusvalido, electrico, ocupado) VALUES
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false),
  ('publicas', 3, false, false, false);