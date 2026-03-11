import DragCarousel from "./DragCarousel";

interface PropertySectionProps {
    title: string;
    topImage: string;
    bottomImage: string;
    carouselImages: string[];
}

export default function PropertySection({ title, topImage, bottomImage, carouselImages }: PropertySectionProps) {
    return (
        <section className="py-24 bg-noir border-t border-text-primary-dark/10">
            <div className="container mx-auto px-6 mb-12">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center">{title}</h2>

                {/* Top Image */}
                <div className="w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden rounded-3xl mb-16 shadow-2xl">
                    <img src={topImage} alt={`${title} Top Overview`} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Horizontal Scroller */}
            <div className="mb-16">
                <div className="container mx-auto px-6 mb-6">
                    <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-muted">Gallery / Features</h3>
                </div>
                <DragCarousel images={carouselImages} />
            </div>

            {/* Bottom Image / Data Placeholder */}
            <div className="container mx-auto px-6 mt-16">
                <div className="w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden rounded-3xl shadow-2xl">
                    <img src={bottomImage} alt={`${title} Bottom Details`} className="w-full h-full object-cover" />
                </div>

                {/* Content Placeholder for user to provide */}
                <div className="mt-12 max-w-3xl mx-auto text-center border border-dashed border-text-primary-dark/20 p-12 rounded-2xl">
                    <p className="text-muted text-sm uppercase tracking-widest">
                        Content Placeholder for {title}
                    </p>
                </div>
            </div>
        </section>
    );
}
