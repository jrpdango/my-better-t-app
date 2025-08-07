import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const siteId = params.siteId;

    const pages = await db.page.findMany({
      where: {
        siteId: siteId,
      },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({
      pages,
      total: pages.length,
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const siteId = params.siteId;
    const body = await request.json();
    const { title, slug, content, status, tenantId, createdBy } = body;

    if (!title || !slug || !tenantId || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug, tenantId, createdBy" },
        { status: 400 }
      );
    }

    const page = await db.page.create({
      data: {
        title,
        slug,
        content,
        status: status || "DRAFT",
        siteId,
        tenantId,
        createdBy,
      },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
