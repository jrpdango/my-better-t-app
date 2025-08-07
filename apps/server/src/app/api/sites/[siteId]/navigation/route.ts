import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const siteId = params.siteId;

    const navigation = await db.navigation.findUnique({
      where: {
        siteId: siteId,
      },
    });

    if (!navigation) {
      return NextResponse.json({
        navigation: null,
        message: "No navigation found for this site",
      });
    }

    return NextResponse.json({ navigation });
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const siteId = params.siteId;
    const body = await request.json();
    const { structure, tenantId } = body;

    if (!structure || !tenantId) {
      return NextResponse.json(
        { error: "Missing required fields: structure, tenantId" },
        { status: 400 }
      );
    }

    const navigation = await db.navigation.upsert({
      where: {
        siteId: siteId,
      },
      update: {
        structure,
      },
      create: {
        siteId,
        tenantId,
        structure,
      },
    });

    return NextResponse.json({ navigation });
  } catch (error) {
    console.error("Error updating navigation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
