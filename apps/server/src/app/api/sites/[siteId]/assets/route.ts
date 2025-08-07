import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const siteId = params.siteId;

    const assets = await db.asset.findMany({
      where: {
        siteId: siteId,
      },
      include: {
        uploader: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      assets,
      total: assets.length,
    });
  } catch (error) {
    console.error("Error fetching assets:", error);
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
    const { name, filePath, fileType, fileSize, tenantId, uploadedBy } = body;

    if (
      !name ||
      !filePath ||
      !fileType ||
      !fileSize ||
      !tenantId ||
      !uploadedBy
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const asset = await db.asset.create({
      data: {
        name,
        filePath,
        fileType,
        fileSize,
        siteId,
        tenantId,
        uploadedBy,
      },
      include: {
        uploader: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error("Error creating asset:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
