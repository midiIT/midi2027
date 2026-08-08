"use client";

import Image from "next/image";
import tape from "../../../public/constructionTape.png";
import cat from "../../../public/midiCat.png"

export default function ActivitiesPage() {
    return (
        <div className="flex min-h-[calc(100vh-4.25rem)] flex-col">
            <Image
                src={tape}
                alt="topTape"
                className="w-full h-18 max-[920px]:h-16 object-cover"
            />
            <div className="flex flex-1 items-center justify-between px-12 max-[700px]:flex-col max-[700px]:justify-center max-[700px]:gap-12">

                {/* Left */}
                <div>
                    <h1 className="font-extrabold text-7xl text-[#0075b5] max-[920px]:text-6xl max-[820px]:text-5xl max-[440px]:text-4xl">
                        UNDER
                    </h1>

                    <h1 className="font-extrabold text-7xl text-[#404041] max-[920px]:text-6xl max-[820px]:text-5xl max-[440px]:text-4xl">
                        CONSTRUCTION
                    </h1>

                    <p className="font-regular text-[#404041]/70">
                        Activities & Events — coming soon!
                    </p>
                </div>

                {/* Right */}
                <Image
                    src={cat}
                    alt="MIDI construction cat"
                    className="w-96 h-auto max-[920px]:w-72 max-[700px]:w-64"
                />
            </div>
            <Image
                src={tape}
                alt="topTape"
                className="w-full h-16 max-[920px]:h-16 object-cover"
            />
        </div>
    )
}