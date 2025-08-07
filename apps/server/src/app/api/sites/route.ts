import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
      return NextResponse.json(
        { error: "tenantId is required" },
        { status: 400 }
      );
    }

    const sites = await db.site.findMany({
      where: {
        tenantId: tenantId,
      },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
          },
        },
        _count: {
          select: {
            pages: true,
            assets: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Transform the data to match the frontend mock structure
    const transformedSites = sites.map((site) => ({
      id: site.id,
      name: site.name,
      slug: site.slug,
      description: site.description || "",
      tenantId: site.tenantId,
      createdBy: site.createdBy,
      department: "General", // Default department as it's not in schema
      status: "active", // Default status as it's not in schema
      lastActivity: site.updatedAt.toISOString(),
      createdAt: site.createdAt.toISOString(),
      updatedAt: site.updatedAt.toISOString(),
      creator: site.creator,
      _count: site._count,
    }));

    return NextResponse.json({
      sites: transformedSites,
      total: transformedSites.length,
    });
  } catch (error) {
    console.error("Error fetching sites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, tenantId, createdBy } = body;

    if (!name || !slug || !tenantId || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug, tenantId, createdBy" },
        { status: 400 }
      );
    }

    const site = await db.site.create({
      data: {
        name,
        slug,
        description,
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

    const transformedSite = {
      id: site.id,
      name: site.name,
      slug: site.slug,
      description: site.description || "",
      tenantId: site.tenantId,
      createdBy: site.createdBy,
      department: "General",
      status: "active",
      lastActivity: site.updatedAt.toISOString(),
      createdAt: site.createdAt.toISOString(),
      updatedAt: site.updatedAt.toISOString(),
      creator: site.creator,
    };

    return NextResponse.json(transformedSite, { status: 201 });
  } catch (error) {
    console.error("Error creating site:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
