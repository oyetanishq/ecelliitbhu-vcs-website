-- Migration: add user profile fields for registration form

BEGIN;

-- Add profile fields to users table
ALTER TABLE IF EXISTS users
  ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS institution text,
  ADD COLUMN IF NOT EXISTS current_year text,
  ADD COLUMN IF NOT EXISTS course text,
  ADD COLUMN IF NOT EXISTS branch text,
  ADD COLUMN IF NOT EXISTS phone_number text;

COMMIT;

-- Rollback (manual):
-- BEGIN;
-- ALTER TABLE IF EXISTS users
--   DROP COLUMN IF EXISTS full_name,
--   DROP COLUMN IF EXISTS institution,
--   DROP COLUMN IF EXISTS current_year,
--   DROP COLUMN IF EXISTS course,
--   DROP COLUMN IF EXISTS branch,
--   DROP COLUMN IF EXISTS phone_number;
-- COMMIT;
