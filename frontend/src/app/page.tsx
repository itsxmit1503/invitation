import { getInvitationById } from "@/data/mockInvitations";
import InvitationExperience from "@/components/InvitationExperience";
import FacultyPreviewSwitcher from "@/components/ui/FacultyPreviewSwitcher";

export default function HomePage() {
  // Default to first faculty member: Dr. Ranjit Rajak
  const defaultInvitation = getInvitationById("ranjit-rajak");

  return (
    <div className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden">
      <FacultyPreviewSwitcher currentSlug="ranjit-rajak" />
      <InvitationExperience initialInvitation={defaultInvitation} />
    </div>
  );
}
