import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const siteId = params.siteId;

    const site = await db.site.findUnique({
      where: {
        id: siteId,
      },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
          },
        },
        pages: {
          select: {
            id: true,
            title: true,
            slug: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
        navigation: true,
        theme: true,
        _count: {
          select: {
            pages: true,
            assets: true,
          },
        },
      },
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

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
      pages: site.pages,
      navigation: site.navigation,
      theme: site.theme,
      _count: site._count,
    };

    return NextResponse.json(transformedSite);
  } catch (error) {
    console.error("Error fetching site:", error);
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
    const { name, description } = body;

    const site = await db.site.update({
      where: {
        id: siteId,
      },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
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

    return NextResponse.json(transformedSite);
  } catch (error) {
    console.error("Error updating site:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const siteId = params.siteId;

    await db.site.delete({
      where: {
        id: siteId,
      },
    });

    return NextResponse.json(
      { message: "Site deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting site:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
