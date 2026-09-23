export type BlueprintCategory = "Master Plan" | "Landscape" | "Floor Plans" | "Retail Spaces";

export type Blueprint = {
  src: string;
  alt: string;
  label: string;
  meta: string;
  category: BlueprintCategory;
  width: number;
  height: number;
};

export const blueprintCategories: BlueprintCategory[] = ["Master Plan", "Landscape", "Floor Plans", "Retail Spaces"];

export const blueprints: Blueprint[] = [
  {
    src: "/architecture/master-plan-color.png",
    alt: "Colored master plan showing residential towers, retail block and landscaped courtyard",
    label: "Master Plan",
    meta: "Site Layout",
    category: "Master Plan",
    width: 1408,
    height: 1920,
  },
  {
    src: "/architecture/master-plan-technical.png",
    alt: "Technical site plan with shop numbering, road widths and building footprints",
    label: "Site Plan",
    meta: "Technical Drawing",
    category: "Master Plan",
    width: 1408,
    height: 1920,
  },
  {
    src: "/architecture/ground-floor-parking.png",
    alt: "Ground floor layout with surface parking bays and drive aisles",
    label: "Ground Floor",
    meta: "Parking Layout",
    category: "Master Plan",
    width: 1408,
    height: 1920,
  },
  {
    src: "/architecture/basement-parking.png",
    alt: "Basement parking plan with ramps and drive-way circulation",
    label: "Basement",
    meta: "Parking Plan",
    category: "Master Plan",
    width: 1408,
    height: 1920,
  },
  {
    src: "/architecture/landscape-clubhouse.png",
    alt: "Landscaped clubhouse courtyard with pool, tennis court and jogging track",
    label: "Clubhouse Courtyard",
    meta: "Landscape Design",
    category: "Landscape",
    width: 1046,
    height: 1536,
  },
  {
    src: "/architecture/floor-plan-1450-sqft.png",
    alt: "Typical floor plan of a 1450 square foot two bedroom residence",
    label: "1450 Sq.Ft.",
    meta: "2 Bed · Typical Floor",
    category: "Floor Plans",
    width: 1920,
    height: 1261,
  },
  {
    src: "/architecture/floor-plan-1450-sqft-furnished.png",
    alt: "Furnished layout of the 1450 square foot residence with living and dining",
    label: "1450 Sq.Ft.",
    meta: "Furnished Layout",
    category: "Floor Plans",
    width: 1920,
    height: 1152,
  },
  {
    src: "/architecture/floor-plan-1565-sqft.png",
    alt: "Typical floor plan of a 1565 square foot residence with servant room",
    label: "1565 Sq.Ft.",
    meta: "2 Bed + Servant",
    category: "Floor Plans",
    width: 1920,
    height: 1261,
  },
  {
    src: "/architecture/floor-plan-2190-sqft.png",
    alt: "Floor plan of a 2190 square foot duplex residence with four bedrooms and deck",
    label: "2190 Sq.Ft.",
    meta: "4 Bed · Duplex",
    category: "Floor Plans",
    width: 1920,
    height: 1261,
  },
  {
    src: "/architecture/shop-plan-small.png",
    alt: "Retail shop floor plan, 16 by 60 feet, with shared passage and stairs",
    label: "16' × 60'",
    meta: "Retail Unit",
    category: "Retail Spaces",
    width: 1920,
    height: 1152,
  },
  {
    src: "/architecture/shop-plan-large.png",
    alt: "Retail shop floor plan, 18 by 80 feet, with lift and shared passage",
    label: "18' × 80'",
    meta: "Retail Unit",
    category: "Retail Spaces",
    width: 1920,
    height: 1152,
  },
];
