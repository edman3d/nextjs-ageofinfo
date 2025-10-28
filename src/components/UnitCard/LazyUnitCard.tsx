import { UnitType } from "@/models/Unit";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DynamicUnitCard = dynamic(
    () => import("@/components/UnitCard/UnitCard"),
    { ssr: false, loading: () => <div style={{ height: 120 }} /> }
);

export default function LazyUnitCard({ unit }: { unit: UnitType }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visible) return;
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: "20px" } // start loading slightly before visible
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [visible]);

    return (
        <div className="h-100" ref={ref}>
            {visible ? <DynamicUnitCard unitData={unit} /> : <div style={{ height: 120 }} />}
        </div>
    );
}