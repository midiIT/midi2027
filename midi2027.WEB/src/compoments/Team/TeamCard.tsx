import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
type TeamCardProps = {
    member: { name: string; role: string; email: string; photo?: string };
    t: { photoAlt: string; emailLabel: string; roles: Record<string, string> };
};

export function TeamCard({ member, t }: TeamCardProps) {
    const names = member.name.split(" ");
    const initials = names[0][0] + names[names.length - 1][0];

    return (
        <article className="overflow-hidden rounded-lg border border-[#102c3c]/15 bg-white">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#edf1f4]">
                {member.photo ? (
                    <Image src={member.photo} alt={t.photoAlt.replace("{name}", member.name)} fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        className="object-cover" />
                ) : (
                    <div aria-hidden="true" className="flex h-full items-center justify-center border-b border-[#102c3c]/5">
                        <span className="text-6xl font-semibold text-[#102c3c]/25">{initials}</span>
                    </div>
                )}
            </div>
            <div className="p-5">
                <p className="min-h-6 text-sm font-semibold text-[#0075b5]">{t.roles[member.role]}</p>
                <h2 className="mt-2 min-h-14 text-2xl font-bold leading-7 text-[#404041] [overflow-wrap:anywhere]">{member.name}</h2>
                <a href={`mailto:${member.email}`} aria-label={`${t.emailLabel}: ${member.name}`}
                    className="mt-4 flex min-h-11 items-center gap-2 border-t border-[#102c3c]/10 pt-3 text-sm font-semibold text-[#0075b5] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">
                    <Mail size={16} aria-hidden="true" className="shrink-0" />
                    <span className="min-w-0 [overflow-wrap:anywhere]">{member.email}</span>
                    <ArrowUpRight size={16} aria-hidden="true" className="ml-auto shrink-0" />
                </a>
            </div>
        </article>
    );
}
