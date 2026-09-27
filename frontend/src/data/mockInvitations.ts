import { InvitationData } from "@/types/invitation";

/**
 * Common event details shared across all faculty invitations.
 * Centralized here to avoid duplication.
 */
export const SHARED_EVENT_DETAILS = {
  department: "Department of Computer Science & Applications",
  universityName: "Faculty of Engineering & Technology",
  eventName: "AARAMBH '26",
  eventTheme: "Echoes of Tomorrow",
  eventDate: "Friday, 17th October 2026",
  eventTime: "4:30 PM Onwards",
  venue: "Main University Auditorium",
  hallName: "Grand Amphitheatre, Block A",
  designation: "Honored Faculty Member",
} as const;

export interface FacultyConfig {
  slug: string;
  recipientName: string;
  honorific: string;
  personalNote: string;
  designation?: string;
  department?: string;
}

/**
 * Master list of all 16 faculty recipients with clean punctuation,
 * dignified honorifics, neutral designations, and uniquely crafted invitation notes.
 */
export const FACULTY_RECIPIENTS: FacultyConfig[] = [
  {
    slug: "ranjit-rajak",
    recipientName: "Mr. Ranjit Rajak",
    honorific: "Respected Sir",
    personalNote:
      "As the new academic year commences, we would be deeply honored by your gracious presence at AARAMBH '26. Having you join us as we welcome the incoming batch will bring tremendous encouragement to the students and set a truly inspiring tone for the journey ahead.",
  },
  {
    slug: "pangamban-sandesh-singh",
    recipientName: "Mr. Pangamban Sandesh Singh",
    honorific: "Respected Sir",
    personalNote:
      "The organizing committee and the student community cordially invite you to be a part of our annual Freshers' Welcome. Your presence at the gathering would mean a great deal to all of us and add a profound sense of warmth to this milestone evening.",
  },
  {
    slug: "kavita-sahu",
    recipientName: "Mrs. Kavita Sahu",
    honorific: "Respected Ma'am",
    personalNote:
      "It is with immense joy and respect that we request the honor of your company at AARAMBH '26. The new students are eager to begin their collegiate journey in your presence, and having you among us will make our welcome ceremony truly memorable.",
  },
  {
    slug: "abhishek-bansal",
    recipientName: "Mr. Abhishek Bansal",
    honorific: "Respected Sir",
    personalNote:
      "We warmly invite you to grace the annual Freshers' Welcome as our honored guest. The commencement of a new academic session is a special occasion for our department, and celebrating this evening alongside you will be a genuine privilege for the entire batch.",
  },
  {
    slug: "richa-pathak",
    recipientName: "Mrs. Richa Pathak",
    honorific: "Respected Ma'am",
    personalNote:
      "On behalf of the students and organizing team, we humbly extend our cordial invitation to you for AARAMBH '26. Your presence would illuminate the auditorium and offer heartfelt encouragement to our freshers as they take their first steps into campus life.",
  },
  {
    slug: "kamal-kant",
    recipientName: "Mr. Kamal Kant",
    honorific: "Respected Sir",
    personalNote:
      "We would be delighted to have you join us for this year's Freshers' Welcome ceremony. Welcoming the incoming class is always a moment of renewal and shared excitement, and having you grace the occasion will make the celebration complete.",
  },
  {
    slug: "anubha-prajapati",
    recipientName: "Miss. Anubha Prajapati",
    honorific: "Respected Ma'am",
    personalNote:
      "With deep regard and enthusiasm, we cordially invite you to join us in welcoming the newest members of our university fraternity. Your presence at AARAMBH '26 will enrich the evening and provide meaningful inspiration to the incoming batch.",
  },
  {
    slug: "vidya-marksole",
    recipientName: "Miss. Vidya Marksole",
    honorific: "Respected Ma'am",
    personalNote:
      "The student body extends a warm and respectful invitation for you to attend our annual Freshers' Welcome. As we gather to celebrate fresh beginnings and academic camaraderie, having you share this special evening with us would be our true honor.",
  },
  {
    slug: "shubham-maurya",
    recipientName: "Mr. Shubham Maurya",
    honorific: "Respected Sir",
    personalNote:
      "We cordially invite you to grace AARAMBH '26 with your esteemed presence. The incoming students are embarking on an exciting academic chapter, and sharing this commemorative evening with you will leave an indelible mark on their campus memories.",
  },
  {
    slug: "manas-ranjan-behera",
    recipientName: "Mr. Manas Ranjan Behera",
    honorific: "Respected Sir",
    personalNote:
      "It would be our distinct honor to welcome you to the annual Freshers' Welcome celebration. Your gracious participation in the inaugural evening will bring immense encouragement to the students and mark the beginning of another promising academic year.",
  },
  {
    slug: "suhana-singh",
    recipientName: "Miss. Suhana Singh",
    honorific: "Respected Ma'am",
    personalNote:
      "We warmly invite you to be part of AARAMBH '26 as we open our doors to the incoming student cohort. The energy, aspirations, and hopes of the new batch will be elevated manifold by your presence among us for this joyous occasion.",
  },
  {
    slug: "sanchita-agarwal",
    recipientName: "Miss. Sanchita Agarwal",
    honorific: "Respected Ma'am",
    personalNote:
      "On this auspicious occasion of welcoming our freshers, the entire student council respectfully requests the pleasure of your company. Your presence at the celebration will add dignity and joy to the gathering as we start this new chapter together.",
  },
  {
    slug: "nitin-sir",
    recipientName: "Mr. Nitin Sir",
    honorific: "Respected Sir",
    personalNote:
      "We respectfully invite you to grace our annual Freshers' Welcome ceremony. The students have organized this evening with great dedication, and having your blessing and presence in the auditorium will make the celebration truly special for all of us.",
  },
  {
    slug: "rehan-gohar",
    recipientName: "Mr. Rehan Gohar",
    honorific: "Respected Sir",
    personalNote:
      "It gives us immense pleasure to invite you to AARAMBH '26 as our honored guest. Your participation in welcoming the new batch will foster a wonderful sense of academic belonging and inspire our juniors right from their very first day.",
  },
  {
    slug: "ruchi-jain",
    recipientName: "Miss. Ruchi Jain",
    honorific: "Respected Ma'am",
    personalNote:
      "With heartfelt respect, we invite you to attend the Freshers' Welcome ceremony of the Batch of 2026. The atmosphere of celebration and fellowship would be incomplete without your gracious company, and we look forward to welcoming you with great reverence.",
  },
  {
    slug: "gaurav-jain",
    recipientName: "Mr. Gaurav Jain",
    honorific: "Respected Sir",
    personalNote:
      "We are privileged to cordially invite you to join us for AARAMBH '26. As the department gathers to celebrate new beginnings, having you present among us will bring invaluable warmth, guidance, and happiness to the incoming students and organizers alike.",
  },
];

/**
 * Build the full record of invitations by combining shared event details
 * with recipient-specific entries.
 */
export const MOCK_INVITATIONS: Record<string, InvitationData> = FACULTY_RECIPIENTS.reduce(
  (acc, recipient) => {
    acc[recipient.slug] = {
      id: recipient.slug,
      recipientName: recipient.recipientName,
      honorific: recipient.honorific,
      designation: recipient.designation || SHARED_EVENT_DETAILS.designation,
      department: recipient.department || SHARED_EVENT_DETAILS.department,
      universityName: SHARED_EVENT_DETAILS.universityName,
      eventName: SHARED_EVENT_DETAILS.eventName,
      eventTheme: SHARED_EVENT_DETAILS.eventTheme,
      eventDate: SHARED_EVENT_DETAILS.eventDate,
      eventTime: SHARED_EVENT_DETAILS.eventTime,
      venue: SHARED_EVENT_DETAILS.venue,
      hallName: SHARED_EVENT_DETAILS.hallName,
      personalNote: recipient.personalNote,
      accepted: false,
      rejectCount: 0,
    };
    return acc;
  },
  {} as Record<string, InvitationData>
);

/**
 * Backward compatibility aliases for legacy demo IDs.
 */
export const SLUG_ALIASES: Record<string, string> = {
  "7xk92lm": "ranjit-rajak",
  "9pq41za": "kavita-sahu",
  "default": "ranjit-rajak",
};

/**
 * Safe invitation resolver with slug normalization and graceful fallback.
 */
export function getInvitationById(id?: string): InvitationData {
  const fallback = MOCK_INVITATIONS["ranjit-rajak"] || Object.values(MOCK_INVITATIONS)[0];

  if (!id) {
    return fallback;
  }

  // Normalize slug: trim whitespace, lowercase, convert underscores to hyphens
  const normalizedId = id.trim().toLowerCase().replace(/_/g, "-");

  // Direct match
  if (MOCK_INVITATIONS[normalizedId]) {
    return MOCK_INVITATIONS[normalizedId];
  }

  // Alias match
  const aliasTarget = SLUG_ALIASES[normalizedId];
  if (aliasTarget && MOCK_INVITATIONS[aliasTarget]) {
    return MOCK_INVITATIONS[aliasTarget];
  }

  // Graceful fallback for unknown slugs (does not crash or show unhandled 404)
  return {
    ...fallback,
    id: normalizedId,
  };
}
