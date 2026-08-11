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
                        {p.icon}
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