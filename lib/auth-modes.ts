export const AUTH_MODES = {
  "sign-in": {
    title: "Sign in to UrduSpeech",
    description: "Sign in to your creator studio.",
    button: "Sign in",
  },
  register: {
    title: "Create your account",
    description: "Start with 10 free minutes for transcripts and captions.",
    button: "Create account",
  },
  "forgot-password": {
    title: "Reset your password.",
    description: "We’ll email you a link to choose a new password.",
    button: "Send reset link",
  },
  "reset-password": {
    title: "Choose a new password.",
    description: "Use at least 12 characters.",
    button: "Save new password",
  },
  "verify-email": {
    title: "Verify your email.",
    description: "Confirm your email address to activate your account.",
    button: "Verify email",
  },
} as const;

export type AuthMode = keyof typeof AUTH_MODES;
