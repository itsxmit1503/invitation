import { Metadata } from "next";
import { getInvitationById } from "@/data/mockInvitations";
import InvitationExperience from "@/components/InvitationExperience";

interface InvitePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { id } = await params;
  const invitation = getInvitationById(id);

  return {
    title: `Invitation for ${invitation.recipientName} | ${invitation.eventName}`,
    description: `A personal invitation for ${invitation.recipientName}, ${invitation.designation} to grace ${invitation.eventName}.`,
    openGraph: {
      title: `Special Invitation for ${invitation.recipientName}`,
      description: `You are cordially invited to ${invitation.eventName} - Freshers' Welcome Ceremony.`,
    },
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { id } = await params;
  const invitation = getInvitationById(id);

  return (
    <div className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden">
      <InvitationExperience initialInvitation={invitation} />
    </div>
  );
}
