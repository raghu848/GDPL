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
    tagline?: string;
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
    residencesSummary?: string;
    projectType?: string;
    amenityIcons?: Record<string, string>;
}

export const projects: Project[] = [
    {
        slug: "regal-residencia",
        name: "Regal Residencia",

        location: "Sector 114, Mohali",
        status: "Ongoing",
        heroImage: "/regal_rersidencia/Regal_Residencia_.jpg.jpeg",
        priceLabel: "₹6,900/sq.ft.",
        area: "8.5 Acres",
        residencesSummary: "3, 3+1 & 4+1 BHK Homes",
        projectType: "Residential + Commercial Hub",
        amenityIcons: {
            "Indoor Badminton": "/regal_rersidencia/icons/badminton_12635730.svg",
            "Signature Club & Café": "/regal_rersidencia/icons/club_10934333.svg",
            "Wi-Fi in Common Areas": "/regal_rersidencia/icons/computer_14197303.svg",
            "Cricket Pitch": "/regal_rersidencia/icons/cricket-stump_17559333.svg",
            "Premium Indoor Golf": "/regal_rersidencia/icons/golf-equipment_5477988.svg",
            "Fully Equipped Gymnasium": "/regal_rersidencia/icons/gym_11055008.svg",
            "Skating Rink": "/regal_rersidencia/icons/ice-skate_11249697.svg",
            "Crèche Facility": "/regal_rersidencia/icons/playground_10638591.svg",
            "Swimming Pool": "/regal_rersidencia/icons/rubber-pool_10772888.svg",
            "Resort-style Swimming Pool": "/regal_rersidencia/icons/rubber-pool_10772888.svg",
            "Spa & Sauna": "/regal_rersidencia/icons/sauna_17386830.svg",
            "Basketball Court": "/regal_rersidencia/icons/stadium_4276518.svg",
            "Mini Theatre": "/regal_rersidencia/icons/theater_3041710.svg",
            "Barbeque Zone": "/regal_rersidencia/icons/bar-counter_4256133.svg",
            "Yoga Room": "/regal_rersidencia/icons/beach_18694042.svg",
            "Meditation Zone": "/regal_rersidencia/icons/harebell_1531185.svg",
            "Jogging Track": "/regal_rersidencia/icons/gazebo_4590895.svg",
            "Sports Arena": "/regal_rersidencia/icons/game-center_18369956.svg"
        },
        description: "Thoughtfully designed independent floors combining spacious living with modern architecture. Features an Iconic Sky Walk, resort-style pool, and over 30 premium amenities.",
        longDescription: "Regal Residencia, Sector 114, Mohali is a premium residential–commercial development designed for modern urban living. Featuring spacious 3 & 4 BHK residences and exclusive penthouses, the project blends comfort, luxury, and convenience in one vibrant destination Thoughtfully planned with open green spaces, podium-level amenities, and a lively retail hub, it offers a perfect balance of lifestyle and functionality. Strategically located, it ensures seamless connectivity to Chandigarh, the airport, and key landmarks, making everyday living effortless..",
        galleryImages: [
            "/regal_rersidencia/Regal%20Residencia%20Sector%20114%20Mohali%20_page-0006.jpg",
            "/regal_rersidencia/Regal%20Residencia%20Sector%20114%20Mohali%20_page-0007.jpg",
            "/regal_rersidencia/Regal%20Residencia%20Sector%20114%20Mohali%20_page-0009.jpg",
            "/regal_rersidencia/Regal%20Residencia%20Sector%20114%20Mohali%20_page-0010.jpg",
            "/regal_rersidencia/Regal%20Residencia%20Sector%20114%20Mohali%20_page-0011.jpg",
            "/regal_rersidencia/Regal%20Residencia%20Sector%20114%20Mohali%20_page-0012.jpg",
            "/regal_rersidencia/Regal%20Residencia%20Sector%20114%20Mohali%20_page-0013.jpg",
            "/regal_rersidencia/Regal%20Residencia%20Sector%20114%20Mohali%20_page-0014.jpg",
        ],
        configurations: [
            { type: "3 Bhk", size: "1800 sq.ft." },
            { type: "3+1 Bhk", size: "2150 sq.ft." },
            { type: "4+1 Bhk", size: "3200 sq.ft." },
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
            "30+ World-Class Amenities",
            "Iconic Sky Walk (First in the Region)",
            "Spacious 3 & 4 BHK + Luxury Penthouses",
            "Integrated Retail & Lifestyle Hub",
            "Prime Location with Seamless Connectivity",
            "RERA Registered",
        ],
    },
    {
        slug: "regal-heights",
        name: "Regal Heights",
        tagline: "3 & 4 BHK residences, Sky Villas and Earth Villas in Sector 91, Mohali, set within a 3-side open site with premium amenities.",
        location: "Sector 91, Mohali",
        status: "Ongoing",
        heroImage: "/regal_heights/Regal_Heights_.jpg.jpeg",
        priceLabel: "₹8,600/sq.ft.",
        area: "5.37 Acres",
        description: "A flagship high-rise project offering 25+ premium amenities. Spread across 5.37 acres with a massive 2-acre podium park. Sun-facing apartments with world-class club facilities.",
        longDescription: "Regal Heights stands as Gdpl's flagship luxury high-rise in the heart of Mohali's most sought-after sector. Spread across a sprawling 5.37 acres, this premium project features a massive 2-acre lush green podium park at its center, creating a resort-like atmosphere right at your doorstep. With a 25,000 sq.ft. club house, sun-facing apartments, and configurations ranging from spacious 3+1 BHK to ultra-luxurious Earthvilla's & Skyvilla's of 5000-6000 sq.ft. — Regal Heights is the crown jewel of Mohali's skyline.",
        galleryImages: [
            "/regal_heights/Regal_Heights_.jpg.jpeg",
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
            { type: "3+1 Bhk", size: "2200 sq.ft.", booking: "₹30L" },
            { type: "4+1 Bhk", size: "3200 sq.ft.", booking: "₹50L" },
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
            "5.37 Acres Plot",
            "2-Acre Podium Park",
            "25,000 sq.ft. Club",
            "Sun-Facing",
            "Earthvillas & Skyvillas",
            "RERA Registered",
        ],
        residencesSummary: "3+1, 4+1 BHK & Earthvillas",
        projectType: "Luxury Residential",
    },
    {
        slug: "regal-empirus",
        name: "Regal Empirus",
        tagline: "3+1 & 4+1 BHK ultra-luxury residences in Sector 91, Mohali, featuring sun-facing layouts, iconic skywalk design, and world-class amenities.",
        location: "Sector 91, Mohali",
        status: "Ongoing",
        heroImage: "/regal_empirus/Regal_Empirus_.jpg.jpeg",
        priceLabel: "₹8,600/sq.ft.",
        area: "5.37 Acres",
        description: "A luxurious living experience offering modern amenities and plenty of green space. 5.37 acres of total land area featuring a massive 2-acre lush green podium park inside a 3-side open site.",
        longDescription: "Regal Empirus is the epitome of ultra-premium living in Mohali. Conceptualized for those who demand nothing but the finest, this project blends architectural grandeur with nature's tranquility. Situated on 5.37 acres of prime real estate in Sector 91, the project features a breathtaking 2-acre podium park, five-star club facilities, and apartments designed with sun-facing orientations for natural light. Every detail — from the multi-level parking to the panoramic views — has been crafted to deliver an experience that transcends ordinary luxury.",
        galleryImages: [
            "/regal_empirus/Regal_Empirus_.jpg.jpeg",
            "/regal_empirus/BOOKET_REGAL%20EMPIRUS%20CTC_page-0006.jpg",
            "/regal_empirus/BOOKET_REGAL%20EMPIRUS%20CTC_page-0007.jpg",
            "/regal_empirus/BOOKET_REGAL%20EMPIRUS%20CTC_page-0009.jpg",
            "/regal_empirus/BOOKET_REGAL%20EMPIRUS%20CTC_page-0010.jpg",
            "/regal_empirus/BOOKET_REGAL%20EMPIRUS%20CTC_page-0011.jpg",
            "/regal_empirus/BOOKET_REGAL%20EMPIRUS%20CTC_page-0012.jpg",
            "/regal_empirus/BOOKET_REGAL%20EMPIRUS%20CTC_page-0013.jpg",
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
            "5.37 Acres Site",
            "2-Acre Podium Park",
            "Five-Star Club",
            "Multi-level Parking",
            "Sun-Facing",
            "RERA Registered",
        ],
        residencesSummary: "3+1 & 4+1 BHK Residences",
        projectType: "Ultra-Luxury Residential",
    },
    {
        slug: "regal-luxuria",
        name: "Regal Luxuria",
        tagline: "Commercial plots in Sector 114, Mohali across 6 acres, offering 70 premium plots planned for high-visibility retail and business growth.",
        location: "Mohali",
        status: "Upcoming",
        heroImage: "/regal_heights/Regal_Luxuria_.jpg.jpeg",
        priceLabel: "Coming Soon",
        area: "TBA",
        description: "Gdpl's most ambitious project yet — Regal Luxuria represents the pinnacle of luxury living in Mohali. Ultra-premium residences designed for the discerning few who accept nothing but the very best.",
        longDescription: "Regal Luxuria is the crown jewel of Gdpl's portfolio — an ultra-luxury residential address that sets an entirely new benchmark for premium living in the Tricity region. Every aspect of this project has been conceived to cater to the most refined tastes: from the architectural language inspired by global luxury standards, to the bespoke interiors, private terraces, and an exclusive residents-only club. Regal Luxuria is not just a home — it's a statement of arrival. Details coming soon.",
        galleryImages: [
            "/regal_heights/Regal_Luxuria_.jpg.jpeg",
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
            "Ultra-Luxury Living",
            "Bespoke Interiors",
            "Private Terraces",
            "Exclusive Club",
            "Home Automation",
            "Coming Soon",
        ],
        residencesSummary: "4+1 BHK & Penthouses",
        projectType: "Premium Commercial Plots",
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return projects.map((p) => p.slug);
}
