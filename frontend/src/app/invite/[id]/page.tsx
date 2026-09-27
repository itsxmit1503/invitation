import { Metadata } from "next";
import { getInvitationById, FACULTY_RECIPIENTS } from "@/data/mockInvitations";
import InvitationExperience from "@/components/InvitationExperience";
import FacultyPreviewSwitcher from "@/components/ui/FacultyPreviewSwitcher";

interface InvitePageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return FACULTY_RECIPIENTS.map((recipient) => ({
    id: recipient.slug,
  }));
}

export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { id } = await params;
  const invitation = getInvitationById(id);

  return {
    title: `Special Invitation for ${invitation.recipientName} | ${invitation.eventName}`,
    description: `A cordial invitation for ${invitation.recipientName} to grace ${invitation.eventName} - Freshers' Welcome 2026, Conducted by BCA III Semester.`,
    openGraph: {
      title: `Special Invitation for ${invitation.recipientName}`,
      description: `You are cordially invited to ${invitation.eventName} - Freshers' Welcome 2026, Conducted by BCA III Semester.`,
    },
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { id } = await params;
  const invitation = getInvitationById(id);

  return (
    <div className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden">
      <FacultyPreviewSwitcher currentSlug={invitation.id} />
      <InvitationExperience initialInvitation={invitation} />
    </div>
  );
}
