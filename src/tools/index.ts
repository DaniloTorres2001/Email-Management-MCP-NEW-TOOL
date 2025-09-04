import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

import { registerEmailTools } from "@/tools/email";
import { registerSendEmailSimTool } from "@/tools/send-email.sim";

export function registerTools(server: McpServer) {
  registerEmailTools(server);
  registerSendEmailSimTool(server); // <-- NUEVO
}