const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://wtsdlzwnbzomypzflunu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0c2RsenduYnpvbXlwemZsdW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMTAwMDEsImV4cCI6MjA4ODc4NjAwMX0.YdFUwA_-hDsltBo_hxnWFHECw1RM0FZtq3Zc2KYwQHE";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSubmit() {
    console.log("Testing Supabase connection...");
    try {
        const { data, error } = await supabase
            .from("contact_submissions")
            .insert([{
                name: "AI Test Script",
                email: "ai@test.com",
                message: "Subject: Connection Test\n\nVerify table connections."
            }]);

        if (error) {
            console.error("Submission failed:", error);
        } else {
            console.log("Success! Data inserted successfully.");
        }
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

testSubmit();
