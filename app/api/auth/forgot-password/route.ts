import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import { isValidEmail } from "@/lib/auth";
import { emailService } from "@/lib/email-service";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

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
    const user = await User.findOne({ email: email.toLowerCase() });
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
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { resetToken, resetTokenExpiry: expiresAt }
    );

    // Send password reset email
    const emailSent = await emailService.sendPasswordResetEmail(
      email,
      resetToken,
      user.name
    );

    if (!emailSent) {
      console.error("Failed to send password reset email to:", email);
      // Still return success to not reveal if user exists
      return NextResponse.json(
        {
          message:
            "If an account with that email exists, a password reset link has been sent",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message:
          "If an account with that email exists, a password reset link has been sent",
        // Only include reset token in development for testing
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
