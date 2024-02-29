import { createClient } from "@supabase/supabase-js";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53YnVhZWNua3lrcmNodXNubmVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzA4MDg3MywiZXhwIjoyMDIyNjU2ODczfQ.-VCEpBxnBqlsUi_0azN6HpI_Ybu747XN1nQwkxh7kCE"

export const supabase = createClient('https://nwbuaecnkykrchusnnef.supabase.co', key)