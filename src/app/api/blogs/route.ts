import { prisma } from "@/components/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const blogs = await prisma.post.findMany();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, image, category, tags, readTime } = body;

    // Validate required fields
    if (
      !title ||
      !excerpt ||
      !content ||
      !image ||
      !category ||
      !tags ||
      !readTime
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create the blog post
    const newPost = await prisma.post.create({
      data: {
        title,
        excerpt,
        content,
        image,
        category,
        tags,
        readTime,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
