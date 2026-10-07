import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ArchiveSlide } from "@/app/archives/pageSlides";
import type { ArchivesPageText } from "@/app/archives/pageText";

export function ArchiveCard({ slide, index, t }: { slide: ArchiveSlide; index: number; t: ArchivesPageText }) {
    const cardClass = "group block h-full overflow-hidden rounded-xl border border-[#102c3c]/10 bg-white shadow-sm";
    const content = (
        <>
            <div className="flex items-center gap-1.5 border-b border-[#102c3c]/10 bg-white px-4 py-3" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0075b5]/25" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#0075b5]/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#0075b5]/10" />
                <span className="ml-3 text-[11px] tracking-wide text-[#404041]/45">{slide.address}</span>
                <span className="ml-auto text-[10px] text-[#404041]/35">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-[#e8edf1]">
                {slide.image ? (
                    <Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 390px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none" />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#e6ebee] px-6 text-center">
                        <span className="text-6xl font-extrabold text-[#102c3c]/15">{slide.title}</span>
                        <span className="text-sm text-[#102c3c]/60">{t.unavailable}</span>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between gap-4 p-6">
                <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#404041]/45">{t.brand}</p>
                    <h3 className={`mt-1 font-extrabold tracking-tight text-[#102c3c] ${slide.year ? "text-3xl" : "text-2xl"}`}>{slide.title}</h3>
                </div>
                {slide.href && (
                    <span className="flex items-center gap-3 text-xs font-semibold text-[#0075b5]">
                        {t.open}
                        <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f4fb] text-lg transition-colors group-hover:bg-[#0075b5] group-hover:text-white">
                            <ArrowUpRight size={18} />
                        </span>
                    </span>
                )}
            </div>
        </>
    );

    if (!slide.href) return <div aria-disabled="true" className={`${cardClass} cursor-not-allowed`}>{content}</div>;

    return (
        <a href={slide.href} className={`${cardClass} transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0075b5] motion-reduce:transform-none`}>
            {content}
        </a>
    );
}
