import { getInvitationById } from "@/data/mockInvitations";
import InvitationExperience from "@/components/InvitationExperience";
import Link from "next/link";
import { UserCheck } from "lucide-react";

export default function HomePage() {
  // Default to primary faculty invitation (Dr. Sharma)
  const defaultInvitation = getInvitationById("7xK92Lm");

  return (
    <div className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden">
      {/* Subtle Dev / Faculty Profile Switcher for previewing personalization - positioned at top right to never obstruct interaction */}
      <aside aria-label="Faculty Demo Switcher" className="fixed top-2.5 right-2.5 sm:top-3 sm:right-3 z-50">
        <div className="flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#14171A]/90 backdrop-blur-md border border-white/10 shadow-lg text-[10px] sm:text-[11px] text-[#8A949E]">
          <UserCheck className="w-3.5 h-3.5 text-[#4E7475]" />
          <span className="hidden sm:inline">Preview:</span>
          <Link
            href="/invite/7xK92Lm"
            className="text-[#F3F1EA] hover:text-[#4E7475] transition-colors font-medium"
          >
            Dr. Sharma
          </Link>
          <span className="text-white/20">|</span>
          <Link
            href="/invite/9pQ41Za"
            className="text-[#8A949E] hover:text-[#F3F1EA] transition-colors"
          >
            Dr. Mukherjee
          </Link>
        </div>
      </aside>

      <InvitationExperience initialInvitation={defaultInvitation} />
    </div>
  );
}
