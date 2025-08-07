import { NextResponse } from "next/server";
import { db } from "../lib/db";

export async function GET() {
  try {
    // Test database connection
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json({
      message: "ShortPoint Standalone API is running",
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        message: "API is running but database connection failed",
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
      },
      { status: 503 }
    );
  }
}
