import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { 
      userId, 
      name, 
      email, 
      phone, 
      location, 
      bio, 
      language, 
      timezone,
      profileVisibility,
      showEmail,
      showPhone,
      allowContact,
      emailNotifications,
      smsNotifications,
      projectUpdates,
      marketingEmails,
      securityAlerts,
      themeMode,
      accentColor
    } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== existingUser.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name || existingUser.name,
        email: email || existingUser.email,
        phone: phone !== undefined ? phone : existingUser.phone,
        location: location !== undefined ? location : existingUser.location,
        bio: bio !== undefined ? bio : existingUser.bio,
        language: language || existingUser.language,
        timezone: timezone || existingUser.timezone,
        profileVisibility: profileVisibility || existingUser.profileVisibility,
        showEmail: showEmail !== undefined ? showEmail : existingUser.showEmail,
        showPhone: showPhone !== undefined ? showPhone : existingUser.showPhone,
        allowContact: allowContact !== undefined ? allowContact : existingUser.allowContact,
        emailNotifications: emailNotifications !== undefined ? emailNotifications : existingUser.emailNotifications,
        smsNotifications: smsNotifications !== undefined ? smsNotifications : existingUser.smsNotifications,
        projectUpdates: projectUpdates !== undefined ? projectUpdates : existingUser.projectUpdates,
        marketingEmails: marketingEmails !== undefined ? marketingEmails : existingUser.marketingEmails,
        securityAlerts: securityAlerts !== undefined ? securityAlerts : existingUser.securityAlerts,
        themeMode: themeMode || existingUser.themeMode,
        accentColor: accentColor || existingUser.accentColor,
      },
      { new: true, runValidators: true }
    );

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser.toObject();

    return NextResponse.json({
      message: "Profile updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 