/**
 * Discord webhook notification utility
 * Used to send notifications to Discord channels
 */

// Discord webhook URL - Default for Dident, can be overridden in .env file
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1371921733023694939/ap5nLwqvrByoSQ6sQRJFSbZ414y4oOIBJ4k43l0EQCBiENPPjgoydmu3dfIXuYqeHfXP';

// Backup webhook URL in case primary fails
const BACKUP_DISCORD_WEBHOOK_URL = process.env.BACKUP_DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1371921733023694939/ap5nLwqvrByoSQ6sQRJFSbZ414y4oOIBJ4k43l0EQCBiENPPjgoydmu3dfIXuYqeHfXP';

// Custom emoji for type of notification
const EMOJI_MAP: Record<string, string> = {
  lead: '🎯',
  booking: '📅',
  contact: '📋',
  error: '❌',
  success: '✅',
};

interface DiscordMessageField {
  name: string;
  value: string;
  inline?: boolean;
}

interface DiscordMessage {
  username?: string;
  avatar_url?: string;
  content?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    fields?: DiscordMessageField[];
    footer?: {
      text: string;
      icon_url?: string;
    };
    timestamp?: string;
  }>;
}

/**
 * Helper function to mask sensitive information like email and phone
 * Displays first and last character with asterisks in between
 */
function maskSensitiveInfo(text: string, keepStartChars: number = 1, keepEndChars: number = 1): string {
  if (!text || text.length <= (keepStartChars + keepEndChars)) return text;
  
  const start = text.substring(0, keepStartChars);
  const end = text.substring(text.length - keepEndChars);
  const maskedLength = text.length - (keepStartChars + keepEndChars);
  const masked = '*'.repeat(Math.min(maskedLength, 5)); // Limit to max 5 asterisks
  
  return `${start}${masked}${end}`;
}

/**
 * Send a notification to Discord
 */
export async function sendDiscordNotification(
  type: 'lead' | 'booking' | 'contact' | 'error' | 'success',
  title: string,
  fields: DiscordMessageField[],
  description?: string,
  footer?: string
): Promise<boolean> {
  // Create message payload
  const message: DiscordMessage = {
    username: 'Dident Tannlegesenter',
    avatar_url: 'https://dident.no/images/logo/logo-square.png',
    embeds: [
      {
        title: `${EMOJI_MAP[type] || ''} ${title}`,
        description,
        color: type === 'lead' ? 0x4A6741 : type === 'error' ? 0xED4245 : 0x5865F2,
        fields,
        footer: {
          text: footer || 'Dident Tannlegesenter | Automatisk notifikasjon',
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  // Try primary webhook
  try {
    // Send to Discord
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error sending Discord notification (Status ${response.status}):`, errorText);
      throw new Error(`Discord API error: ${response.status} ${errorText}`);
    }

    return true;
  } catch (primaryError) {
    console.error('Failed to send Discord notification to primary webhook:', primaryError);
    
    // Try backup webhook if primary fails
    if (BACKUP_DISCORD_WEBHOOK_URL && BACKUP_DISCORD_WEBHOOK_URL !== DISCORD_WEBHOOK_URL) {
      try {
        const backupResponse = await fetch(BACKUP_DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });

        if (!backupResponse.ok) {
          console.error('Error sending to backup Discord webhook:', await backupResponse.text());
          return false;
        }

        console.log('Notification sent via backup Discord webhook');
        return true;
      } catch (backupError) {
        console.error('Both primary and backup Discord webhooks failed:', backupError);
        return false;
      }
    }
    
    return false;
  }
}

/**
 * Format lead data for Discord notification
 */
export function formatLeadForDiscord(
  leadData: any
): { title: string; fields: DiscordMessageField[]; footer?: string } {
  // Create contact section fields with masked sensitive information
  const contactFields: DiscordMessageField[] = [
    {
      name: 'Kontaktinformasjon',
      value: [
        `**Navn:** ${leadData.name}`,
        `**E-post:** ${maskSensitiveInfo(leadData.email, 2, 4)}`,
        `**Telefon:** ${maskSensitiveInfo(leadData.phone, 2, 2)}`,
      ].join('\n'),
      inline: false,
    },
  ];

  // Create message field if present
  if (leadData.message) {
    contactFields.push({
      name: 'Melding',
      value: leadData.message,
      inline: false,
    });
  }

  // Create appointment fields if present
  const detailFields: DiscordMessageField[] = [
    {
      name: 'Detaljer',
      value: [
        `**Tjeneste:** ${leadData.treatment || 'Generell henvendelse'}`,
        leadData.preferredDate ? `**Ønsket dato:** ${leadData.preferredDate}` : '',
        leadData.preferredTime ? `**Ønsket tidspunkt:** ${leadData.preferredTime}` : '',
      ].filter(Boolean).join('\n'),
      inline: false,
    },
  ];

  // Add source information
  const sourceFields: DiscordMessageField[] = [
    {
      name: 'Kilde',
      value: [
        `**Kilde:** ${leadData.source || 'kontaktskjema'}`,
        `**Side:** ${leadData.landingPage || '/'}`,
      ].join('\n'),
      inline: false,
    },
  ];

  // Add call-to-action field
  const ctaField: DiscordMessageField = {
    name: 'Neste steg',
    value: 'React with ✅ to claim this lead for outreach',
    inline: false
  };

  return {
    title: 'Ny Lead - Tannlegetjenester',
    fields: [...contactFields, ...detailFields, ...sourceFields, ctaField],
    footer: `Lead ID: ${leadData.id || 'Ukjent'}`
  };
}

/**
 * Format contact data for Discord notification
 */
export function formatContactForDiscord(
  contactData: any
): { title: string; fields: DiscordMessageField[]; footer?: string } {
  const customerTypeMap: Record<string, string> = {
    private: "Privat",
    business: "Bedrift",
  };

  // Create contact section fields with masked sensitive information
  const contactFields: DiscordMessageField[] = [
    {
      name: 'Kontaktinformasjon',
      value: [
        `**Navn:** ${contactData.name}`,
        `**E-post:** ${maskSensitiveInfo(contactData.email, 2, 4)}`,
        `**Telefon:** ${maskSensitiveInfo(contactData.phone, 2, 2)}`,
        contactData.address ? `**Adresse:** ${contactData.address}` : '',
        contactData.company ? `**Firma:** ${contactData.company}` : '',
        contactData.customerType ? `**Kundetype:** ${customerTypeMap[contactData.customerType] || contactData.customerType}` : '',
      ].filter(Boolean).join('\n'),
      inline: false,
    },
  ];

  // Create message field if present
  if (contactData.message) {
    contactFields.push({
      name: 'Melding',
      value: contactData.message,
      inline: false,
    });
  }

  // Add source information if available
  const sourceFields: DiscordMessageField[] = [];
  if (contactData.source || contactData.landingPage) {
    sourceFields.push({
      name: 'Kilde',
      value: [
        contactData.source ? `**Kilde:** ${contactData.source}` : '**Kilde:** kontaktskjema',
        contactData.landingPage ? `**Side:** ${contactData.landingPage}` : '',
      ].filter(Boolean).join('\n'),
      inline: false,
    });
  }

  // Add call-to-action field
  const ctaField: DiscordMessageField = {
    name: 'Neste steg',
    value: 'React with ✅ to claim this contact for follow-up',
    inline: false
  };

  return {
    title: 'Ny Henvendelse - Kontaktskjema',
    fields: [...contactFields, ...sourceFields, ctaField],
  };
}