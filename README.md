# 📧 Email-Management-MCP

Este proyecto implementa un servidor **MCP (Model Context Protocol)** que permite interactuar con correos electrónicos a través de herramientas (`tools`) como **lectura de emails** y **simulación de envío**.  

Soporta tanto el modo **HTTP stream** como el modo **STDIO**.

---

## 🚀 Funcionalidades principales

- **fetch-emails**  
  Permite obtener correos desde un servidor IMAP, con filtros opcionales por asunto, remitente y rango de fechas.  

- **send-email-sim** ✅ *(nuevo)*  
  Simula el envío de un correo electrónico.  
  - No realiza ningún envío real.  
  - Registra en logs los valores recibidos.  
  - Devuelve una respuesta de confirmación.  

---

## 📂 Estructura de Tools

- `src/tools/email.ts` → Tool existente para leer correos (`fetch-emails`).  
- `src/tools/send-email-sim.ts` → Nueva tool para simular envío de correos.  
- `src/tools/index.ts` → Registro de todas las tools disponibles.  

---

## ⚙️ Cambios realizados

1. **Nuevo archivo**: `src/tools/send-email-sim.ts`  
   Implementa la lógica de la nueva tool `send-email-sim`.  

2. **Modificado**: `src/tools/index.ts`  
   Ahora registra también `send-email-sim`:  
   ```ts
   import { registerSendEmailSimTool } from "@/tools/send-email-sim";

   export function registerTools(server: McpServer) {
     registerEmailTools(server);
     registerSendEmailSimTool(server); // <-- agregado
   }

# 🧪 Cómo probar

## 1. Compilar el proyecto
```bash
pnpm run build
```

## 2. Levantar el servidor
```bash
pnpm run serve   # modo HTTP (http://localhost:5555/mcp)
```
o
```bash
pnpm run start   # modo STDIO
```

## 3. Inicializar una sesión MCP
Realiza una petición `initialize` al endpoint `/mcp`.  
La respuesta incluirá un `Mcp-Session-Id` en los headers.

## 4. Listar herramientas
Invoca `tools/list`.  
Verás registradas:
- `fetch-emails`
- `send-email-sim`

## 5. Llamar a la nueva tool
Envía un `tools/call` con los argumentos:
```json
{
  "name": "send-email-sim",
  "arguments": {
    "subject": "Prueba simulada",
    "to": "destinatario@ejemplo.com",
    "body": "Hola, esto es solo una simulación."
  }
}
```

## 6. Verificar resultado
- La respuesta incluirá un mensaje confirmando la simulación.  
- En la consola del servidor aparecerá un log con el detalle:
  ```
  [SIM-EMAIL 2025-09-03T10:00:00Z] to=destinatario@ejemplo.com | subject="Prueba simulada" | body="Hola, esto es solo una simulación."
  ```

---

# ✅ Resumen

- ➕ Se creó la tool `send-email-sim`.  
- ✏️ Se modificó `src/tools/index.ts` para registrarla.  
- 🔧 Ahora el sistema soporta la **simulación de envío de correos**, útil para pruebas sin depender de un servidor SMTP real.  