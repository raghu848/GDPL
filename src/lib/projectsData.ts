export interface ProjectConfig {
    type: string;
    size: string;
    booking?: string;
}

export interface AmenityCategory {
    name: string;
    items: string[];
}

export interface Project {
    slug: string;
    name: string;
    tagline: string;
    location: string;
    status: "Ongoing" | "Delivered" | "Upcoming";
    heroImage: string;
    galleryImages: string[];
    description: string;
    longDescription: string;
    priceLabel: string;
    area?: string;
    configurations: ProjectConfig[];
    amenities: AmenityCategory[];
    highlights: string[];
}

export const projects: Project[] = [
    {
        slug: "regal-residencia",
        name: "Regal Residencia",
        tagline: "Premium Independent Floors",
        location: "Sector 114, Mohali",
        status: "Ongoing",
        heroImage: "/images/Regal Residencia Sector 114 Mohali _page-0001.jpg",
        priceLabel: "₹6,900/sq.ft.",
        area: "5+ Acres",
        description: "Thoughtfully designed independent floors combining spacious living with modern architecture. Features an Iconic Sky Walk, resort-style pool, and over 30 premium amenities.",
        longDescription: "Regal Residencia redefines the concept of independent living in Mohali. Nestled in the prime location of Sector 114, this project offers ultra-spacious floors that combine the privacy of a villa with the convenience of a modern apartment complex. Every unit is designed with meticulous attention to natural light, ventilation, and vastu compliance. With over 30 world-class amenities including an Iconic Sky Walk, resort-style pool, spa, and signature club — Regal Residencia is where luxury meets lifestyle.",
        galleryImages: [
            "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0006.jpg",
            "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0007.jpg",
            "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0009.jpg",
            "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0010.jpg",
            "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0011.jpg",
            "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0012.jpg",
            "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0013.jpg",
            "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0014.jpg",
        ],
        configurations: [
            { type: "3 BHK", size: "1800 sq.ft." },
            { type: "3+1 BHK", size: "2150 sq.ft." },
            { type: "4+1 BHK", size: "3200 sq.ft." },
        ],
        amenities: [
            {
                name: "Sports & Recreation",
                items: ["Iconic Sky Walk", "Resort-style Swimming Pool", "Skating Rink", "Indoor Badminton", "Basketball Court", "Cricket Pitch", "Jogging Track"]
            },
            {
                name: "Smart Living",
                items: ["Smart Premium Lifts", "Complete Power Backup", "Wi-Fi in Common Areas", "Premium Marble Flooring", "False Ceiling in Drawing & Dining", "Internal Height – 10.5 Feet"]
            },
            {
                name: "Health & Wellness",
                items: ["Spa & Sauna", "Fully Equipped Gymnasium", "Yoga Room", "Meditation Zone", "24×7 Medical Facilities"]
            },
            {
                name: "Lifestyle",
                items: ["Mini Theatre", "Premium Indoor Golf", "Signature Club & Café", "Library & Reading Corner", "Barbeque Zone", "Crèche Facility"]
            },
        ],
        highlights: [
            "30+ World-class Amenities",
            "Iconic Sky Walk — First in Region",
            "Vastu Compliant Design",
            "3-side Open Plot",
            "Sun-facing Apartments",
            "RERA Registered",
        ],
    },
    {
        slug: "regal-heights",
        name: "Regal Heights",
        tagline: "3 & 4 BHK Luxury High-Rise Apartments",
        location: "Sector 91, Mohali",
        status: "Ongoing",
        heroImage: "/regal_heights/gemini.jpeg",
        priceLabel: "₹8,600/sq.ft.",
        area: "5.37 Acres",
        description: "A flagship high-rise project offering 25+ premium amenities. Spread across 5.37 acres with a massive 2-acre podium park. Sun-facing apartments with world-class club facilities.",
        longDescription: "Regal Heights stands as GDPL's flagship luxury high-rise in the heart of Mohali's most sought-after sector. Spread across a sprawling 5.37 acres, this premium project features a massive 2-acre lush green podium park at its center, creating a resort-like atmosphere right at your doorstep. With a 25,000 sq.ft. club house, sun-facing apartments, and configurations ranging from spacious 3+1 BHK to ultra-luxurious Earthvilla's & Skyvilla's of 5000-6000 sq.ft. — Regal Heights is the crown jewel of Mohali's skyline.",
        galleryImages: [
            "/regal_heights/img4.jpg",
            "/regal_heights/img5.jpg",
            "/regal_heights/img7.jpg",
            "/regal_heights/img11.jpg",
            "/regal_heights/img13.jpg",
            "/regal_heights/img14.jpg",
            "/regal_heights/img15.jpg",
            "/regal_heights/img19.jpg",
            "/regal_heights/img27.jpg",
        ],
        configurations: [
            { type: "3+1 BHK", size: "2200 sq.ft.", booking: "₹30L" },
            { type: "4+1 BHK", size: "3200 sq.ft.", booking: "₹50L" },
            { type: "Earthvilla's & Skyvilla's", size: "5000–6000 sq.ft." },
        ],
        amenities: [
            {
                name: "Sports & Recreation",
                items: ["25,000 sq.ft Club House", "Sports Arena", "Swimming Pool", "Splash Pool", "Jogging Track", "Basketball Court", "Badminton Court"]
            },
            {
                name: "Smart Living",
                items: ["Smart Premium Lifts in Each Tower", "Complete Power Backup", "Sun-facing Layout", "Premium Italian Marble Flooring", "10.5 Feet Internal Height"]
            },
            {
                name: "Health & Wellness",
                items: ["Fully Equipped Gymnasium", "Spa & Sauna", "Jacuzzi", "Yoga Room", "24×7 Ambulance Service"]
            },
            {
                name: "Lifestyle",
                items: ["2 Acres Podium Park", "Mini Theatre", "Rooftop Lounge", "Library & Café", "Kids' Play Area", "Crèche Facility", "Barbeque Zone"]
            },
        ],
        highlights: [
            "5.37 Acres — 3-Side Open",
            "2-Acre Lush Green Podium Park",
            "25,000 sq.ft. Club House",
            "Sun-Facing Apartments",
            "Earthvilla's & Skyvilla's Available",
            "RERA Registered",
        ],
    },
    {
        slug: "regal-empirus",
        name: "Regal Empirus",
        tagline: "Ultra-Premium Living Experience",
        location: "Sector 91, Mohali",
        status: "Ongoing",
        heroImage: "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0006.jpg",
        priceLabel: "₹8,600/sq.ft.",
        area: "5.37 Acres",
        description: "A luxurious living experience offering modern amenities and plenty of green space. 5.37 acres of total land area featuring a massive 2-acre lush green podium park inside a 3-side open site.",
        longDescription: "Regal Empirus is the epitome of ultra-premium living in Mohali. Conceptualized for those who demand nothing but the finest, this project blends architectural grandeur with nature's tranquility. Situated on 5.37 acres of prime real estate in Sector 91, the project features a breathtaking 2-acre podium park, five-star club facilities, and apartments designed with sun-facing orientations for natural light. Every detail — from the multi-level parking to the panoramic views — has been crafted to deliver an experience that transcends ordinary luxury.",
        galleryImages: [
            "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0006.jpg",
            "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0007.jpg",
            "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0009.jpg",
            "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0010.jpg",
            "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0011.jpg",
            "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0012.jpg",
            "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0013.jpg",
        ],
        configurations: [
            { type: "3+1 BHK", size: "2200 sq.ft." },
            { type: "4+1 BHK", size: "3200 sq.ft." },
        ],
        amenities: [
            {
                name: "Sports & Recreation",
                items: ["Swimming Pool with Kids' Splash Pool", "Sports Arena", "Jogging Track", "Badminton Court", "Basketball Court"]
            },
            {
                name: "Smart Living",
                items: ["Smart Premium Lifts", "Multi-level Parking (Basement, Stilt, Surface)", "Complete Power Backup", "Sun-facing Apartments", "Premium Italian Marble Flooring"]
            },
            {
                name: "Health & Wellness",
                items: ["Fully Equipped Gym", "Spa & Sauna", "Yoga Room", "Medical Facilities", "24×7 Ambulance Service"]
            },
            {
                name: "Lifestyle",
                items: ["Five-Star Club House & Banquet Hall", "Library & Cafeteria", "Mini Theatre", "Kids' Play Area", "Rooftop Lounge", "Barbeque Zone"]
            },
        ],
        highlights: [
            "5.37 Acres — 3-Side Open Site",
            "2-Acre Lush Green Podium Park",
            "Five-Star Club House & Banquet",
            "Multi-level Parking System",
            "Sun-Facing Apartments",
            "RERA Registered",
        ],
    },
    {
        slug: "regal-luxuria",
        name: "Regal Luxuria",
        tagline: "The Pinnacle of Luxury Living",
        location: "Mohali",
        status: "Upcoming",
        heroImage: "/images/regal-luxuria/hero.jpg",
        priceLabel: "Coming Soon",
        area: "TBA",
        description: "GDPL's most ambitious project yet — Regal Luxuria represents the pinnacle of luxury living in Mohali. Ultra-premium residences designed for the discerning few who accept nothing but the very best.",
        longDescription: "Regal Luxuria is the crown jewel of GDPL's portfolio — an ultra-luxury residential address that sets an entirely new benchmark for premium living in the Tricity region. Every aspect of this project has been conceived to cater to the most refined tastes: from the architectural language inspired by global luxury standards, to the bespoke interiors, private terraces, and an exclusive residents-only club. Regal Luxuria is not just a home — it's a statement of arrival. Details coming soon.",
        galleryImages: [
            "/images/regal-luxuria/hero.jpg",
            "/images/regal-luxuria/lobby.jpg",
            "/images/regal-luxuria/living.jpg",
            "/images/regal-luxuria/pool.jpg",
        ],
        configurations: [
            { type: "4+1 BHK Ultra-Luxury", size: "3500+ sq.ft." },
            { type: "Penthouses", size: "5000+ sq.ft." },
        ],
        amenities: [
            {
                name: "Exclusive Living",
                items: ["Private Terraces", "Residents-Only Club", "Concierge Service", "Valet Parking", "Smart Home Automation"]
            },
            {
                name: "Wellness",
                items: ["Infinity Pool", "Private Spa Suites", "Yoga & Meditation Pavilion", "24×7 Health Centre"]
            },
            {
                name: "Lifestyle",
                items: ["Rooftop Fine Dining", "Cigar Lounge", "Private Theatre", "Art Gallery", "Wine Cellar"]
            },
        ],
        highlights: [
            "Ultra-Luxury Residences",
            "Bespoke Interiors",
            "Private Terraces & Gardens",
            "Residents-Only Exclusive Club",
            "Smart Home Automation",
            "Coming Soon",
        ],
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return projects.map((p) => p.slug);
}
