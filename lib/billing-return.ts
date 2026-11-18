export type BillingTransaction = {
  transactionId: string;
  provider: "stripe" | "manual";
  status: string;
};
export function parseCheckoutReturn(search: string) {
  const query = new URLSearchParams(search);
  const kind = query.get("checkout"),
    transactionId = query.get("transaction");
  if (
    query.getAll("checkout").length !== 1 ||
    query.getAll("transaction").length !== 1 ||
    !["success", "cancelled"].includes(kind ?? "") ||
    !/^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(
      transactionId ?? "",
    )
  )
    return null;
  return {
    kind: kind as "success" | "cancelled",
    transactionId: transactionId!,
  };
}
export function verifiedPaymentReturn(
  transaction: BillingTransaction,
  expectedId: string,
) {
  if (
    transaction.transactionId !== expectedId ||
    transaction.provider !== "stripe"
  )
    throw Error("Payment status could not be verified");
  if (transaction.status === "succeeded")
    return {
      terminal: true,
      paid: true,
      message:
        "Payment verified. Your plan and minute allowance are being refreshed.",
    };
  if (transaction.status === "declined")
    return {
      terminal: true,
      paid: false,
      message:
        "The payment was declined. Check your payment method before trying again.",
    };
  if (transaction.status === "ended")
    return {
      terminal: true,
      paid: false,
      message:
        "This subscription has ended. Your current allowance is shown below.",
    };
  return {
    terminal: false,
    paid: false,
    message:
      "We are checking your payment. Your plan will update after payment verification.",
  };
}
