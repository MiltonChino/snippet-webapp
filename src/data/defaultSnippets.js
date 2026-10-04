export const defaultSnippets = [
  {
    id: "h2o-opening-en",
    title: "Opening Script (English)",
    content: `Greeting: "Thank you for calling H2o Wireless. My name is Milton. Who do I have the pleasure of speaking with?"

- Customer or Dealer Check: "Are you a customer or a Dealer?"
- If Dealer: Ask for their Dealer Code.
- Callback Number: "In case the call gets disconnected, may I have a phone number where I can call you back?"
- Inquire: "Thank you for the information provided. How can I help you today?"
- Inconvenience Handling: "Oh, I am sorry to know / hear you were having difficulty with [processing the payment / service]. However, I will be more than happy to assist you in [processing your payment / resolving your issue] successfully."`,
    tags: ["Call Flow", "Opening", "English"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-opening-es",
    title: "Opening Script (Spanish)",
    content: `Saludo: "Hola gracias por llamar a H2O Wireless mi nombre es Milton, ¿con quién tengo el gusto de hablar?"

- Atención: "Hola [Nombre], ¿Cómo le colaboro en el día de hoy?"
- Cliente o Distribuidor: "¿Es usted un proveedor o un cliente?"
- Número de Respaldo: "¿Me permite un número de teléfono al que le pueda llamar si la llamada se desconecta?"
- Datos de cuenta: "¿Me permite el número que tiene activo en H2O? ¿Me permite el pin de acceso?"
- Propósito: "¿Usted desea hacer un pago o desea cambiar el plan? Será un placer asistirle."`,
    tags: ["Call Flow", "Opening", "Spanish"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-closing-en-es",
    title: "Closing Script (English & Spanish)",
    content: `Closing Script (English):
- Help: "Is there anything else that I may help you with today?"
- Reconfirm: "So you called today to [confirm issue / request]...?"
- Brand: "Thanks for calling H2O Wireless."
- Social: "Remember to follow us on social media."
- Survey: "...and you will receive a survey at the end to qualify my performance. Good bye."

Cierre de la Llamada (Spanish):
- Reconfirmar: "Entonces usted llamó hoy para [confirmar el por qué llamó]..."
- Ayuda: "¿Entonces hay algo más que le pueda ayudar hoy?"
- Despedida: "Pues gracias por llamar a H2O Wireless, recuerde seguirnos en las redes sociales y al final no olvide calificar mi desempeño en la encuesta que recibirá. Tenga un bonito día."`,
    tags: ["Call Flow", "Closing"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-payment-methods",
    title: "Payment Options & Over-the-Phone Process",
    content: `Available Recharge Channels:
- AutoPay
- IVR
- Website
- Check
- Over the Phone (with agent)

Over the Phone Payment Procedure:
1. Confirm Info: CC/DC (must be valid in US), Address, Account holder name.
2. Process:
   - Lock the call: press #[IVR Code]# (e.g. #1023#)
   - Prompt customer to type card details on their keypad.
   - Confirm billing info.
   - Complete payment.
   - Mention $3 convenience fee before finalizing.`,
    tags: ["Payments", "Process"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-locking-call",
    title: "Locking a Call (Credit Cards & IVR)",
    content: `Securing Card Details on 3CX:
- Purpose: Capture sensitive credit card details securely.
- How to lock: Dial #[IVR Lock Code]# (e.g., #1023#).
- Success indicator: Tone is played, lock icon on 3CX turns green.
- Mistake / Clear Tag: Press #0# to clear active call tag (used for transfer/mistakes).
- Security: During lock, customer hears agent, but agent CANNOT hear customer (prevents DTMF tones from being audible).
- Drop limit: If agent fails to lock, system drops call automatically after customer keys the 8th digit.
- Convenience Fee: If paying via IVR/CS Rep, confirm if they are OK to pay the $3 fee.
  *11 for English
  *21 for Spanish`,
    tags: ["Payments", "Security"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-sales-new-esim",
    title: "Sales: New eSIM Activation",
    content: `New eSIM Activation Path:
Activate > Sim card > Order#, email, ZIP code > Confirm Info > Activate > Confirm info > Confirm plan > Confirm Area code > Review > Submit.

Note: eSIM and SIM card are interchangeable. No need to purchase a new eSIM if they already have a SIM card.`,
    tags: ["Sales", "eSIM", "Activation"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-sales-esim-port",
    title: "Sales: eSIM Port-In Process",
    content: `eSIM Port-In Path:
Port in > SIM or eSIM > Enter MDN# > Order#, email, ZIP > Confirm info and submit.

Required from old provider to Port In:
- Account number
- Account PIN/Password
- MDN (Mobile Directory Number)
- H2O SIM/eSIM card`,
    tags: ["Sales", "eSIM", "Port In"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-sales-new-sim",
    title: "Sales: New Physical SIM Activation",
    content: `Physical SIM Activation Path:
Card at hand > follow "Activate" flow (similar to new eSIM) > Double-check shipping address.

Carrier Shipments:
- SIM Chips: Shipped via USPS.
- Phones: Shipped via FedEx.`,
    tags: ["Sales", "SIM", "Activation"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-account-changes",
    title: "Account Updates & Plan Switch List",
    content: `SIM Changes:
- eSIM to SIM card
- SIM card to eSIM
- Change phone eSIM
- Change phone SIMc (physical)
- Change phone and eSIM to SIMc
- Change phone and SIMc to eSIM

Plan Changes:
- Upgrade plan
- Downgrade plan
- Plan switch

Other Changes:
- Port out
- Cancel service`,
    tags: ["Account Info", "Process"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-verification-crm",
    title: "Verification: CRM Access Pin & Ownership",
    content: `Ownership Verification in CRM:
Verify using [Access PIN + 3 Outbound Calls] OR [3 Account Infos] if you have access to CRM:

Applies to the following cases:
- Change plan
- Change expiration date
- Retrieve PUK code
- Check MDN status
- Update IMEI, reset or remove features
- Auto pay update or cancel

Procedures requiring Access PIN & 3 Outbound Calls:
- SIM change (physical to eSIM, eSIM move to another phone, eSIM to physical)
- Port out info
- MDN change
- Unlink a ML (Multi-Line) or FP (Family Plan)`,
    tags: ["Verification", "CRM"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-verification-no-calls",
    title: "Verification: No Outbound Calls or No CRM Access",
    content: `Alternative Ownership Verification:

1. No Outbound Calls on Account:
   - Ask for 6 account infos to confirm ownership.

2. No CRM Access (Alternative):
   - Require 3 outbound calls AND 3 account infos to confirm own.
   - If they do not have the outbound calls, then require 6 account infos.
   - NO Toll-Free (TF) numbers are accepted for calls verification.`,
    tags: ["Verification", "Rules"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-apn-troubleshooting",
    title: "Troubleshooting: APN Internet Setup (Android)",
    content: `Slow Internet / Data Troubleshooting (Android):
1. General troubleshooting first.
2. Check phone model -> Find instructions in helpforsmartphones.
3. Guide user to configure APN manually with the following settings:
   - Name: h2ointernet
   - APN: prodata
   - MMSC: http://mmsc.mobile.att.net
   - MMS Proxy: proxy.mobile.att.net
   - MMS Port: 80
   - APN Type: default
   - APN Protocol: Ipv4

* Note for iPhone: iPhones never need to configure the APN manually.`,
    tags: ["Troubleshooting", "APN", "Android"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-device-compatibility",
    title: "Troubleshooting: Device & Band Compatibility",
    content: `Device Compatibility Checks:
- Ask: "Can I have your IMEI?" (Dial *#06# on phone).
- Lookup tools:
  * Model checker: imei.info
  * Tech specs: gsmarena.com or devicespecifications.com
  * Check: Settings > About Phone on customer's device.

Android Compatibility:
- Android OS/software version 11 or higher.
- Frequency Bands required: 2, 4, 17, or 30 (must support at least 3 of these bands; less than three is not good).
- Note: Android and iPhone share the same required frequency bands.

iPhone Compatibility:
- iPhone 8 or newer (iPhone 6/7 are not allowed / soon outdated).
- iOS version 15.3.1 or higher.`,
    tags: ["Troubleshooting", "Compatibility", "IMEI"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-ld-troubleshooting",
    title: "Troubleshooting: Long Distance & International (TS LD)",
    content: `LD Unlimited Rules:
- Countries: China, India, Mexico, Monaco, and others.
- Unlimited Limit: Max 15 unique numbers per month. A 16th number in the same month will be charged. Resets next month.
- Dialing Rules:
  * Dominican Republic (RD) and Canada: 1 + Destination number.
  * Other countries: 011 + Country Code + Destination number.

TS LD (PROBLEMAS DE LLAMADAS INTERNACIONALES) Info Gathering:
1. Confirmar a dónde llama el cliente.
2. ¿Cuál es el error que da cuando llama?
3. ¿Desde cuándo tiene el problema?
4. ¿Cómo marca?
5. ¿Con cuántos números tiene el mismo problema?

Troubleshooting Steps:
1. Reset ILD.
2. Sent OTA (Over-the-Air configuration).
3. Suspender la cuenta por 5 minutos y reactivar.
4. Pedirle al cliente que reinicie el teléfono y trate de hacer la llamada directa.`,
    tags: ["Troubleshooting", "LD", "International"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-refund-policy",
    title: "Policies: Refund Guidelines",
    content: `Refund Policy:
- No refunds are given from a store or third party.
- Only refunds issued directly:
  1. Refund for double payment.
  2. No compatibility without usage of service.`,
    tags: ["Policies", "Refund"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-multiline-setup",
    title: "Multi-Line (ML) Existing Line Setup",
    content: `Steps for Multi-Line with an existing line:
1. The existing line must be on the $30 or $50 plan.
2. The existing line must be expired so that after the activation or port-in of the other line is completed, payment can be made.
3. The customer must purchase an LP SIM card (CRM SIM card) WITH NO BALANCE to complete the process with the existing number.
4. The customer should call us after obtaining the LP SIM to start the activation or port-in process with an agent.
5. On the line already in the portal, select "ADD A LINE" to begin linking the SIM for port-in or new MDN.`,
    tags: ["Account Info", "Multi-Line"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-extensiones-es",
    title: "Extensiones (Spanish Template)",
    content: `Cuando un cliente pida extensión por favor agregar las siguientes informaciones:

Fecha de activación: [Fecha]
Le han dado extensiones antes: [Sí / No]
Cuando fue la última: [Fecha]
Cuantos días pide: [Días]
Está expirada la cuenta o no: [Sí / No]

Hold Rules:
- Hold limit is strictly 2 minutes.
- If more time is needed, return to customer and ask for permission before placing on hold again.`,
    tags: ["Extensions", "Spanish"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-note-change-plan",
    title: "Note Template: Change Plan",
    content: `Name: [Name]
MDN: [MDN]
IB: [Inbound MDN]
CB: [Callback Number]
Issue: Change plan
Resolution: confirm ownership with 3 ob calls([Call 1, Date], [Call 2, Date], [Call 3, Date]), plan updated
Agent: Milton C
Access PIN: [PIN]`,
    tags: ["Note Templates", "Plan Change"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-note-balance-inquiry",
    title: "Note Template: Balance Inquiry & PIN Reset",
    content: `Name: [Name]
MDN: [MDN]
IB: [Inbound MDN]
CB: [Callback Number]
Issue: Balance inquiry
Resolution: pin reset shared balance
Agent: Milton C
Access PIN: [PIN]`,
    tags: ["Note Templates", "Balance", "PIN Reset"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-note-no-access",
    title: "Note Template: No Access (Declined)",
    content: `Name: [Name]
MDN: [MDN]
IB: [Inbound MDN]
CB: [Callback Number]
Issue: Change status
Resolution: No access, client cannot share any account info.
Agent: Milton C`,
    tags: ["Note Templates", "No Access"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-features-reset",
    title: "Troubleshooting: CRM Features Reset & Definitions",
    content: `Definitions:
- Hotspot: Mobile tethering. Check status in features list.
- VoLTE: Reset for calls issues, bad signal, or bad call quality.
- VM (Voicemail) PIN reset: Requires ownership verification (3 outbound calls or 3 infos).

Troubleshooting:
- You can reset any feature in CRM if client complains service is not good.
- Note: Hotspot and other complex features are out of the list and must be escalated to second level for reset/troubleshooting if simple reset fails.`,
    tags: ["Troubleshooting", "Features"],
    createdAt: new Date().toISOString()
  },
  {
    id: "h2o-miscellaneous",
    title: "Miscellaneous Info & Schedule Rules",
    content: `Miscellaneous Details:
- All monthly plans have 5000 MMS included.
- Annual plans (100, 150, 300) also have it.
- Expiration date is 30 days (Day 1 is activation day, then count 29 more days).
- Balance checking: SMS "BAL" to 327986787 or on website with MDN and PIN.
- Networks: We use AT&T signal towers. Other carriers use AT&T and Verizon.
- Best plan: 2 lines per month.
- SIM cards: Must be from 2021 or later.

Shift/Break schedule rules:
- Lunch breaks: 20, 30, or 60 minutes.
- 5 hours worked: 10 minutes break allowed.
- 6 hours worked: 10 minutes break twice (separately, not 20 minutes combined).`,
    tags: ["Policies", "Schedule"],
    createdAt: new Date().toISOString()
  }
];
