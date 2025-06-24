import { NextRequest, NextResponse } from "next/server";
import { db, initializeDB } from "@/lib/db";
import { isValidEmail } from "@/lib/auth";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    // Initialize database
    await initializeDB();

    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await db.findUserByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        {
          message:
            "If an account with that email exists, a password reset link has been sent",
        },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Store reset token in database
    await db.updateResetToken(email, resetToken, expiresAt);

    // In a real application, you would send an email here
    // For now, we'll just return the token (remove this in production)
    console.log(`Password reset token for ${email}: ${resetToken}`);

    return NextResponse.json(
      {
        message:
          "If an account with that email exists, a password reset link has been sent",
        // Remove this in production - only for development/testing
        resetToken:
          process.env.NODE_ENV === "development" ? resetToken : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
