// Generated from reviewed backend OpenAPI; run scripts/generate-api.mjs.
export type HealthV1 = {
  schemaVersion: "1";
  service: "urduspeech-api";
  status: "ok" | "ready";
};
export type ApiErrorV1 = {
  type: string;
  title: string;
  status: number;
  code: string;
  supportId: string;
  detail?: string;
  fieldErrors?: Record<string, string[]>;
  retryAfterSeconds?: number;
};
export type JobStatusV1 = {
  schemaVersion: "1";
  id: string;
  projectId: string;
  state: string;
  version: number;
  supportId: string;
  freeQueueBusy?: boolean;
  completedStages: string[];
  retry: { attempt: number; nextAttemptAt: null | string };
  errorCode: null | string;
  capabilities: {
    canonicalText: boolean;
    correctionComplete: boolean;
    variantsReady: boolean;
    timingAvailable: boolean;
    exportsReady: boolean;
    txtReady: boolean;
    timedCaptionsReady: boolean;
    renderReady: boolean;
    canCancel: boolean;
  };
  etag: string;
  retryAfterSeconds: number;
};
export type Session = {
  userId: string;
  accountId: string;
  sessionId: string;
  fresh: boolean;
};
export type Usage = {
  schemaVersion: "1";
  plan: {
    renewal: "one_time" | "monthly";
    maxSourceSeconds: number;
    maxUploadBytes: number;
    concurrentProcessing: number;
    maxRenderHeight: 720 | 1080 | 2160;
    maxRenderBytes?: number;
    watermark: boolean;
    sourceRetentionDays: number;
    id: string;
    slug: "free" | "starter" | "creator" | "studio";
    name: string;
    catalogVersion: number;
    price: { amountMinor: number; currency: "PKR" };
    includedSeconds: number;
    checkoutAvailable: boolean;
  };
  period: { id: string; startsAt: string; endsAt: string; kind: string };
  allowance: number;
  reserved: number;
  consumed: number;
  remaining: number;
  activeJobs: number;
  blockingReason:
    "PLAN_EXPIRED" | "ALLOWANCE_EXHAUSTED" | "CONCURRENCY_LIMIT" | null;
  capabilities: { canProcess: boolean; checkoutAvailable: false };
};
export type Project = {
  id: string;
  title: string;
  settings: Record<string, unknown>;
  createdAt: string;
};
export type ProjectList = {
  projects: {
    id: string;
    title: string;
    settings: Record<string, unknown>;
    createdAt: string;
  }[];
  limit: number;
  offset: number;
};
export type CreatedProject = {
  project: {
    id: string;
    title: string;
    settings: Record<string, unknown>;
    createdAt: string;
  };
  media: { id: string };
  upload: {
    id: string;
    mediaId: string;
    projectId: string;
    state: string;
    byteSize: number;
    partSize: number;
    partCount: number;
  };
};
export type Defaults = {
  outputVariant: "urdu" | "romanUrdu" | "english" | "bilingual";
  correctionEnabled: boolean;
  autoEmbed: boolean;
  captionPresetVersionId: null | string;
  bilingualOrder?: "urdu-first" | "english-first";
  bilingualLayout?: "stacked";
  captionPlacement?: { y: number; scale: number } | null;
  captionFonts?: { urdu?: string; latin?: string } | null;
};
export type PlanCatalog = {
  schemaVersion: "1";
  catalogVersion: number;
  plans: {
    renewal: "one_time" | "monthly";
    maxSourceSeconds: number;
    maxUploadBytes: number;
    concurrentProcessing: number;
    maxRenderHeight: 720 | 1080 | 2160;
    maxRenderBytes?: number;
    watermark: boolean;
    sourceRetentionDays: number;
    id: string;
    slug: "free" | "starter" | "creator" | "studio";
    name: string;
    catalogVersion: number;
    price: { amountMinor: number; currency: "PKR" };
    includedSeconds: number;
    checkoutAvailable: boolean;
  }[];
  rollover: false;
  overage: false;
  topUp: false;
  batch: false;
  render4k: boolean;
  providers: {
    stripe: { checkoutAvailable: boolean; reason: null | string };
    manual: {
      checkoutAvailable: boolean;
      reason: null | string;
      methods: Record<
        string,
        { checkoutAvailable: boolean; reason: null | string }
      >;
    };
  };
};
export type UploadPolicy = {
  schemaVersion: "1";
  policyVersion: string;
  renderValidated: false;
  formats: {
    extension: string;
    format: string;
    audioCodecs: string[];
    videoCodecs: string[];
  }[];
  plans: {
    slug: string;
    maxUploadBytes: number;
    planMaxUploadBytes: number;
    maxSourceSeconds: number;
    limitingReason: null | string;
  }[];
};
export type UploadSession = {
  id: string;
  mediaId: string;
  projectId: string;
  state: string;
  byteSize: number;
  partSize: number;
  partCount: number;
  finalization: {
    operationKey: string;
    parts: { partNumber: number; etag: string }[];
  } | null;
  parts: { partNumber: number; size: number; etag: string }[];
};
export type Track = {
  schemaVersion: "1";
  id: string;
  projectId: string;
  sourceVersionId: string;
  parentTrackId: string | null;
  version: number;
  isHead: boolean;
  headTrackId: string;
  etag: string;
  content: {
    schemaVersion: "1";
    policyVersion: string;
    variant: string;
    plainText: string;
    mediaDurationMs: number;
    timingReady: boolean;
    cues: {
      position: number;
      startMs: number;
      endMs: number;
      text: string;
      sourceStart: number;
      sourceEnd: number;
      confidence: number;
      granularity: string;
      fallback: boolean;
      displayHoldMs?: number;
    }[];
    qa: {
      defects: string[];
      matched: number;
      fallback: number;
      uncertain: number;
    };
  };
};
export type TrackList = {
  schemaVersion: "1";
  tracks: {
    id: string;
    sourceVersionId: string;
    version: number;
    parentTrackId: string | null;
    variant: string;
    timingReady: boolean;
  }[];
};
export type Transcript = {
  schemaVersion: "1";
  id: string;
  projectId: string;
  kind: string;
  version: number;
  parentVersionId: string | null;
  text: string;
  uncertain: string[];
  isHead: boolean;
  headVersionId: string;
  etag: string;
  derivationState: string;
  corrections: {
    id: string;
    start: number;
    end: number;
    before: string;
    after: string;
    category: string;
    reason: string;
    confidence: number;
    evidence: string[];
    status: string;
    policyReason: string;
    provenance: {
      start: number;
      end: number;
      model: string;
      promptVersion: string;
      configVersion: string;
      requestId: null | string;
      responseId: string;
      operationId: string;
    }[];
    decisions: { decision: string; version: number }[];
  }[];
  variants: {
    id: string;
    kind: string;
    content: {
      schemaVersion: "1";
      kind: string;
      purpose: string;
      sourceVersionId: string;
      sourceHash: string;
      text: string;
      uncertain: string[];
      timing: string;
      pairs?: {
        start: number;
        end: number;
        sourceText: string;
        text: string;
      }[];
      bilingualOrder?: null | string;
      bilingualLayout?: null | string;
    };
  }[];
};
export type TranscriptList = {
  schemaVersion: "1";
  versions: {
    id: string;
    kind: string;
    version: number;
    parentVersionId: string | null;
  }[];
};
export type Render = {
  schemaVersion: "1";
  id: string;
  projectId: string;
  trackId: string;
  sourceVersionId: string;
  presetVersionId: string;
  appearance?: {
    captionPlacement: null | { y: number; scale: number };
    captionFonts: { urdu: string; latin: string };
    placementSource: "requested" | "fitted";
  };
  state: "pending" | "rendering" | "completed" | "failed" | "cancelled";
  progressMs: number;
  width: number;
  height: number;
  watermark: boolean;
  errorCode: null | string;
};
export type ExportFile = {
  id: string;
  sourceVersionId: string;
  trackId: string | null;
  variant: string;
  format: "txt" | "srt" | "vtt";
  state: string;
  errorCode: null | string;
  downloadPath: null | string;
};
export type BillingSummary = {
  schemaVersion: "1";
  seller: "MoonSys Ltd";
  currency: "PKR";
  renewalPolicy: "stripe-monthly-manual-one-term";
  changePolicy: "after-term-no-proration";
  providers: {
    stripe: { checkoutAvailable: boolean; reason: null | string };
    manual: {
      checkoutAvailable: boolean;
      reason: null | string;
      methods: Record<
        string,
        { checkoutAvailable: boolean; reason: null | string }
      >;
    };
  };
  usage: {
    schemaVersion: "1";
    plan: {
      renewal: "one_time" | "monthly";
      maxSourceSeconds: number;
      maxUploadBytes: number;
      concurrentProcessing: number;
      maxRenderHeight: 720 | 1080 | 2160;
      maxRenderBytes?: number;
      watermark: boolean;
      sourceRetentionDays: number;
      id: string;
      slug: "free" | "starter" | "creator" | "studio";
      name: string;
      catalogVersion: number;
      price: { amountMinor: number; currency: "PKR" };
      includedSeconds: number;
      checkoutAvailable: boolean;
    };
    period: { id: string; startsAt: string; endsAt: string; kind: string };
    allowance: number;
    reserved: number;
    consumed: number;
    remaining: number;
    activeJobs: number;
    blockingReason:
      "PLAN_EXPIRED" | "ALLOWANCE_EXHAUSTED" | "CONCURRENCY_LIMIT" | null;
    capabilities: { canProcess: boolean; checkoutAvailable: boolean };
  };
};
export type ManualRequest = {
  schemaVersion: "1";
  transactionId: string;
  planId: string;
  method: "jazzcash" | "easypaisa" | "bank_transfer" | "sadapay" | "nayapay";
  status:
    "requested" | "pending_review" | "approved" | "rejected" | "cancelled";
  amountMinor: number;
  currency: "PKR";
  destination: {
    method: "jazzcash" | "easypaisa" | "bank_transfer" | "sadapay" | "nayapay";
    destinationId: string;
    accountTitle: string;
    accountNumber: string;
    bankName?: string;
    instructions?: string;
  };
  claimedReference: null | string;
  createdAt: string;
  submittedAt: null | string;
};
export type AdminSession = { admin: boolean; fresh: boolean };
export type AdminSettings = {
  settings: {
    key: string;
    label: string;
    secret: boolean;
    configured: boolean;
    version: number;
    applyMode: "restart-required";
    value: null | string;
    updatedAt: null | string;
  }[];
};
export type ComputeAccounts = {
  accounts: {
    id: string;
    name: string;
    priority: number;
    enabled: boolean;
    status: string;
    cooldownUntil: null | string;
    maxConcurrent: number;
    version: number;
    lastError: null | string;
    configured: boolean;
    config: {
      provider: "modal";
      appName: string;
      environment: string;
      imageId?: string;
      alignmentImageId?: string;
      timeoutMs: number;
      cpu: number;
      memoryMiB: number;
      imageSource?: string;
    };
  }[];
};
export type ComputeAccountInput = {
  name: string;
  priority: number;
  enabled: boolean;
  maxConcurrent: number;
  config: {
    provider: "modal";
    tokenId: string;
    tokenSecret: string;
    appName: string;
    environment: string;
    imageId?: string;
    alignmentImageId?: string;
    timeoutMs: number;
    cpu: number;
    memoryMiB: number;
    imageSource?: string;
  };
};
export type ComputeAccountPatch = {
  expectedVersion: number;
  name?: string;
  priority?: number;
  enabled?: boolean;
  maxConcurrent?: number;
  config?: {
    provider: "modal";
    tokenId: string;
    tokenSecret: string;
    appName: string;
    environment: string;
    imageId?: string;
    alignmentImageId?: string;
    timeoutMs: number;
    cpu: number;
    memoryMiB: number;
    imageSource?: string;
  };
};
export type ManualPaymentReviews = {
  items: {
    schemaVersion: "1";
    transactionId: string;
    planId: string;
    method: "jazzcash" | "easypaisa" | "bank_transfer" | "sadapay" | "nayapay";
    status:
      "requested" | "pending_review" | "approved" | "rejected" | "cancelled";
    amountMinor: number;
    currency: "PKR";
    destination: {
      method:
        "jazzcash" | "easypaisa" | "bank_transfer" | "sadapay" | "nayapay";
      destinationId: string;
      accountTitle: string;
      accountNumber: string;
      bankName?: string;
      instructions?: string;
    };
    claimedReference: null | string;
    createdAt: string;
    submittedAt: null | string;
    accountId: string;
  }[];
  nextCursor: string | null;
};
export type ContactMessages = {
  messages: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: string;
  }[];
  unread: number;
};
export type AdminUsers = {
  users: {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    createdAt: string;
    lastLoginAt: null | string;
    plan: { code: string; name: string; endsAt: null | string };
    blocked: boolean;
  }[];
  nextBefore: null | string;
  totals: { users: number; paid: number; blocked: number };
};
export type AdminUserDetail = {
  user: {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    createdAt: string;
    lastLoginAt: null | string;
    plan: { code: string; name: string; endsAt: null | string };
    blocked: boolean;
  };
  usage: {
    allowanceSeconds: number;
    consumedSeconds: number;
    reservedSeconds: number;
    remainingSeconds: number;
    activeJobs: number;
    blockingReason: null | string;
  };
  counts: { projects: number; uploads: number; failedUploads: number };
  jobs: Record<string, number>;
  recentJobs: {
    id: string;
    state: string;
    createdAt: string;
    updatedAt: string;
    durationSeconds: null | number;
  }[];
  payments: {
    id: string;
    provider: string;
    status: string;
    amountMinor: number;
    currency: string;
    plan: null | string;
    createdAt: string;
  }[];
};
export type RenderFeedbackPage = {
  items: {
    renderId: string;
    projectId: string;
    projectTitle: string;
    userEmail: string;
    rating: number;
    comment: null | string;
    submittedAt: string;
  }[];
  nextCursor: null | string;
};
export type ProjectActivity = {
  jobs: { id: string; state: string }[];
  renders: { id: string; state: string }[];
  exports: { id: string; state: string }[];
  uploads: { id: string; state: string }[];
};
export type ContactMessage = ContactMessages["messages"][number];
export type AdminUser = AdminUsers["users"][number];
