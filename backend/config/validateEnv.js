/* global process, console */
/**
 * Startup environment validation.
 *
 * This module is imported FIRST by server.js so it runs before any other
 * module (in particular before the Supabase client is constructed, which
 * would otherwise crash with a raw library stack trace).
 *
 * The server refuses to start when required secrets are missing or weak:
 * signing/verifying JWTs with a missing/short secret would silently
 * compromise every account. Error messages only ever name the variables —
 * values are never printed.
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend/.env regardless of the caller's working directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const problems = [];

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  problems.push(
    'JWT_SECRET is missing or too short (minimum 32 characters). ' +
      'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"'
  );
}
if (!process.env.SUPABASE_URL) {
  problems.push('SUPABASE_URL is not set.');
}
if (!process.env.SUPABASE_ANON_KEY) {
  problems.push('SUPABASE_ANON_KEY is not set.');
}

if (problems.length > 0) {
  console.error('❌ Backend environment is incomplete — the server will not start:');
  problems.forEach((problem) => console.error(`   - ${problem}`));
  console.error('   See backend/.env.example for the full list of required variables.');
  process.exit(1);
}
