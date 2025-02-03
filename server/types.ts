export interface UserData {
  em?: string[]; // Hashed emails
  ph?: string[]; // Hashed phone numbers
  fn?: string[]; // Hashed first names
  ln?: string[]; // Hashed last names
  ct?: string[]; // Hashed cities
  st?: string[]; // Hashed states
  zp?: string[]; // Hashed zip codes
  country?: string[]; // Hashed countries
  external_id?: string[]; // Hashed external IDs
}

export interface CustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  contents?: Array<{
    id: string;
    quantity: number;
  }>;
  num_items?: number;
  status?: string;
  search_string?: string;
}

export interface ConversionEvent {
  eventName: string;
  userData: UserData;
  customData?: CustomData;
} 