export interface ProjectConfig {
    type: string;
    size: string;
    booking?: string;
}

export interface LocationAdvantage {
    name: string;
    distance: string;
    image?: string;
    imageAlt?: string;
    category: string;
}

export interface AmenityCategory {
    name: string;
    items: string[];
}

/** A studio render shown in the project's render gallery / lightbox. */
export interface ProjectRender {
    src: string;
    alt: string;
    /** Short name overlaid on the tile. */
    label: string;
    /** One line describing what the render shows, used in the lightbox. */
    caption: string;
}

export interface Project {
    slug: string;
    name: string;
    tagline?: string;
    location: string;
    status: "Ongoing" | "Delivered" | "Upcoming";
    heroImage: string;
    heroImageAlt: string;
    galleryImages: string[];
    galleryImageAlts: string[];
    description: string;
    longDescription: string;
    priceLabel: string;
    area?: string;
    configurations: ProjectConfig[];
    amenities: AmenityCategory[];
    highlights: string[];
    residencesSummary?: string;
    projectType?: string;
    totalUnits?: string;
    amenityIcons?: Record<string, string>;
    locationAdvantages?: LocationAdvantage[];
    renders?: ProjectRender[];
}

export const projects: Project[] = [
    {
        slug: "regal-residencia",
        name: "Regal Residencia",
        tagline: "3, 3+1 & 4+1 BHK residences in Sector 114, Mohali, designed with open landscapes, podium-level amenities, and seamless green connectivity.",

        location: "Sector 114, Mohali",
        status: "Ongoing",
        heroImage: "/regal_rersidencia/Regal_Residencia_.jpg.jpeg",
        heroImageAlt: "Grand front elevation of Regal Residencia showrooms and residential balconies under a clear sky",
        priceLabel: "₹6,900/sq.ft.",
        area: "8.5 Acres",
        residencesSummary: "3, 3+1 & 4+1 BHK Homes",
        totalUnits: "650 Units",
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
        galleryImageAlts: [
            "Aerial view of the Regal Residencia residential cluster with landscaped common areas",
            "Modern architectural detail of the residential towers at Regal Residencia",
            "Luxurious apartment interior living room with elegant furniture",
            "Spacious balcony view overlooking the Mohali skyline",
            "World-class swimming pool and deck area at the signature club",
            "Interactive children's play area with safe resilient flooring",
            "Premium marble-finished lobby and reception area",
            "Night view of Regal Residencia with integrated ambient lighting"
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

        ],
        locationAdvantages: [
            { category: "Educational Institutions", name: "Delhi Public School", distance: "05 mins" },
            { category: "Educational Institutions", name: "Guru Nanak Foundation School", distance: "05 mins" },
            { category: "Educational Institutions", name: "Oakridge International School", distance: "10 mins" },
            { category: "Educational Institutions", name: "Manav Mangal Smart School", distance: "10 mins" },
            { category: "Educational Institutions", name: "Amity International School", distance: "15 mins" },
            { category: "Educational Institutions", name: "CGC Landran", distance: "05 mins" },
            { category: "Educational Institutions", name: "Chandigarh University", distance: "20 mins" },
            { category: "Educational Institutions", name: "Rayat Bahra University", distance: "18 mins" },
            { category: "Retail & Hotels", name: "Burger King", distance: "2 mins" },
            { category: "Retail & Hotels", name: "KFC", distance: "3 mins" },
            { category: "Retail & Hotels", name: "Domino's", distance: "2 mins" },
            { category: "Retail & Hotels", name: "CP 67 Mall", distance: "15 mins" },
            { category: "Retail & Hotels", name: "VR Mall", distance: "15 mins" },
            { category: "Retail & Hotels", name: "Canaught Place Market TDI", distance: "10 mins" },
            { category: "Retail & Hotels", name: "Bestech Mall", distance: "20 mins" },
            { category: "Hospitals", name: "Sohana Multi Speciality Hospital", distance: "10 mins" },
            { category: "Hospitals", name: "Ivy Hospital", distance: "10 mins" },
            { category: "Hospitals", name: "Fortis Hospital", distance: "20 mins" },
            { category: "Hospitals", name: "Max Hospital", distance: "20 mins" },
            { category: "Hospitals", name: "New Life Hospital", distance: "05 mins" },
            { category: "Business Parks", name: "Quark City", distance: "15 mins" },
            { category: "Business Parks", name: "Industrial Area Phase 7 & 8", distance: "15 mins" },
            { category: "Business Parks", name: "IT City 82", distance: "25 mins" },
            { category: "Transportation", name: "International Airport", distance: "25 mins" },
        ],
    },
    {
        slug: "regal-heights",
        name: "Regal Heights",
        tagline: "Choose from well-designed 2 & 3 BHK residences that balance space, functionality, and comfort for a better living experience.",
        location: "Sector 91, Mohali",
        status: "Ongoing",
        heroImage: "/regal_heights/Regal_Heights_.jpg.jpeg",
        heroImageAlt: "Panoramic view of Regal Heights luxury high-rise towers in Sector 91, Mohali",
        priceLabel: "₹8,600/sq.ft.",
        area: "5.37 Acres",
        description: "Regal Heights is thoughtfully designed to offer a perfect blend of modern living and everyday comfort.",
        longDescription: "Regal Heights is thoughtfully designed to offer a perfect blend of modern living and everyday comfort. Crafted with attention to detail, the project brings together contemporary architecture, well-planned spaces, and a peaceful environment — creating a lifestyle that feels both elevated and effortless.\n\nWhether it’s the quality of construction, smart layouts, or serene surroundings, Regal Heights is built for those who aspire for more than just a home.",
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
        renders: [
            {
                src: "/regal_heights/renders/aerial-front.jpg",
                alt: "Aerial view of the three Regal Heights towers surrounded by landscaped greens",
                label: "Aerial View",
                caption: "All three towers set within landscaped greens, with the podium sports deck at the centre.",
            },
            {
                src: "/regal_heights/renders/corner-tower.jpg",
                alt: "Corner elevation of a Regal Heights tower above the kids' play area",
                label: "Corner Elevation",
                caption: "Wrap-around balconies on the corner tower, looking over the children's play zone.",
            },
            {
                src: "/regal_heights/renders/tower-elevation.jpg",
                alt: "Street-level elevation of the Regal Heights residential blocks",
                label: "Tower Elevation",
                caption: "Street-level view of the residential blocks, stilt parking and boundary landscaping.",
            },
            {
                src: "/regal_heights/renders/terrace-aerial.jpg",
                alt: "Top-down view of the Regal Heights terrace, podium gardens and tennis court",
                label: "Terrace Bird's Eye",
                caption: "Top-down view across the private terraces, podium gardens and the tennis court.",
            },
            {
                src: "/regal_heights/renders/pool-terrace.jpg",
                alt: "Private pool terrace with barbecue counter and outdoor dining at Regal Heights",
                label: "Pool Terrace",
                caption: "A private pool terrace with barbecue counter, pergola and outdoor dining.",
            },
            {
                src: "/regal_heights/renders/rooftop-bar.jpg",
                alt: "Rooftop bar and lounge seating under a bougainvillea pergola at Regal Heights",
                label: "Rooftop Bar",
                caption: "Bougainvillea-shaded bar counter and lounge seating, facing the sunset.",
            },
            {
                src: "/regal_heights/renders/sports-arena.jpg",
                alt: "Badminton and tennis courts at the podium level of Regal Heights",
                label: "Sports Arena",
                caption: "Badminton and tennis courts at podium level, framed by the towers.",
            },
        ],
        galleryImageAlts: [
            "Majestic front entrance of Regal Heights residential tower",
            "Vibrant evening view of the central podium park",
            "Luxury 4 BHK apartment interior with premium flooring and false ceiling",
            "State-of-the-art gymnasium at the Regal Heights club",
            "Sun-facing layout of the residential blocks maximizing natural light",
            "Elegant dining area and modular kitchen setup",
            "Scenic view from the sky villa balcony",
            "25,000 sq.ft. signature double-height club house",
            "Kids' splash pool and separate adult swimming lanes",
            "Beautifully landscaped jogging tracks and green walkways"
        ],
        configurations: [
            { type: "2 BHK Apartments", size: "Well-designed" },
            { type: "3 BHK Apartments", size: "Well-designed" },
        ],
        amenities: [
            {
                name: "Club House",
                items: ["Terrace Lounge", "Swimming Pool", "Gymnasium", "Party Hall"]
            },
            {
                name: "Sports Arena",
                items: ["Badminton Court", "Skating Rink", "Podium Garden", "Open Gym"]
            },
            {
                name: "Social Interaction Area (For Elders)",
                items: ["Separate Sitouts", "Gazebo", "Herbs Garden", "Easy Staircase"]
            },
            {
                name: "Additional Feature",
                items: ["Jogging Track with Lush Green Park"]
            },
        ],
        highlights: [
            "Contemporary Architecture",
            "Smart Layouts",
            "Serene Surroundings",
            "Optimal Space Utilization",
            "Natural Light & Ventilation",
        ],
        residencesSummary: "2 & 3 BHK Apartments",
        totalUnits: "125 Units",
        projectType: "Luxury Residential",
    },
    {
        slug: "regal-empirus",
        name: "Regal Empirus",
        tagline: "3+1 & 4+1 BHK ultra-luxury residences in Sector 91, Mohali, featuring sun-facing layouts, iconic skywalk design, and world-class amenities.",
        location: "Sector 91, Mohali",
        status: "Ongoing",
        heroImage: "/regal_empirus/Regal_Empirus_.jpg.jpeg",
        heroImageAlt: "Architectural visualization of Regal Empirus ultra-luxury residential towers",
        priceLabel: "₹8,600/sq.ft.",
        area: "5.37 Acres",
        description: "An expression of ultra-luxury across 5.37 acres in Sector 91, featuring iconic architecture, 3-side open residences, and landscaped podium gardens.",
        longDescription: "Regal Empirus is an expression of ultra-luxury, crafted for those who belong to a class above. Spread across 5.37 acres in Sector 91, it stands as a landmark where iconic architecture meets expansive green landscapes.\n\nDesigned for grandeur, each residence offers spacious layouts, 3-side open living, and abundant natural light—creating homes that feel open, elegant, and exceptional. With world-class amenities and a landscaped podium garden, every detail reflects comfort, privacy, and indulgence.\n\nFeaturing exclusive 3+1 and 4+1 residences, along with Earth Villas and Duplex Sky Villas, Regal Empirus is more than a home—it’s a statement of refined living.",
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
        renders: [
            {
                src: "/regal_empirus/renders/grand-entrance.jpg",
                alt: "Twin Regal Empirus towers framing the sculpted entrance court at dusk",
                label: "Grand Entrance",
                caption: "The twin towers framing the sculpted entrance court at dusk.",
            },
            {
                src: "/regal_empirus/renders/tower-portal.jpg",
                alt: "Low-angle view of the Regal Empirus arrival portal and tower facade",
                label: "Arrival Portal",
                caption: "Low-angle view of the arrival portal and the tiered balcony facade above it.",
            },
            {
                src: "/regal_empirus/renders/night-elevation.jpg",
                alt: "Regal Empirus towers lit up at night beside the Sector 91 arterial road",
                label: "Night Elevation",
                caption: "The towers lit against the Sector 91 arterial road after dark.",
            },
            {
                src: "/regal_empirus/renders/clubhouse-pool.jpg",
                alt: "Fountain-lined pool deck beside the double-height Regal Empirus clubhouse",
                label: "Clubhouse & Pool",
                caption: "Fountain-lined pool deck running alongside the double-height clubhouse.",
            },
            {
                src: "/regal_empirus/renders/podium-aerial.jpg",
                alt: "Aerial view of the landscaped Regal Empirus podium gardens and pool at night",
                label: "Podium Gardens",
                caption: "Bird's-eye of the landscaped podium — play zones, walkways and the pool.",
            },
            {
                src: "/regal_empirus/renders/sports-courts.jpg",
                alt: "Floodlit tennis and badminton courts at Regal Empirus",
                label: "Sports Courts",
                caption: "Floodlit tennis and badminton courts set within the podium landscape.",
            },
        ],
        galleryImageAlts: [
            "Sophisticated facade design of Regal Empirus Sector 91",
            "Grand double-height lobby at the entrance of Empirus Towers",
            "Ultra-luxury living room with panoramic glass windows",
            "Private terrace garden attached to an earth villa",
            "Modern master bedroom with italian marble flooring",
            "Fully equipped fitness centre and wellness spa",
            "Resort-style infinity pool overview",
            "Iconic skywalk connecting the signature towers"
        ],
        configurations: [
            { type: "3+1 BHK", size: "2200 sq.ft." },
            { type: "4+1 BHK", size: "3200 sq.ft." },
            { type: "Earth Villas & Duplex Sky Villas", size: "TBA" },
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
            "5.37 Acres Premium Township",
            "5 Signature Towers",
            "95%+ Sun-Facing Apartments",
            "3+1 & 4+1BHK residences with Duplex villas",
        ],
        residencesSummary: "3+1, 4+1 BHK & Duplex Villas",
        totalUnits: "380 Units",
        projectType: "Ultra-Luxury Residential",
        locationAdvantages: [
            { name: "Manav Mangal School", distance: "0 mins", category: "EDUCATION", image: "/regal_empirus/location_images/Manav_mangal_school.jpeg", imageAlt: "Facade of Manav Mangal Smart School campus" },
            { name: "CGC Landran", distance: "2 mins", category: "EDUCATION", image: "/regal_empirus/location_images/cgc_landran.jpeg", imageAlt: "Entrance of CGC Landran college campus" },
            { name: "Amity School", distance: "7 mins", category: "EDUCATION", image: "/regal_empirus/location_images/Amity_univercity.jpeg", imageAlt: "Modern architecture of Amity University building" },
            { name: "Quark City", distance: "3 mins", category: "IT & BUSINESS", image: "/regal_empirus/location_images/quark_city.jpeg", imageAlt: "Professional exterior of Quark City IT Park" },
            { name: "IT Hub", distance: "2 mins", category: "IT & BUSINESS", image: "/regal_empirus/location_images/IT city.jpeg", imageAlt: "Developing IT City Sector 82 skyline" },
            { name: "Ivy Hospital", distance: "3 mins", category: "HEALTHCARE", image: "/regal_empirus/location_images/IVY.jpeg", imageAlt: "Ivy Hospital Mohali building exterior" },
            { name: "Sohana Multi Speciality Hospital", distance: "5 mins", category: "HEALTHCARE", image: "/regal_empirus/location_images/sohana_hospital.jpeg", imageAlt: "Front view of Sohana Multi Speciality Hospital" },
            { name: "Fortis Hospital", distance: "10 mins", category: "HEALTHCARE", image: "/regal_empirus/location_images/Fortis_hospital.jpeg", imageAlt: "Iconic Fortis Hospital Mohali building" },
            { name: "CP 67 Mall", distance: "8 mins", category: "LIFESTYLE", image: "/regal_empirus/location_images/cp 67.jpeg", imageAlt: "Main entrance of CP 67 Mall on Airport road" },
            { name: "International Airport", distance: "20 mins", category: "CONNECTIVITY", image: "/regal_empirus/location_images/Airport.jpeg", imageAlt: "Aerial view of Chandigarh International Airport terminal" },
        ],
    },
    {
        slug: "regal-luxuria",
        name: "Regal Luxuria",
        tagline: "Commercial plots in Sector 114, Mohali across 6 acres, offering 70 premium plots planned for high-visibility retail and business growth.",
        location: "Mohali",
        status: "Upcoming",
        heroImage: "/regal_heights/Regal_Luxuria_.jpg.jpeg",
        heroImageAlt: "Commercial plots at Regal Luxuria Sector 114 Mohali ready for development",
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
        galleryImageAlts: [
            "Modern commercial complex elevation showing retail fronts",
            "Luxury lobby design for corporate office space",
            "Elegant living space visualization for premium suites",
            "Rooftop infinity pool as part of the luxury amenities"
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
        totalUnits: "70 Showrooms",
        projectType: "Premium Commercial Plots",
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
    return projects.map((p) => p.slug);
}
