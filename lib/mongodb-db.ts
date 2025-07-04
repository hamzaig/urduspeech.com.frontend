import connectDB from "./mongodb";
import { User, IUser } from "@/models/User";
import { User as UserType } from "./auth";

export class MongoDBService {
  async createUser(
    userData: Omit<UserType, "_id" | "createdAt" | "updatedAt">
  ): Promise<UserType> {
    await connectDB();

    const user = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    const savedUser = await user.save();

    return {
      _id: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email,
      password: savedUser.password,
      phone: savedUser.phone,
      location: savedUser.location,
      bio: savedUser.bio,
      language: savedUser.language,
      timezone: savedUser.timezone,
      profileVisibility: savedUser.profileVisibility,
      showEmail: savedUser.showEmail,
      showPhone: savedUser.showPhone,
      allowContact: savedUser.allowContact,
      emailNotifications: savedUser.emailNotifications,
      smsNotifications: savedUser.smsNotifications,
      projectUpdates: savedUser.projectUpdates,
      marketingEmails: savedUser.marketingEmails,
      securityAlerts: savedUser.securityAlerts,
      themeMode: savedUser.themeMode,
      accentColor: savedUser.accentColor,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }

  async findUserById(id: string): Promise<UserType | null> {
    await connectDB();

    const user = await User.findById(id);
    if (!user) return null;

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      language: user.language,
      timezone: user.timezone,
      profileVisibility: user.profileVisibility,
      showEmail: user.showEmail,
      showPhone: user.showPhone,
      allowContact: user.allowContact,
      emailNotifications: user.emailNotifications,
      smsNotifications: user.smsNotifications,
      projectUpdates: user.projectUpdates,
      marketingEmails: user.marketingEmails,
      securityAlerts: user.securityAlerts,
      themeMode: user.themeMode,
      accentColor: user.accentColor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findUserByEmail(email: string): Promise<UserType | null> {
    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return null;

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      language: user.language,
      timezone: user.timezone,
      profileVisibility: user.profileVisibility,
      showEmail: user.showEmail,
      showPhone: user.showPhone,
      allowContact: user.allowContact,
      emailNotifications: user.emailNotifications,
      smsNotifications: user.smsNotifications,
      projectUpdates: user.projectUpdates,
      marketingEmails: user.marketingEmails,
      securityAlerts: user.securityAlerts,
      themeMode: user.themeMode,
      accentColor: user.accentColor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateUser(
    id: string,
    updates: Partial<Omit<UserType, "_id" | "createdAt">>
  ): Promise<UserType | null> {
    await connectDB();

    const user = await User.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );

    if (!user) return null;

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      language: user.language,
      timezone: user.timezone,
      profileVisibility: user.profileVisibility,
      showEmail: user.showEmail,
      showPhone: user.showPhone,
      allowContact: user.allowContact,
      emailNotifications: user.emailNotifications,
      smsNotifications: user.smsNotifications,
      projectUpdates: user.projectUpdates,
      marketingEmails: user.marketingEmails,
      securityAlerts: user.securityAlerts,
      themeMode: user.themeMode,
      accentColor: user.accentColor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async deleteUser(id: string): Promise<boolean> {
    await connectDB();

    const result = await User.findByIdAndDelete(id);
    return !!result;
  }

  async listUsers(): Promise<UserType[]> {
    await connectDB();

    const users = await User.find({});
    return users.map((user) => ({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      language: user.language,
      timezone: user.timezone,
      profileVisibility: user.profileVisibility,
      showEmail: user.showEmail,
      showPhone: user.showPhone,
      allowContact: user.allowContact,
      emailNotifications: user.emailNotifications,
      smsNotifications: user.smsNotifications,
      projectUpdates: user.projectUpdates,
      marketingEmails: user.marketingEmails,
      securityAlerts: user.securityAlerts,
      themeMode: user.themeMode,
      accentColor: user.accentColor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async userExists(email: string): Promise<boolean> {
    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    return !!user;
  }

  async updateResetToken(
    email: string,
    resetToken: string,
    resetTokenExpiry: Date
  ): Promise<boolean> {
    await connectDB();

    const result = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { resetToken, resetTokenExpiry }
    );

    return !!result;
  }

  async findUserByResetToken(resetToken: string): Promise<UserType | null> {
    await connectDB();

    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) return null;

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      language: user.language,
      timezone: user.timezone,
      profileVisibility: user.profileVisibility,
      showEmail: user.showEmail,
      showPhone: user.showPhone,
      allowContact: user.allowContact,
      emailNotifications: user.emailNotifications,
      smsNotifications: user.smsNotifications,
      projectUpdates: user.projectUpdates,
      marketingEmails: user.marketingEmails,
      securityAlerts: user.securityAlerts,
      themeMode: user.themeMode,
      accentColor: user.accentColor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async clearResetToken(email: string): Promise<boolean> {
    await connectDB();

    const result = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { resetToken: null, resetTokenExpiry: null }
    );

    return !!result;
  }
}

// Export singleton instance
export const mongodbDB = new MongoDBService();
