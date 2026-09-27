import { InvitationData } from "@/types/invitation";

export const MOCK_INVITATIONS: Record<string, InvitationData> = {
  "7xK92Lm": {
    id: "7xK92Lm",
    recipientName: "Dr. Rajesh Sharma",
    honorific: "Respected Sir",
    designation: "Professor & Head of Department",
    department: "Department of Computer Science & Applications",
    universityName: "Faculty of Engineering & Technology",
    eventName: "AARAMBH '26",
    eventTheme: "Echoes of Tomorrow",
    eventDate: "Friday, 17th October 2026",
    eventTime: "4:30 PM Onwards",
    venue: "Main University Auditorium",
    hallName: "Grand Amphitheatre, Block A",
    personalNote: "Your guidance and mentorship have been the cornerstone of our academic journey. It would be our supreme honor to welcome you to inaugurate the evening.",
    accepted: false,
    rejectCount: 0,
  },
  "9pQ41Za": {
    id: "9pQ41Za",
    recipientName: "Dr. Ananya Mukherjee",
    honorific: "Respected Ma'am",
    designation: "Associate Professor",
    department: "Department of Computer Science & Engineering",
    universityName: "Faculty of Engineering & Technology",
    eventName: "AARAMBH '26",
    eventTheme: "Echoes of Tomorrow",
    eventDate: "Friday, 17th October 2026",
    eventTime: "4:30 PM Onwards",
    venue: "Main University Auditorium",
    hallName: "Grand Amphitheatre, Block A",
    personalNote: "The incoming batch is eager to be inspired by your words of wisdom. Your presence will light up our celebration.",
    accepted: false,
    rejectCount: 0,
  },
  "default": {
    id: "default",
    recipientName: "Dr. Sharma",
    honorific: "Respected Professor",
    designation: "Professor",
    department: "Department of Computer Science & Applications",
    universityName: "Faculty of Engineering & Technology",
    eventName: "AARAMBH '26",
    eventTheme: "Echoes of Tomorrow",
    eventDate: "Friday, 17th October 2026",
    eventTime: "4:30 PM Onwards",
    venue: "Main University Auditorium",
    hallName: "Grand Amphitheatre, Block A",
    personalNote: "Your presence is warmly requested as our most cherished mentor to welcome the incoming class.",
    accepted: false,
    rejectCount: 0,
  },
};

export function getInvitationById(id: string): InvitationData {
  return MOCK_INVITATIONS[id] || {
    ...MOCK_INVITATIONS["default"],
    id,
  };
}
