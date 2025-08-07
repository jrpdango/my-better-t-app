import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const siteId = params.siteId;

    const theme = await db.theme.findUnique({
      where: {
        siteId: siteId,
      },
    });

    if (!theme) {
      return NextResponse.json({
        theme: null,
        message: "No theme found for this site",
      });
    }

    return NextResponse.json({ theme });
  } catch (error) {
    console.error("Error fetching theme:", error);
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
    const { primaryColor, secondaryColor, customCss, tenantId } = body;

    if (!primaryColor || !secondaryColor || !tenantId) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: primaryColor, secondaryColor, tenantId",
        },
        { status: 400 }
      );
    }

    const theme = await db.theme.upsert({
      where: {
        siteId: siteId,
      },
      update: {
        primaryColor,
        secondaryColor,
        customCss,
      },
      create: {
        siteId,
        tenantId,
        primaryColor,
        secondaryColor,
        customCss,
      },
    });

    return NextResponse.json({ theme });
  } catch (error) {
    console.error("Error updating theme:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
