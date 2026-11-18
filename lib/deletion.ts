export type DeletionReceipt = {
  accountId: string;
  operationKey: string;
  receipt: string;
  id?: string;
};
export const deletionStorageKey = "urduspeech-deletion-receipt";
export function newDeletionReceipt(accountId: string): DeletionReceipt {
  return {
    accountId,
    operationKey: crypto.randomUUID(),
    receipt: Array.from(crypto.getRandomValues(new Uint8Array(32)), (value) =>
      value.toString(16).padStart(2, "0"),
    ).join(""),
  };
}
export function rememberDeletion(value: DeletionReceipt) {
  try {
    sessionStorage.setItem(deletionStorageKey, JSON.stringify(value));
  } catch {
    /* The caller also retains a copy for download. */
  }
}
export function parseDeletion(raw: string): DeletionReceipt | null {
  try {
    if (raw.length > 4096) return null;
    const value = JSON.parse(raw);
    const uuid =
      /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    return value &&
      uuid.test(value.accountId) &&
      uuid.test(value.operationKey) &&
      /^[a-f0-9]{64}$/.test(value.receipt) &&
      (!value.id || uuid.test(value.id))
      ? {
          accountId: value.accountId,
          operationKey: value.operationKey,
          receipt: value.receipt,
          ...(value.id ? { id: value.id } : {}),
        }
      : null;
  } catch {
    return null;
  }
}
export function readDeletion(): DeletionReceipt | null {
  try {
    return parseDeletion(sessionStorage.getItem(deletionStorageKey) ?? "null");
  } catch {
    return null;
  }
}
export function deletionHeaders(receipt: DeletionReceipt) {
  return {
    "Idempotency-Key": receipt.operationKey,
    "Deletion-Receipt": receipt.receipt,
    "Deletion-Account-Id": receipt.accountId,
  };
}
export function downloadDeletionReceipt(receipt: DeletionReceipt) {
  const url = URL.createObjectURL(
      new Blob([JSON.stringify(receipt, null, 2)], {
        type: "application/json",
      }),
    ),
    anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "urduspeech-deletion-receipt.json";
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
