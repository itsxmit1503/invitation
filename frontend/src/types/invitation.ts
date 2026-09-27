export interface InvitationData {
  id: string;
  recipientName: string;
  honorific?: string;
  designation: string;
  department: string;
  universityName: string;
  eventName: string;
  eventTheme?: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  hallName?: string;
  personalNote?: string;
  accepted?: boolean;
  acceptedAt?: string;
  rejectCount?: number;
}

export type EntranceStage = 
  | "university"
  | "event"
  | "welcome"
  | "recipient"
  | "seal"
  | "unfolded";
