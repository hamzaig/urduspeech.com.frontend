import { api, mutation } from "./api";
export interface DownloadGrant {
  ticket: string;
  expiresIn: number;
  action: string;
}
export function downloadForm(grant: DownloadGrant) {
  const action = new URL(grant.action);
  if (
    action.protocol !== "https:" ||
    action.username ||
    action.password ||
    action.pathname !== "/v1/downloads/stream" ||
    action.search ||
    action.hash ||
    !/^\d+$/.test(action.port || "443") ||
    (action.port && action.port !== "443") ||
    !/^[A-Za-z0-9_-]{43}$/.test(grant.ticket) ||
    grant.expiresIn !== 60
  )
    throw Error("DOWNLOAD_DESTINATION_INVALID");
  return { action: action.href, method: "POST" as const, ticket: grant.ticket };
}
export async function startDownload(path: string) {
  if (!/^\/v1\/(exports|renders|assets)\/[a-f0-9-]{36}\/download$/.test(path))
    throw Error("DOWNLOAD_PATH_INVALID");
  const grant = downloadForm(
    await api<DownloadGrant>(
      path.replace(/\/download$/, "/download-ticket"),
      mutation("POST", {}),
    ),
  );
  const form = document.createElement("form"),
    input = document.createElement("input");
  form.action = grant.action;
  form.method = grant.method;
  form.enctype = "application/x-www-form-urlencoded";
  form.hidden = true;
  form.acceptCharset = "UTF-8";
  input.type = "hidden";
  input.name = "ticket";
  input.value = grant.ticket;
  form.append(input);
  document.body.append(form);
  form.submit();
  setTimeout(() => form.remove(), 60000);
}
