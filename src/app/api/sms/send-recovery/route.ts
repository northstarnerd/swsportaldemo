import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const phoneNumber = (body.phoneNumber || "").trim();
    const accountNumber = (body.accountNumber || "SWS-89545").trim();
    const customerName = (body.customerName || "Patrick Badley").trim();
    const amount = typeof body.amount === "number" ? body.amount : 94.5;
    const service = (body.service || "Quarterly Trash & Organics").trim();
    const address = (body.address || "Eden Prairie, MN (Route 4)").trim();

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }

    // Determine request host to construct universal recovery URL
    const origin =
      request.headers.get("origin") ||
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      "http://localhost:3002";

    const protocol = origin.startsWith("http")
      ? ""
      : origin.includes("localhost")
      ? "http://"
      : "https://";
    const baseUrl = origin.startsWith("http") ? origin : `${protocol}${origin}`;

    // Create a self-contained, stateless base64url recovery token
    const tokenPayload = {
      acc: accountNumber,
      name: customerName,
      amt: amount,
      srv: service,
      addr: address,
      ts: Date.now(),
    };
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString("base64url");
    const paymentUrl = `${baseUrl}/pay/${token}`;

    const firstName = customerName.split(" ")[0] || "Customer";
    const formattedAmount = amount.toFixed(2);
    const messageBody = `⚠️ SWS Billing Alert: Hi ${firstName}, your quarterly balance of $${formattedAmount} is past due. Tap to clear your balance via 1-click Apple Pay & confirm Thursday pickup: ${paymentUrl}`;

    // Check for Twilio Credentials
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_PHONE_NUMBER;

    const isTwilioConfigured =
      Boolean(twilioSid) &&
      Boolean(twilioAuth) &&
      Boolean(twilioFrom) &&
      !twilioSid?.startsWith("placeholder") &&
      !twilioAuth?.startsWith("placeholder");

    if (isTwilioConfigured && twilioSid && twilioAuth && twilioFrom) {
      // Send real SMS via Twilio Messages API
      const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const basicAuth = Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64");

      // Format recipient E.164 (defaults to US +1 if 10 digits)
      const cleanedPhone = phoneNumber.replace(/\D/g, "");
      const formattedTo =
        cleanedPhone.length === 10
          ? `+1${cleanedPhone}`
          : cleanedPhone.length === 11 && cleanedPhone.startsWith("1")
          ? `+${cleanedPhone}`
          : phoneNumber.startsWith("+")
          ? phoneNumber
          : `+1${cleanedPhone}`;

      const formData = new URLSearchParams();
      formData.append("To", formattedTo);
      formData.append("From", twilioFrom);
      formData.append("Body", messageBody);

      const twilioRes = await fetch(twilioEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const twilioData = await twilioRes.json().catch(() => ({}));

      if (!twilioRes.ok) {
        console.error("Twilio SMS error:", twilioData);
        // Fallback gracefully with simulated result and diagnostic error
        return NextResponse.json({
          success: true,
          simulated: true,
          liveAttemptFailed: true,
          twilioError: twilioData.message || "Failed to send via Twilio carrier.",
          recipient: formattedTo,
          paymentUrl,
          messageBody,
          accountNumber,
          customerName,
          amount,
        });
      }

      return NextResponse.json({
        success: true,
        simulated: false,
        messageSid: twilioData.sid,
        recipient: formattedTo,
        paymentUrl,
        messageBody,
        accountNumber,
        customerName,
        amount,
      });
    }

    // Simulated Mode: Twilio credentials not configured
    return NextResponse.json({
      success: true,
      simulated: true,
      recipient: phoneNumber,
      paymentUrl,
      messageBody,
      accountNumber,
      customerName,
      amount,
      notice:
        "Twilio credentials not configured in .env.local. Operating in high-fidelity simulated SMS mode.",
    });
  } catch (error: any) {
    console.error("SMS Recovery dispatch error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
