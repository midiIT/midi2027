"use client";

import domas from "../../../public/domas.jpg"
import Image from "next/image";

export default function DomasPage() {
    return (
        <div className="flex min-h-[calc(100vh-4.25rem)] flex-col">
            <Image
                src={domas}
                alt="domas"
                className="h-200 w-1000"
            />
        </div>
    )
}