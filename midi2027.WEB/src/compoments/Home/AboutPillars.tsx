type Pillar = {
    icon: string;
    title: string;
    body: string;
};

export default function AboutPillars({ pillars }: { pillars: Pillar[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[2px] mb-22 border border-black/10 rounded-md overflow-hidden">
            {pillars.map((p, i) => (
                <div
                    key={i}
                    className={`bg-white p-9 ${i < pillars.length - 1 ? 'sm:border-r border-black/10' : ''}`}
                >
                    <div className="w-10 h-10 rounded-md bg-[#0075b5]/10 flex items-center justify-center text-[17px] text-[#0075b5] mb-5">
                        {p.icon === "cat" ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                                <path d="M5 10 4 3l6 4a10 10 0 0 1 4 0l6-4-1 7a7 7 0 0 1 1 4c0 4-3.6 7-8 7s-8-3-8-7a7 7 0 0 1 1-4Z" />
                                <path d="M8 12v1m8-1v1m-5 3h2l-1 1-1-1Zm1 1v2M2 14l4 1m-4 3 4-1m16-3-4 1m4 3-4-1" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                                {p.icon === "calendar" ? <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4m10-4v4M3 11h18m-13 5 3 3 5-5" /></> : <><circle cx="9" cy="8" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v3" /></>}
                            </svg>
                        )}
                    </div>
                    <h3 className="text-[17px] font-bold text-[#333] mb-2.5 tracking-tight">
                        {p.title}
                    </h3>
                    <p className="text-sm text-[#333]/55 leading-relaxed">
                        {p.body}
                    </p>
                </div>
            ))}
        </div>
    );
}