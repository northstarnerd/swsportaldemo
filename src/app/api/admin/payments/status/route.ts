import { NextResponse } from "next/server";
import {
  recordPayment,
  getRecordedPayments,
  getPaymentForAccount,
  resetPaymentStore,
} from "@/lib/paymentStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountNumber = searchParams.get("accountNumber");

    if (accountNumber) {
      const payment = getPaymentForAccount(accountNumber);
      return NextResponse.json({
        success: true,
        isPaid: Boolean(payment),
        payment: payment || null,
      });
    }

    const payments = getRecordedPayments();
    return NextResponse.json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve payment status" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    if (body.action === "reset") {
      resetPaymentStore();
      return NextResponse.json({
        success: true,
        reset: true,
        message: "Payment state reset successfully",
      });
    }

    const accountNumber = (body.accountNumber || "").trim();
    if (!accountNumber) {
      return NextResponse.json(
        { success: false, error: "accountNumber is required" },
        { status: 400 }
      );
    }

    const recorded = recordPayment({
      accountNumber,
      customerName: body.customerName || "Customer",
      amount: typeof body.amount === "number" ? body.amount : 94.5,
      paymentMethod: body.paymentMethod || "Apple Pay",
      confirmationCode: body.confirmationCode,
    });

    return NextResponse.json({
      success: true,
      payment: recorded,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to record payment" },
      { status: 500 }
    );
  }
}
