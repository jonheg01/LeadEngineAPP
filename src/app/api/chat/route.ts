import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface ChatRequest {
  message: string;
  sessionId: string;
  visitorInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

interface SuggestedAction {
  type: string;
  label: string;
  url?: string;
}

// Keyword-based routing for chat responses
function getRouteAndAction(message: string): {
  reply: string;
  suggestedAction?: SuggestedAction;
} {
  const lowerMessage = message.toLowerCase();

  // Buying intent
  if (
    lowerMessage.includes("buy") ||
    lowerMessage.includes("purchase") ||
    lowerMessage.includes("looking for")
  ) {
    return {
      reply:
        "Great! I'd love to help you find your next home. To get started, could you tell me your budget range and the areas you're interested in?",
      suggestedAction: {
        type: "quiz",
        label: "Take Home Match Quiz",
        url: "/quiz",
      },
    };
  }

  // Selling intent
  if (
    lowerMessage.includes("sell") ||
    lowerMessage.includes("list") ||
    lowerMessage.includes("selling")
  ) {
    return {
      reply:
        "Selling is an exciting decision! Let me help you understand your home's value and market opportunity. What's your property address?",
      suggestedAction: {
        type: "valuation",
        label: "Get Home Valuation",
        url: "/valuation",
      },
    };
  }

  // Market/pricing questions
  if (lowerMessage.includes("price") || lowerMessage.includes("market")) {
    return {
      reply:
        "The market varies by location and property type. I can help you understand your specific area's trends. What neighborhood or zip code are you curious about?",
      suggestedAction: {
        type: "search",
        label: "Browse Listings",
        url: "/listings",
      },
    };
  }

  // Mortgage/financing
  if (
    lowerMessage.includes("mortgage") ||
    lowerMessage.includes("finance") ||
    lowerMessage.includes("loan")
  ) {
    return {
      reply:
        "Mortgage options are crucial to your plan. While I can't advise on financing, I recommend speaking with a loan officer. Would you like me to connect you with a trusted partner?",
      suggestedAction: {
        type: "contact",
        label: "Schedule Consultation",
        url: "/contact",
      },
    };
  }

  // General question or default
  return {
    reply:
      "Thanks for reaching out! I'm here to help with buying, selling, valuations, and market insights. What can I assist you with today?",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, sessionId, visitorInfo } = body;

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: "Message and sessionId are required" },
        { status: 400 }
      );
    }

    // Trim and validate message
    const cleanMessage = message.trim();
    if (cleanMessage.length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    let contactId: string | null = null;

    // If visitor provided contact info, create/update lead
    if (visitorInfo?.email) {
      const { data: existing } = await supabase
        .from("contacts")
        .select("id")
        .eq("email", visitorInfo.email.toLowerCase().trim())
        .maybeSingle();

      if (existing) {
        contactId = existing.id;
      } else {
        const { data: newContact } = await supabase
          .from("contacts")
          .insert({
            name: visitorInfo.name?.trim() || "Chat Visitor",
            email: visitorInfo.email.toLowerCase().trim(),
            phone: visitorInfo.phone?.trim() || null,
            lead_type: "Inquirer",
            source: "Live Chat",
            probability: 1,
            last_contacted: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (newContact) {
          contactId = newContact.id;
          await supabase
            .from("contact_tags")
            .insert({ contact_id: newContact.id, tag: "Chat Engaged" });
        }
      }
    }

    // Log chat interaction
    const chatLog = {
      session_id: sessionId,
      contact_id: contactId,
      visitor_message: cleanMessage,
      timestamp: new Date().toISOString(),
    };

    // Insert into chat_logs table (create if doesn't exist)
    await supabase.from("chat_logs").insert(chatLog).catch(() => {
      // Table may not exist yet, silently fail
      console.log("Chat log table not yet created, skipping log");
    });

    // Get routing and suggested action
    const { reply, suggestedAction } = getRouteAndAction(cleanMessage);

    // Log activity if contact was created
    if (contactId) {
      await supabase.from("contact_activity").insert({
        contact_id: contactId,
        type: "chat_interaction",
        description: `Chat message: "${cleanMessage.substring(0, 100)}"`,
      });
    }

    return NextResponse.json({
      reply,
      suggestedAction,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
