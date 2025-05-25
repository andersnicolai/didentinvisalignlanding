/**
 * VekstBoost Growth Engine Connector
 * 
 * This module provides the primary integration point for connecting 
 * any Next.js site to the VekstBoost Growth Engine.
 * 
 * @author Nicolai @ OnedevConsultancy
 */

type VekstBoostConfig = {
  siteId: string;
  apiKey: string;
  discordWebhookUrl?: string;
  contentTypes?: Array<'blog' | 'service' | 'product' | 'testimonial'>;
  industries?: string[];
  leadCapture?: boolean;
  automaticPosting?: boolean;
  postingFrequency?: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  seoOptimization?: boolean;
  language?: 'en' | 'no' | 'sv' | 'da';
};

const DEFAULT_CONFIG: Partial<VekstBoostConfig> = {
  contentTypes: ['blog'],
  leadCapture: true,
  automaticPosting: true,
  postingFrequency: 'weekly',
  seoOptimization: true,
  language: 'no',
};

class VekstBoostEngine {
  private config: VekstBoostConfig;
  private initialized: boolean = false;
  private apiEndpoint: string = 'https://api.vekstboost.com/v1';

  constructor(config: VekstBoostConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Initialize the VekstBoost Growth Engine
   */
  async initialize(): Promise<boolean> {
    console.log('🦁 Initializing VekstBoost Growth Engine...');
    
    try {
      // Register this site with the VekstBoost API
      const response = await fetch(`${this.apiEndpoint}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          siteId: this.config.siteId,
          contentTypes: this.config.contentTypes,
          industries: this.config.industries,
          language: this.config.language,
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to initialize VekstBoost: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('🦁 VekstBoost Growth Engine initialized successfully!', data);
      
      this.initialized = true;
      
      // Set up webhook for Discord notifications if provided
      if (this.config.discordWebhookUrl) {
        await this.setupDiscordIntegration();
      }

      // If automatic posting is enabled, set up the content generation schedule
      if (this.config.automaticPosting) {
        await this.setupContentSchedule();
      }

      return true;
    } catch (error) {
      console.error('❌ VekstBoost initialization failed:', error);
      return false;
    }
  }

  /**
   * Set up Discord integration for lead notifications
   */
  private async setupDiscordIntegration(): Promise<void> {
    console.log('🔔 Setting up Discord notifications...');
    
    try {
      const response = await fetch(`${this.apiEndpoint}/integrations/discord`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          siteId: this.config.siteId,
          webhookUrl: this.config.discordWebhookUrl,
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to set up Discord integration: ${response.statusText}`);
      }

      console.log('🔔 Discord integration configured successfully!');
    } catch (error) {
      console.error('❌ Discord integration setup failed:', error);
    }
  }

  /**
   * Set up the content generation schedule
   */
  private async setupContentSchedule(): Promise<void> {
    console.log('📅 Setting up automated content schedule...');
    
    try {
      const response = await fetch(`${this.apiEndpoint}/content/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          siteId: this.config.siteId,
          frequency: this.config.postingFrequency,
          contentTypes: this.config.contentTypes,
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to set up content schedule: ${response.statusText}`);
      }

      console.log('📅 Automated content schedule configured successfully!');
    } catch (error) {
      console.error('❌ Content schedule setup failed:', error);
    }
  }

  /**
   * Fetch the latest generated content
   */
  async getLatestContent(contentType: 'blog' | 'service' | 'product' | 'testimonial' = 'blog', limit: number = 10): Promise<any[]> {
    if (!this.initialized) {
      console.warn('⚠️ VekstBoost not initialized! Call initialize() first.');
      return [];
    }

    try {
      const response = await fetch(`${this.apiEndpoint}/content/${contentType}?limit=${limit}&siteId=${this.config.siteId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ Failed to fetch ${contentType} content:`, error);
      return [];
    }
  }

  /**
   * Manually trigger content generation
   */
  async generateContent(contentType: 'blog' | 'service' | 'product' | 'testimonial' = 'blog', options: any = {}): Promise<any> {
    if (!this.initialized) {
      console.warn('⚠️ VekstBoost not initialized! Call initialize() first.');
      return null;
    }

    try {
      const response = await fetch(`${this.apiEndpoint}/content/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          siteId: this.config.siteId,
          contentType,
          options
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to generate content: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Content generation failed:', error);
      return null;
    }
  }

  /**
   * Track a lead submission from the website
   */
  async trackLead(leadData: any): Promise<boolean> {
    if (!this.initialized) {
      console.warn('⚠️ VekstBoost not initialized! Call initialize() first.');
      return false;
    }

    try {
      const response = await fetch(`${this.apiEndpoint}/leads/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          siteId: this.config.siteId,
          leadData
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to track lead: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('❌ Lead tracking failed:', error);
      return false;
    }
  }
}

// Export a function to create a new VekstBoost instance
export const createVekstBoost = (config: VekstBoostConfig): VekstBoostEngine => {
  return new VekstBoostEngine(config);
};

export type { VekstBoostConfig };
export default VekstBoostEngine; 