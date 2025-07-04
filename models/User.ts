import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
  bio?: string;
  language?: string;
  timezone?: string;
  profileVisibility?: string;
  showEmail?: boolean;
  showPhone?: boolean;
  allowContact?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  projectUpdates?: boolean;
  marketingEmails?: boolean;
  securityAlerts?: boolean;
  themeMode?: string;
  accentColor?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    language: {
      type: String,
      enum: ["en", "ur", "ar"],
      default: "en",
    },
    timezone: {
      type: String,
      default: "UTC",
    },
    profileVisibility: {
      type: String,
      enum: ["public", "private", "friends"],
      default: "public",
    },
    showEmail: {
      type: Boolean,
      default: false,
    },
    showPhone: {
      type: Boolean,
      default: false,
    },
    allowContact: {
      type: Boolean,
      default: true,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    smsNotifications: {
      type: Boolean,
      default: false,
    },
    projectUpdates: {
      type: Boolean,
      default: true,
    },
    marketingEmails: {
      type: Boolean,
      default: false,
    },
    securityAlerts: {
      type: Boolean,
      default: true,
    },
    themeMode: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    accentColor: {
      type: String,
      enum: ["blue", "purple", "green", "red", "orange"],
      default: "blue",
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate model initialization
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
