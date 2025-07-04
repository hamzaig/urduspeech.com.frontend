import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import mongoose from "mongoose";

// Simple service request schema
const serviceRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  serviceType: { type: String, required: true },
  projectTitle: { type: String, required: true },
  description: { type: String, required: true },
  urgency: { type: String, default: "normal" },
  additionalNotes: { type: String },
  contactPhone: { type: String },
  budget: { type: String },
  files: [{ type: String }],
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ServiceRequest = mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", serviceRequestSchema);

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Connect to database
    await connectDB();

    // Parse form data
    const formData = await request.formData();
    
    const serviceType = formData.get("serviceType") as string;
    const projectTitle = formData.get("projectTitle") as string;
    const description = formData.get("description") as string;
    const urgency = formData.get("urgency") as string;
    const additionalNotes = formData.get("additionalNotes") as string;
    const contactPhone = formData.get("contactPhone") as string;
    const budget = formData.get("budget") as string;
    const userId = formData.get("userId") as string;

    // Validate required fields
    if (!serviceType || !projectTitle || !description) {
      return NextResponse.json(
        { error: "Service type, project title, and description are required" },
        { status: 400 }
      );
    }

    // Handle file uploads
    const uploadedFiles: string[] = [];
    const uploadDir = join(process.cwd(), "uploads", "services", userId);
    
    // Create upload directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Process files
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (key.startsWith("file-") && value instanceof File) {
        const file = value;
        
        // Validate file size (50MB limit)
        if (file.size > 50 * 1024 * 1024) {
          return NextResponse.json(
            { error: `File ${file.name} is too large. Maximum size is 50MB.` },
            { status: 400 }
          );
        }

        // Validate file type
        const allowedTypes = [
          "audio/", "video/", "application/pdf", 
          "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain"
        ];
        
        const isValidType = allowedTypes.some(type => 
          file.type.startsWith(type) || file.type === type
        );
        
        if (!isValidType) {
          return NextResponse.json(
            { error: `File type ${file.type} is not supported.` },
            { status: 400 }
          );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;
        const filePath = join(uploadDir, fileName);
        
        // Save file
        const bytes = await file.arrayBuffer();
        await writeFile(filePath, new Uint8Array(bytes));
        
        uploadedFiles.push(fileName);
      }
    }

    // Create service request in database
    const serviceRequest = new ServiceRequest({
      userId,
      serviceType,
      projectTitle,
      description,
      urgency,
      additionalNotes,
      contactPhone,
      budget,
      files: uploadedFiles,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const result = await serviceRequest.save();

    return NextResponse.json({
      success: true,
      message: "Service request submitted successfully",
      requestId: result._id
    });

  } catch (error) {
    console.error("Service submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit service request" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Connect to database
    await connectDB();

    // Get user's service requests
    const serviceRequests = await ServiceRequest
      .find({ userId: decoded.userId })
      .sort({ createdAt: -1 });

    return NextResponse.json({ serviceRequests });

  } catch (error) {
    console.error("Get service requests error:", error);
    return NextResponse.json(
      { error: "Failed to fetch service requests" },
      { status: 500 }
    );
  }
} 