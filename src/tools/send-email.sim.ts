import { Logger } from "@/utils/logger";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";

export function registerSendEmailSimTool(server: McpServer) {
  server.registerTool(
    "send-email-sim",
    {
      title: "Simulate Email Send",
      description: "Simula el envío de un email (no se envía realmente, solo se registra en el log).",
      inputSchema: {
        subject: z.string().describe("Asunto del email"),
        to: z.string().describe("Dirección de destino"),
        body: z.string().describe("Contenido del email")
      },
      outputSchema: {
        ok: z.boolean(),
        message: z.string(),
        echo: z.object({
          subject: z.string(),
          to: z.string(),
          body: z.string()
        })
      }
    },
    async (params) => {
      const { subject, to, body } = params || {};
      if (!subject || !to || !body) {
        return {
          isError: true,
          content: [{ type: "text", text: "Faltan: subject, to, body" }]
        };
      }

      const stamp = new Date().toISOString();
      const logLine = `[SIM-EMAIL ${stamp}] to=${to} | subject="${subject}" | body="${String(body).slice(0, 500)}${String(body).length > 500 ? "..." : ""}"`;
      Logger.info(logLine);

      return {
        content: [
          { type: "text", text: `OK: simulado envío a ${to}` },
          { type: "text", text: logLine }
        ],
        structuredContent: {
          ok: true,
          message: "Email simulado correctamente (no se envió nada real).",
          echo: { subject, to, body }
        }
      };
    }
  );

  Logger.info("SendEmailSim tool registered", true);
}
