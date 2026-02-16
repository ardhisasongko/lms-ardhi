import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root (one level up from services)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Table names mapping (same as SHEETS for compatibility)
export const TABLES = {
  USERS: 'users',
  COURSES: 'courses',
  MODULES: 'modules',
  LESSONS: 'lessons',
  QUIZZES: 'quizzes',
  USER_PROGRESS: 'user_progress',
};

// Alias for backward compatibility
export const SHEETS = TABLES;

/**
 * Get all rows from a table
 * @param {string} tableName - Name of the table
 * @returns {Promise<Array>} - Array of objects
 */
export const getSheetData = async (tableName) => {
  try {
    const { data, error } = await supabase.from(tableName).select('*');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching data from ${tableName}:`, error);
    throw error;
  }
};

/**
 * Insert a row into a table
 * @param {string} tableName - Name of the table
 * @param {Object} values - Object with column values
 * @returns {Promise<Object>} - Inserted row
 */
export const insertRow = async (tableName, values) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert(values)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error inserting row to ${tableName}:`, error);
    throw error;
  }
};

/**
 * Append a row (compatibility wrapper for insertRow)
 * @param {string} tableName - Name of the table
 * @param {Array} values - Array of values (legacy format - not used with Supabase)
 * @returns {Promise<Object>} - Response
 */
export const appendRow = async (tableName, values) => {
  // Note: This is for backward compatibility
  // With Supabase, use insertRow with an object instead
  console.warn(
    'appendRow is deprecated with Supabase. Use insertRow with an object.',
  );
  return insertRow(tableName, values);
};

/**
 * Update a row by ID
 * @param {string} tableName - Name of the table
 * @param {string} id - Row ID
 * @param {Object} values - Object with column values to update
 * @returns {Promise<Object>} - Updated row
 */
export const updateRow = async (tableName, id, values) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(values)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating row ${id} in ${tableName}:`, error);
    throw error;
  }
};

/**
 * Delete a row by ID
 * @param {string} tableName - Name of the table
 * @param {string} id - Row ID
 * @returns {Promise<void>}
 */
export const deleteRow = async (tableName, id) => {
  try {
    const { error } = await supabase.from(tableName).delete().eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error(`Error deleting row ${id} in ${tableName}:`, error);
    throw error;
  }
};

/**
 * Find a row by a specific column value
 * @param {string} tableName - Name of the table
 * @param {string} columnName - Name of the column to search
 * @param {string} value - Value to search for
 * @returns {Promise<Object|null>} - Found row or null
 */
export const findByColumn = async (tableName, columnName, value) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq(columnName, value)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error finding row in ${tableName}:`, error);
    throw error;
  }
};

/**
 * Find a row by ID
 * @param {string} tableName - Name of the table
 * @param {string} id - Row ID
 * @returns {Promise<Object|null>} - Found row or null
 */
export const findById = async (tableName, id) => {
  return findByColumn(tableName, 'id', id);
};

/**
 * Get filtered data by column value
 * @param {string} tableName - Name of the table
 * @param {string} columnName - Name of the column to filter
 * @param {string} value - Value to filter by
 * @returns {Promise<Array>} - Array of matching rows
 */
export const filterByColumn = async (tableName, columnName, value) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq(columnName, value);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error filtering data in ${tableName}:`, error);
    throw error;
  }
};

/**
 * Get filtered data with ordering
 * @param {string} tableName - Name of the table
 * @param {string} columnName - Name of the column to filter
 * @param {string} value - Value to filter by
 * @param {string} orderBy - Column to order by
 * @param {boolean} ascending - Order direction
 * @returns {Promise<Array>} - Array of matching rows
 */
export const filterByColumnOrdered = async (
  tableName,
  columnName,
  value,
  orderBy,
  ascending = true,
) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq(columnName, value)
      .order(orderBy, { ascending });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error filtering data in ${tableName}:`, error);
    throw error;
  }
};

/**
 * Upsert a row (insert or update)
 * @param {string} tableName - Name of the table
 * @param {Object} values - Object with column values
 * @param {string} conflictColumn - Column to check for conflicts
 * @returns {Promise<Object>} - Upserted row
 */
export const upsertRow = async (tableName, values, conflictColumn = 'id') => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .upsert(values, { onConflict: conflictColumn })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error upserting row in ${tableName}:`, error);
    throw error;
  }
};

/**
 * Get data with specific fields only (selective fetching)
 * @param {string} tableName - Name of the table
 * @param {string} fields - Fields to select (default '*')
 * @returns {Promise<Array>} - Array of objects with selected fields
 */
export const getSheetDataSelective = async (tableName, fields = '*') => {
  try {
    const { data, error } = await supabase.from(tableName).select(fields);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching ${fields} from ${tableName}:`, error);
    throw error;
  }
};

/**
 * Get filtered data with specific fields
 * @param {string} tableName - Name of the table
 * @param {string} columnName - Name of the column to filter
 * @param {string} value - Value to filter by
 * @param {string} fields - Fields to select (default '*')
 * @returns {Promise<Array>} - Array of matching rows
 */
export const filterByColumnWithFields = async (
  tableName,
  columnName,
  value,
  fields = '*',
) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(fields)
      .eq(columnName, value);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error filtering data in ${tableName}:`, error);
    throw error;
  }
};

/**
 * Get data with relations (joins)
 * @param {string} tableName - Name of the table
 * @param {Object} filters - Object with column:value pairs to filter
 * @param {string} relations - Supabase relation string (e.g., '*, modules(*)')
 * @returns {Promise<Array>} - Array of objects with relations
 */
export const getWithRelations = async (tableName, filters = {}, relations = '*') => {
  try {
    let query = supabase.from(tableName).select(relations);

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching with relations from ${tableName}:`, error);
    throw error;
  }
};

/**
 * Get single record with relations
 * @param {string} tableName - Name of the table
 * @param {Object} filters - Object with column:value pairs to filter
 * @param {string} relations - Supabase relation string
 * @returns {Promise<Object|null>} - Single object with relations or null
 */
export const getSingleWithRelations = async (tableName, filters = {}, relations = '*') => {
  try {
    let query = supabase.from(tableName).select(relations);

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching single with relations from ${tableName}:`, error);
    throw error;
  }
};

export default {
  supabase,
  getSheetData,
  getSheetDataSelective,
  insertRow,
  appendRow,
  updateRow,
  deleteRow,
  findByColumn,
  findById,
  filterByColumn,
  filterByColumnOrdered,
  filterByColumnWithFields,
  getWithRelations,
  getSingleWithRelations,
  upsertRow,
  TABLES,
  SHEETS,
};
