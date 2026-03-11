import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase not configured");
    }

    return createClient(supabaseUrl, supabaseKey);
}

function checkPin(req: NextRequest) {
    const adminPin = req.headers.get("x-admin-pin");
    const expectedPin = process.env.ADMIN_PIN || process.env.NEXT_PUBLIC_ADMIN_PIN || "hiren2024";
    return adminPin === expectedPin;
}

export async function GET(req: NextRequest) {
    if (!checkPin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from("contact_submissions")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    if (!checkPin(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { ids } = await req.json() as { ids: string[] };
        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
        }

        const supabase = getSupabase();
        const { error } = await supabase
            .from("contact_submissions")
            .delete()
            .in("id", ids);

        if (error) throw error;
        return NextResponse.json({ success: true, deleted: ids.length });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}

