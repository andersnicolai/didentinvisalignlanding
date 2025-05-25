import { NextResponse } from "next/server";
import { sendDiscordNotification } from "@/utils/discord";

// Reference to the lead storage from the parent module
// In a real implementation, this would be a database query
const leadsStorage: Record<string, any> = {};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.leadId || !data.claimedBy) {
      return NextResponse.json(
        { error: "Missing required fields: leadId and claimedBy are required" },
        { status: 400 }
      );
    }

    const { leadId, claimedBy, notes } = data;
    
    // Check if lead exists
    if (!leadsStorage[leadId]) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }
    
    // Check if lead is already claimed
    if (leadsStorage[leadId].handledBy) {
      return NextResponse.json(
        { error: "Lead already claimed by " + leadsStorage[leadId].handledBy },
        { status: 409 }
      );
    }
    
    // Update lead status
    leadsStorage[leadId].status = 'claimed';
    leadsStorage[leadId].handledBy = claimedBy;
    leadsStorage[leadId].claimedAt = new Date().toISOString();
    if (notes) {
      leadsStorage[leadId].notes = notes;
    }
    
    // Send notification about the claimed lead
    try {
      await sendDiscordNotification('success', 'Lead Claimed', [
        {
          name: 'Lead Details',
          value: [
            `**Lead ID:** ${leadId}`,
            `**Name:** ${leadsStorage[leadId].name}`,
            `**Treatment:** ${leadsStorage[leadId].treatment}`,
          ].join('\n'),
          inline: false
        },
        {
          name: 'Claimed By',
          value: claimedBy,
          inline: false
        },
        notes ? {
          name: 'Notes',
          value: notes,
          inline: false
        } : null
      ].filter(Boolean), 'This lead has been claimed for follow-up');
    } catch (error) {
      console.error('Error sending claim notification:', error);
      // Continue even if notification fails
    }
    
    return NextResponse.json({
      success: true,
      message: "Lead claimed successfully",
      leadId,
      claimedBy,
      claimedAt: leadsStorage[leadId].claimedAt
    });
  } catch (error) {
    console.error("Error claiming lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to check if a lead is claimed
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const leadId = searchParams.get('leadId');
  
  if (!leadId) {
    return NextResponse.json(
      { error: "Missing required parameter: leadId" },
      { status: 400 }
    );
  }
  
  if (!leadsStorage[leadId]) {
    return NextResponse.json(
      { error: "Lead not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    leadId,
    status: leadsStorage[leadId].status,
    claimed: !!leadsStorage[leadId].handledBy,
    claimedBy: leadsStorage[leadId].handledBy,
    claimedAt: leadsStorage[leadId].claimedAt
  });
} 