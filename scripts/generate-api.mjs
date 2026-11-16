import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { format } from "prettier";
const source = process.argv[2];
if (!source) throw Error("Pass the reviewed backend OpenAPI file path");
const raw = await readFile(source, "utf8"),
  document = JSON.parse(raw);
function type(schema) {
  if (schema === true || schema === undefined) return "unknown";
  if (schema === false) return "never";
  if (schema.$ref) {
    const name = schema.$ref.split("/").at(-1);
    if (!document.components.schemas[name]) throw Error("Unknown schema");
    return name;
  }
  if ("const" in schema) return JSON.stringify(schema.const);
  if (schema.enum)
    return schema.enum.map((value) => JSON.stringify(value)).join(" | ");
  if (schema.anyOf || schema.oneOf)
    return "(" + (schema.anyOf ?? schema.oneOf).map(type).join(" | ") + ")";
  if (schema.allOf) return "(" + schema.allOf.map(type).join(" & ") + ")";
  if (Array.isArray(schema.type))
    return schema.type
      .map((value) => type({ ...schema, type: value }))
      .join(" | ");
  if (schema.type === "null") return "null";
  if (schema.type === "string") return "string";
  if (["number", "integer"].includes(schema.type)) return "number";
  if (schema.type === "boolean") return "boolean";
  if (schema.type === "array") return "(" + type(schema.items) + ")[]";
  if (schema.type === "object" || schema.properties) {
    const required = new Set(schema.required ?? []),
      entries = Object.entries(schema.properties ?? {}).map(
        ([key, value]) =>
          JSON.stringify(key) +
          (required.has(key) ? "" : "?") +
          ": " +
          type(value) +
          ";",
      );
    if (!entries.length)
      return schema.additionalProperties === false
        ? "Record<string, never>"
        : "Record<string, " + type(schema.additionalProperties ?? true) + ">";
    if (schema.additionalProperties && schema.additionalProperties !== false)
      entries.push("[key: string]: unknown;");
    return "{ " + entries.join(" ") + " }";
  }
  return "unknown";
}
const response = (path, method = "get", status = "200") =>
  document.paths[path][method].responses[status].content["application/json"]
    .schema;
const mappings = {
  Session: response("/v1/session"),
  Usage: response("/v1/usage"),
  Project: response("/v1/projects/{projectId}"),
  ProjectList: response("/v1/projects"),
  CreatedProject: response("/v1/projects", "post", "201"),
  Defaults: response("/v1/me/defaults"),
  PlanCatalog: response("/v1/public/plans"),
  UploadPolicy: response("/v1/public/upload-policy"),
  UploadSession: response("/v1/uploads/{uploadId}"),
  Track: response("/v1/caption-tracks/{trackId}"),
  TrackList: response("/v1/projects/{projectId}/caption-tracks"),
  Transcript: response("/v1/transcripts/{versionId}"),
  TranscriptList: response("/v1/projects/{projectId}/transcripts"),
  Render: response("/v1/renders/{renderId}"),
  ExportFile: response("/v1/exports/{exportId}"),
  BillingSummary: response("/v1/billing/summary"),
  ManualRequest: response("/v1/billing/manual/requests/{transactionId}"),
  AdminSession: response("/v1/admin/session"),
  AdminSettings: response("/v1/admin/settings"),
  ComputeAccounts: response("/v1/admin/compute/accounts"),
  ComputeAccountInput:
    document.paths["/v1/admin/compute/accounts"].post.requestBody.content[
      "application/json"
    ].schema,
  ComputeAccountPatch:
    document.paths["/v1/admin/compute/accounts/{accountId}"].patch.requestBody
      .content["application/json"].schema,
  ManualPaymentReviews: response("/v1/admin/billing/manual-payments"),
};
if (document.paths["/v1/projects/{projectId}/activity"])
  mappings.ProjectActivity = response("/v1/projects/{projectId}/activity");
const text =
  "// Generated from reviewed backend OpenAPI; run scripts/generate-api.mjs.\n" +
  Object.entries({ ...document.components.schemas, ...mappings })
    .map(([name, schema]) => "export type " + name + " = " + type(schema) + ";")
    .join("\n");
await writeFile(
  "lib/contracts.ts",
  await format(text, { parser: "typescript" }),
);
// Explicit operator paths only. Webhooks, health and future admin APIs stay out.
const admin = new Set([
  "/v1/admin/session",
  "/v1/admin/settings",
  "/v1/admin/settings/{key}",
  "/v1/admin/compute/accounts",
  "/v1/admin/compute/accounts/{accountId}",
  "/v1/admin/compute/accounts/{accountId}/test",
  "/v1/admin/billing/manual-payments",
  "/v1/admin/billing/manual-payments/{transactionId}/approve",
  "/v1/admin/billing/manual-payments/{transactionId}/reject",
]);
const routes = Object.entries(document.paths)
  .filter(
    ([path]) =>
      path.startsWith("/v1/") &&
      !path.startsWith("/v1/webhooks/") &&
      (!path.startsWith("/v1/admin/") || admin.has(path)),
  )
  .flatMap(([path, methods]) =>
    Object.keys(methods)
      .filter((method) => ["get", "post", "patch", "delete"].includes(method))
      .map((method) => ({ path, method: method.toUpperCase() })),
  );
await writeFile("lib/routes.json", JSON.stringify(routes, null, 2) + "\n");
await writeFile(
  "lib/api-source.json",
  JSON.stringify(
    {
      sha256: createHash("sha256").update(raw).digest("hex"),
      schemaVersion: document.info.version,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  JSON.stringify({
    types: Object.keys(mappings).length,
    routes: routes.length,
  }),
);
