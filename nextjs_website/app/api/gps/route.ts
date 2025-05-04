import { NextRequest, NextResponse } from 'next/server';
// import mysql from 'mysql2/promise'; // Remove database import

// Remove database connection function
/*
async function getDbConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        return connection;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("Failed to connect to the database.");
    }
}
*/

// Remove or simplify escapeData function if not needed elsewhere
/*
function escapeData(data: any): string {
    if (data === null || typeof data === 'undefined') {
        return '';
    }
    let str = String(data);
    str = str.trim();
    str = str.replace(/[\\'";]/g, '\\$&');
    return str;
}
*/

export async function POST(request: NextRequest) {
    console.log("Received POST request to /api/gps (DB Removed)");

    // let connection; // No longer needed
    try {
        const formData = await request.formData();
        const apiKey = formData.get('api_key') as string | null;
        const lat = formData.get('lat') as string | null;
        const lng = formData.get('lng') as string | null;

        console.log("API Key:", apiKey);
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);

        // Validate API Key
        if (!apiKey || apiKey !== process.env.ESP32_API_KEY) {
            console.error("Invalid or missing API Key:", apiKey);
            return NextResponse.json({ error: 'Wrong API Key' }, { status: 401 });
        }

        // Validate input data (still useful)
        if (lat === null || lng === null) {
            console.error("Missing latitude or longitude");
            return NextResponse.json({ error: 'Missing lat or lng parameter' }, { status: 400 });
        }

        // --- Database Interaction Removed ---
        /*
        connection = await getDbConnection();
        const escapedLat = escapeData(lat);
        const escapedLng = escapeData(lng);
        // ... timestamp generation ...
        const sql = 'INSERT INTO tbl_gps (lat, lng, created_date) VALUES (?, ?, ?)';
        const values = [escapedLat, escapedLng, currentTimestamp];
        console.log("Executing SQL:", sql, "with values:", values);
        const [result] = await connection.execute(sql, values);
        const insertId = (result as any).insertId;
        console.log("Insert successful. Insert ID:", insertId);
        await connection.end();
        return NextResponse.json({ message: 'OK', insertId: insertId }, { status: 200 });
        */
        // --- End Database Interaction Removed ---

        // Return a simple success message
        console.log("Data received and validated (DB interaction removed).")
        return NextResponse.json({ message: 'OK (Data Received, Not Stored)' }, { status: 200 });

    } catch (error: any) {
        console.error("Error processing POST request:", error);
        // Remove database connection closing from catch block
        /*
        if (connection) {
            await connection.end();
        }
        */
        // Simplify error handling as DB connection errors are removed
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

// Optional: Add a GET handler if needed for testing this endpoint directly
export async function GET() {
    return NextResponse.json({ message: 'This endpoint expects POST requests with GPS data. Database functionality removed.' });
} 