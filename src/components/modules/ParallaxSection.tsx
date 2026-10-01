"use client";

export function ParallaxSection() {
    return (
        <div style={{ overflow: "clip" }}>
            <section
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000')",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    padding: "12rem 0",
                }}
            >
                {/* Dark overlay */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 10 }} className="container mx-auto px-4 md:px-6 text-center">
                    <p className="text-amber-400 uppercase tracking-[0.35em] text-sm font-semibold mb-6">
                        Our Philosophy
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8 max-w-3xl mx-auto drop-shadow-xl">
                        Food is not just nourishment — it&apos;s an experience.
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        At Copper Spoon, every ingredient is chosen with intention, every
                        plate crafted with care, and every guest welcomed like family.
                    </p>
                </div>
            </section>
        </div>
    );
}
