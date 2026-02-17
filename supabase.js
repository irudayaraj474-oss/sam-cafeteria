
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://yredtzxvhvwebqvzjykf.supabase.co";
const supabaseKey = "sb_publishable_ru1SWMRuwTja6bJQUC7aSA_I_-_F6mC";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
        