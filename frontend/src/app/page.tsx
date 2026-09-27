import { getInvitationById } from "@/data/mockInvitations";
import InvitationExperience from "@/components/InvitationExperience";
import Link from "next/link";
import { UserCheck } from "lucide-react";

export default function HomePage() {
  // Default to primary faculty invitation (Dr. Sharma)
  const defaultInvitation = getInvitationById("7xK92Lm");

  return (
    <div className="relative min-h-screen">
      {/* Subtle Dev / Faculty Profile Switcher for previewing personalization */}
      <aside aria-label="Faculty Demo Switcher" className="fixed bottom-3 right-3 z-50">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1815]/90 border border-[#D4AF37]/30 shadow-lg text-[11px] text-[#C5BEB3]">
          <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="hidden sm:inline">Preview Recipient:</span>
          <Link
            href="/invite/7xK92Lm"
            className="text-[#E8C878] hover:underline font-medium"
          >
            Dr. Sharma
          </Link>
          <span className="text-white/20">|</span>
          <Link
            href="/invite/9pQ41Za"
            className="text-[#C5BEB3] hover:text-[#E8C878] hover:underline"
          >
            Dr. Mukherjee
          </Link>
        </div>
      </aside>

      <InvitationExperience initialInvitation={defaultInvitation} />
    </div>
  );
}
