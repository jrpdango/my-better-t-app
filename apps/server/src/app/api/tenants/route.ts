import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companySlug = searchParams.get("companySlug");

    if (companySlug) {
      // Get tenant by company slug
      const tenant = await db.tenant.findFirst({
        where: {
          company: {
            slug: companySlug,
          },
        },
        include: {
          company: true,
          _count: {
            select: {
              sites: true,
              users: true,
            },
          },
        },
      });

      if (!tenant) {
        return NextResponse.json(
          { error: "Tenant not found for company" },
          { status: 404 }
        );
      }

      return NextResponse.json({ tenant });
    }

    // Get all tenants
    const tenants = await db.tenant.findMany({
      include: {
        company: true,
        _count: {
          select: {
            sites: true,
            users: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      tenants,
      total: tenants.length,
    });
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
