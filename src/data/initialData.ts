import { 
  BusinessProfile, 
  TrustStats, 
  Project, 
  Service, 
  Client, 
  Lead,
  CatalogItem, 
  BillDocument, 
  Testimonial, 
  FAQItem, 
  BlogPost, 
  MediaItem,
  SystemSettings,
  SiteVisit,
  Expense,
  Supplier,
  NotificationItem,
  AuditLog,
  SEOSettings,
  AnalyticsSummary
} from '../types.ts';

export const initialBusinessProfile: BusinessProfile = {
  brandName: "J.J. INTERIORS & MODUTECH",
  businessName: "J.J. INTERIORS & MODUTECH",
  tagline: "SPACES | DESIGNED | FOR A BETTER TOMORROW",
  industry: "Interior Design, Modular Furniture & Modutech Solutions",
  website: "www.jjinteriors.site",
  ownerName: "Mukesh Suthar",
  ownerDesignation: "OWNER & DESIGN DIRECTOR",
  ownerExperienceYears: 10,
  ownerPhoto: "/mukeshbhai.jpeg",
  ownerBio: "With a passion for authentic interior design and precision modular furniture, Mukesh Suthar leads J.J. INTERIORS & MODUTECH to deliver complete interior solutions. Every space is curated with practical space planning, quality materials, and transparent craftsmanship.",
  ownerVision: "To transform living and working environments by combining practical design with high-precision modular manufacturing, delivering transparent quotations, enduring durability, and complete interior solutions.",
  phone: "9898412998",
  whatsapp: "9898412998",
  email: "mukesh.jj.interiors@gmail.com",
  address: "148, RandalDham Society, ChanakyaPuri, New Sama Road, Vadodara - 390008, Gujarat, India",
  city: "Vadodara",
  state: "Gujarat",
  pin: "390008",
  panNo: "",
  upiId: "ns680578@okicici",
  upiQrUrl: "/upi-qr.jpg",
  bankDetails: {
    bankName: "",
    accountName: "",
    accountNumber: "",
    ifscCode: "",
    branch: ""
  },
  businessHours: "Monday – Saturday: 10:00 AM – 7:30 PM (Sunday by Prior Appointment)",
  googleMapsUrl: "https://maps.google.com/?q=Vadodara,Gujarat",
  googleBusinessUrl: "https://business.google.com/",
  socialLinks: {
    instagram: "https://instagram.com/jjinteriors.modutech",
    facebook: "https://facebook.com/jjinteriors.modutech",
    youtube: "https://youtube.com/@jjinteriors",
    linkedin: "https://linkedin.com/company/jjinteriors-modutech",
  },
};

export const initialTrustStats: TrustStats = {
  yearsOfExperience: 10,
  projectsCompleted: 100,
  happyClients: 50,
  citiesServed: "Vadodara, Surat, Anand & Across Gujarat",
};

export const initialServices: Service[] = [
  {
    id: "srv-1",
    title: "Complete Home Interiors",
    slug: "complete-home-interiors",
    iconName: "Home",
    shortDesc: "End-to-end interior design solutions for modern residences.",
    fullDesc: "Comprehensive interior design services for your entire home. From spatial layouts to material selection, we provide turnkey solutions for a beautiful and functional living space.",
    features: ["Space Planning", "Material Curation", "End-to-End Execution"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    active: true,
    order: 1,
  },
  {
    id: "srv-2",
    title: "Modular Kitchens",
    slug: "modular-kitchens",
    iconName: "CookingPot",
    shortDesc: "Ergonomic, waterproof modular kitchens with premium hardware.",
    fullDesc: "Engineered for your culinary needs. Our modular kitchens use water-resistant core boards, premium fittings, tandem box drawers, and smart pull-outs for maximum efficiency.",
    features: ["Waterproof Boards", "Soft-Close Hardware", "Smart Storage Layouts"],
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80",
    active: true,
    order: 2,
  },
  {
    id: "srv-3",
    title: "Wardrobes & Storage",
    slug: "wardrobes-and-storage",
    iconName: "Shirt",
    shortDesc: "Custom sliding and open wardrobes designed for maximum space.",
    fullDesc: "Maximize your vertical storage with our precision-cut modular wardrobes. Options include sliding shutters, fluted glass, integrated lighting, and smart organizers.",
    features: ["Floor-to-Ceiling Storage", "Custom Organizers", "Integrated Lighting"],
    image: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=900&q=80",
    active: true,
    order: 3,
  },
  {
    id: "srv-4",
    title: "Living Room Interiors",
    slug: "living-room-interiors",
    iconName: "Armchair",
    shortDesc: "Inviting living spaces with bespoke furniture and elegant wall treatments.",
    fullDesc: "We create welcoming, conversational living areas with custom TV units, false ceilings, mood lighting, and comfortable bespoke seating arrangements.",
    features: ["Custom TV Units", "False Ceilings", "Elegant Lighting"],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    active: true,
    order: 4,
  },
  {
    id: "srv-5",
    title: "Bedroom Interiors",
    slug: "bedroom-interiors",
    iconName: "Bed",
    shortDesc: "Serene master bedrooms tailored for deep rest and privacy.",
    fullDesc: "Personal sanctuaries designed for relaxation. We provide platform beds with storage, custom headboards, side tables, and soothing ambient lighting.",
    features: ["Storage Beds", "Custom Headboards", "Ambient Lighting"],
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=900&q=80",
    active: true,
    order: 5,
  },
  {
    id: "srv-6",
    title: "Office & Commercial Interiors",
    slug: "office-and-commercial-interiors",
    iconName: "Briefcase",
    shortDesc: "Professional and productive commercial workspaces.",
    fullDesc: "Complete commercial interior solutions focusing on durability, traffic flow, and professional aesthetics. From ergonomic workstations to welcoming reception areas.",
    features: ["Ergonomic Workstations", "Durable Finishes", "Professional Look"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    active: true,
    order: 6,
  },
  {
    id: "srv-7",
    title: "Custom Furniture",
    slug: "custom-furniture",
    iconName: "Sofa",
    shortDesc: "Tailor-made furniture pieces crafted for your specific needs.",
    fullDesc: "If you can imagine it, we can build it. Our factory provides precision-made custom furniture combining metal, glass, and wood for unique pieces.",
    features: ["Tailor-Made Design", "Quality Materials", "Factory Finish"],
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=80",
    active: true,
    order: 7,
  },
  {
    id: "srv-8",
    title: "False Ceiling & Lighting",
    slug: "false-ceiling-and-lighting",
    iconName: "Sparkles",
    shortDesc: "Architectural ceiling designs and ambient lighting planning.",
    fullDesc: "Enhance your spatial dimensions with custom false ceiling designs, acoustic treatments, and strategically planned cove and profile lighting.",
    features: ["Acoustic Treatments", "Cove Lighting", "Custom Designs"],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    active: true,
    order: 8,
  },
  {
    id: "srv-9",
    title: "TV Units & Wall Design",
    slug: "tv-units-and-wall-design",
    iconName: "Monitor",
    shortDesc: "Custom entertainment units and accent wall paneling.",
    fullDesc: "Transform your living or bedroom walls with bespoke TV entertainment consoles, acoustic wall paneling, and curated finishes.",
    features: ["Floating Media Consoles", "Wall Paneling", "Concealed Wiring"],
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=900&q=80",
    active: true,
    order: 9,
  },
  {
    id: "srv-10",
    title: "Turnkey Interior Solutions",
    slug: "turnkey-interior-solutions",
    iconName: "Key",
    shortDesc: "End-to-end design to installation interior projects.",
    fullDesc: "From empty spaces to fully furnished environments. We handle the entire process including civil changes, manufacturing, and final installation.",
    features: ["Single Point of Contact", "Complete Execution", "Hassle-Free"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    active: true,
    order: 10,
  }
];

export const initialProjects: Project[] = [
  {
    id: "prj-1",
    title: "The Vesu Penthouse Residence",
    slug: "vesu-penthouse-residence",
    category: 'COMPLETE HOME INTERIOR',
    clientName: "Private Client (Vesu)",
    location: "Vesu, Surat",
    year: "2025",
    area: "4,200 Sq.Ft",
    description: "A 4,200 sq.ft duplex penthouse centered around warm walnut wood, Italian travertine marble, and seamless modular architectural cabinetry.",
    concept: "Architectural tranquility blending natural earth tones, warm ivory lime wash textures, and subtle brass accents.",
    designConcept: "Architectural tranquility blending natural earth tones, warm ivory lime wash textures, and subtle brass accents.",
    materials: "Smoked Walnut Veneer, Statuario Marble, Fluted Glass, Brushed Champagne Brass",
    highlights: [
      "Double-height living lounge with acoustic fluted timber panels",
      "Concealed bar console with automatic touch-latch lighting",
      "Minimalist master bedroom suite with walk-through dressing chamber",
      "Seamless integration of automated smart climate and curtain controls"
    ],
    services: ["Interior Design", "Residential Interiors", "Modular Furniture", "Wardrobe Design"],
    designStyle: "Warm Contemporary Luxury",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    clientTestimonial: {
      clientName: "Rajesh & Meera Patel",
      quote: "J.J. INTERIORS transformed our raw duplex into an absolute architectural masterpiece. Their Modutech factory joinery is millimeter-perfect, zero site mess, and completed ahead of schedule.",
      rating: 5,
      location: "Vesu, Surat"
    },
    viewsCount: 480,
    inquiriesCount: 24,
    progressStage: 'COMPLETED',
    progressPercent: 100,
    documents: [
      {
        id: "doc-1",
        name: "Architectural Layout & Spatial Plan (PDF)",
        type: "Floor Plan",
        url: "#",
        fileSize: "4.2 MB",
        uploadedAt: "2025-01-15",
        clientVisible: true
      },
      {
        id: "doc-2",
        name: "Approved Material Palette & Finishes Specification",
        type: "Material List",
        url: "#",
        fileSize: "2.8 MB",
        uploadedAt: "2025-01-20",
        clientVisible: true
      },
      {
        id: "doc-3",
        name: "Final Handover & 10-Year Warranty Certificate",
        type: "Agreement",
        url: "#",
        fileSize: "1.5 MB",
        uploadedAt: "2025-04-10",
        clientVisible: true
      }
    ],
    paymentSchedule: [
      { id: "ms-1", name: "Booking Amount & Layout Finalization", percent: 10, amount: 420000, status: "Paid", paidDate: "2025-01-15" },
      { id: "ms-2", name: "3D Visuals & Design Sign-off", percent: 20, amount: 840000, status: "Paid", paidDate: "2025-02-01" },
      { id: "ms-3", name: "Modutech Factory Production", percent: 40, amount: 1680000, status: "Paid", paidDate: "2025-03-01" },
      { id: "ms-4", name: "Site Delivery & Installation Phase", percent: 20, amount: 840000, status: "Paid", paidDate: "2025-03-25" },
      { id: "ms-5", name: "Final Handover & Snagging Clearance", percent: 10, amount: 420000, status: "Paid", paidDate: "2025-04-10" }
    ],
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
    ],
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    budget: "₹38 Lakhs - ₹45 Lakhs",
    status: 'COMPLETED',
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: "prj-2",
    title: "Bespoke Island Kitchen & Modutech Pantry",
    slug: "island-kitchen-piplod",
    category: 'MODULAR KITCHEN',
    clientName: "Private Villa (Piplod)",
    location: "Piplod, Surat",
    year: "2025",
    area: "320 Sq.Ft",
    description: "State-of-the-art parallel modular kitchen featuring an expansive quartz breakfast counter, hidden appliance garage, and dual-zone induction cooking.",
    concept: "Ergonomic triangular workflow crafted for intensive culinary requirements with zero visible clutter.",
    designConcept: "Ergonomic triangular workflow crafted for intensive culinary requirements with zero visible clutter.",
    materials: "Anti-Fingerprint Matte Acrylic, Calacatta Quartz Counter, Blum Servo-Drive, Anodized Gola Profiles",
    highlights: [
      "Servo-drive electronic opening on upper lift-up cabinets",
      "Full-height tandem pull-out pantry with 120kg payload capacity",
      "Integrated under-counter LED profile illumination with warm 3000K warmth",
      "100% waterproof HDHMR carcass construction"
    ],
    services: ["Modular Kitchen", "Modutech Solutions"],
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=85"
    ],
    beforeImage: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
    budget: "₹9.5 Lakhs",
    status: 'COMPLETED',
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: "prj-3",
    title: "Executive Diamond Trading Headquarters",
    slug: "diamond-trading-headquarters-surat",
    category: 'COMMERCIAL',
    clientName: "Gems & Jewelry Enterprise",
    location: "Ring Road, Surat",
    year: "2024",
    area: "3,000 Sq.Ft",
    description: "An ultra-refined 3,000 sq.ft corporate workspace with private client consultation vaults, acoustic conference rooms, and an executive chairman suite.",
    concept: "Understated opulence reflecting trust, confidentiality, and Surat's diamond heritage through clean linear architecture.",
    designConcept: "Understated opulence reflecting trust, confidentiality, and Surat's diamond heritage through clean linear architecture.",
    materials: "Charcoal Slats, Fluted Glass Partitions, Leatherette Wall Panels, Natural Oak Workstations",
    highlights: [
      "Sound-damped private valuation chambers with specialized daylight CRI 98 lamps",
      "Custom boardroom table with concealed power pop-ups and video-conferencing dock",
      "Lobby reception featuring back-lit translucent onyx stone counter"
    ],
    services: ["Commercial Interiors", "Office Interiors", "Modular Furniture"],
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85"
    ],
    beforeImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    budget: "₹28 Lakhs",
    status: 'COMPLETED',
    featured: true,
    published: true,
    order: 3,
  },
  {
    id: "prj-4",
    title: "Monochrome Master Bedroom & Walk-in Wardrobe",
    slug: "monochrome-master-bedroom-vip-road",
    category: 'BEDROOM',
    clientName: "VIP Road Apartment",
    location: "VIP Road, Surat",
    year: "2025",
    area: "380 Sq.Ft",
    description: "A tranquil sanctuary combining a king platform bed with integrated floating nightstands and a floor-to-ceiling glass wardrobe suite.",
    concept: "Hotel-grade luxury crafted for restfulness with indirect cove illumination and tactile boucle upholstery.",
    designConcept: "Hotel-grade luxury crafted for restfulness with indirect cove illumination and tactile boucle upholstery.",
    materials: "Smoked Glass Shutters, PU Duco Finish, Boucle Fabric, American Walnut",
    highlights: [
      "Soft-close 9-foot sliding wardrobe shutters with champagne gold aluminum framing",
      "Concealed vanity with back-lit magnifying arch mirror and jewelry drawers",
      "Acoustic fabric headboard spanning the full wall width"
    ],
    services: ["Bedroom Interiors", "Wardrobe Design", "Modular Furniture"],
    coverImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85"
    ],
    beforeImage: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    budget: "₹14 Lakhs",
    status: 'COMPLETED',
    featured: true,
    published: true,
    order: 4,
  },
  {
    id: "prj-5",
    title: "Contemporary 4BHK Villa Living & Dining",
    slug: "contemporary-villa-pal",
    category: 'LIVING ROOM',
    clientName: "Private Villa (Pal)",
    location: "Pal, Surat",
    year: "2024",
    area: "1,850 Sq.Ft",
    description: "An open-plan residential social zone connecting the grand foyer, living hall, dining salon, and private courtyard garden.",
    concept: "Expansive airy living enriched by bespoke brass inlays and low-profile modular furniture.",
    designConcept: "Expansive airy living enriched by bespoke brass inlays and low-profile modular furniture.",
    materials: "Dyna Italian Marble, Teakwood Ribs, Brushed Brass, Silk Wallpaper",
    highlights: [
      "Floating TV media console with bookmatched marble back-panel",
      "Custom 8-seater dining table with solid marble slab top",
      "Linear LED magnetic track lighting system"
    ],
    services: ["Interior Design", "Residential Interiors", "Modular Furniture"],
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
    ],
    beforeImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    budget: "₹24 Lakhs",
    status: 'COMPLETED',
    featured: true,
    published: true,
    order: 5,
  },
  {
    id: "prj-6",
    title: "Luxury Walk-Through Dressing Chamber",
    slug: "luxury-walk-through-dressing-chamber",
    category: 'CUSTOM FURNITURE',
    clientName: "Bungalow Project (Adajan)",
    location: "Adajan, Surat",
    year: "2025",
    area: "240 Sq.Ft",
    description: "Dedicated dressing chamber featuring dual wardrobe islands, automated tie/watch drawers, and climate-protected shoe galleries.",
    concept: "Boutique retail experience brought into the home with warm spotlighting and dust-sealed joinery.",
    designConcept: "Boutique retail experience brought into the home with warm spotlighting and dust-sealed joinery.",
    materials: "Bronze Fluted Glass, Matte Black Profiles, Velvet Liners, Italian Ash",
    highlights: [
      "Dust-sealed magnetic compression gaskets on all shutter borders",
      "Central accessories island with tempered glass top displaying watches & perfumes",
      "Full-height 360-degree pivoting dressing mirror"
    ],
    services: ["Wardrobe Design", "Modutech Solutions"],
    coverImage: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85"
    ],
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85",
    budget: "₹8 Lakhs",
    status: 'COMPLETED',
    featured: false,
    published: true,
    order: 6,
  }
];

export const initialLeads: Lead[] = [
  {
    id: "lead-201",
    name: "Vikrambhai Patel",
    phone: "+91 98251 44520",
    whatsapp: "+91 98251 44520",
    email: "vikram.patel@gujarattextiles.com",
    city: "Surat",
    propertyType: "3BHK Luxury Apartment",
    projectType: "Complete Turnkey Interior",
    approxBudget: "₹25 - 35 Lakhs",
    expectedStartDate: "Immediate / Within 15 Days",
    message: "Possession received at Vesu. Looking for complete turnkey execution with modular kitchen, Italian marble polishing, and false ceiling with cove lighting.",
    status: 'ACTIVE',
    notes: "Site visit conducted with founder Mukesh on Tuesday. Measurement drawings completed.",
    followUpDate: "2026-03-18",
    createdAt: "2026-03-02"
  },
  {
    id: "lead-202",
    name: "Dr. Shalini Mehta",
    phone: "+91 9898412998",
    whatsapp: "+91 9898412998",
    email: "shalini.mehta@cliniccare.in",
    city: "Surat",
    propertyType: "Commercial Clinic / Office",
    projectType: "Reception & Consultation Chambers",
    approxBudget: "₹15 - 20 Lakhs",
    expectedStartDate: "Next Month",
    message: "Requires clean acoustic partitions, dust-free modular cabinetry, and patient waiting lounge with branded reception desk.",
    status: 'FOLLOW-UP',
    notes: "Detailed quotation and 3D schematic presentation submitted.",
    followUpDate: "2026-03-20",
    createdAt: "2026-03-06"
  },
  {
    id: "lead-203",
    name: "Rohan & Priya Kapadia",
    phone: "+91 98255 11903",
    whatsapp: "+91 98255 11903",
    email: "rohan.kapadia@gmail.com",
    city: "Surat",
    propertyType: "4BHK Duplex Villa",
    projectType: "Modular Kitchen & Wardrobe Package",
    approxBudget: "₹20 - 30 Lakhs",
    expectedStartDate: "In 2-3 Months",
    message: "Interested in Modutech acrylic waterproof kitchen with island counter and walk-in wardrobe with bronze fluted glass.",
    status: 'LEAD',
    notes: "Inquiry received via website consultation form.",
    followUpDate: "2026-03-16",
    createdAt: "2026-03-11"
  }
];

export const initialClients: Client[] = [
  {
    id: "cli-101",
    name: "Dr. Rajesh K. Patel",
    phone: "+91 98250 XXXXX",
    email: "dr.rajesh.patel@example.com",
    address: "A-902, Green City Heights, Near VIP Circle",
    city: "Surat",
    projectType: "4BHK Complete Residential Interiors",
    status: "Active",
    budgetRange: "₹25 - 35 Lakhs",
    measurementsNotes: "Site visit completed on 12th Feb. Ceiling height 10.4 ft. Master bedroom requires acoustic wall paneling. Prefers warm walnut wood tones and quartz kitchen.",
    followUpNotes: "3D design presentation scheduled for this Saturday. Quotation QT-2026-0001 shared.",
    createdAt: "2026-02-10",
    lastContact: "2026-03-08",
  },
  {
    id: "cli-102",
    name: "Mr. Harshil V. Shah",
    phone: "+91 94281 XXXXX",
    email: "harshil.textiles@example.com",
    address: "Bungalow No. 14, Royal Palms, Dumas Road",
    city: "Surat",
    projectType: "Modular Kitchen & Wardrobes Renovation",
    status: "Completed",
    budgetRange: "₹12 - 15 Lakhs",
    measurementsNotes: "L-shaped kitchen 14x11 ft. Master wardrobe 16x9 ft. Completed and handed over with satisfaction signoff.",
    followUpNotes: "Invoice INV-2026-0001 fully settled. Referred brother for new apartment in Vesu.",
    createdAt: "2026-01-15",
    lastContact: "2026-02-28",
  },
  {
    id: "cli-103",
    name: "Architect Bhavin Mehta",
    phone: "+91 98980 XXXXX",
    email: "bhavin@studioform.in",
    address: "301, Corporate Hub, Ring Road",
    city: "Surat",
    projectType: "Corporate Office Modutech Furniture",
    status: "Active",
    budgetRange: "₹18 - 22 Lakhs",
    measurementsNotes: "24 workstations, 2 director cabins, 1 conference hall. Factory precision edge banding requested.",
    followUpNotes: "First factory batch ready for dispatch from Modutech workshop.",
    createdAt: "2026-02-20",
    lastContact: "2026-03-10",
  },
  {
    id: "cli-104",
    name: "Mrs. Priyanshi D. Desai",
    phone: "+91 97274 XXXXX",
    email: "priyanshi.desai@example.com",
    address: "Tower 4, Florenza, Althan",
    city: "Surat",
    projectType: "3BHK Full Interior Design & Styling",
    status: "New",
    budgetRange: "₹20 - 25 Lakhs",
    measurementsNotes: "Inquiry submitted through website consultation form. Moving in June 2026.",
    followUpNotes: "Initial introductory call completed. Site inspection booked for Monday.",
    createdAt: "2026-03-11",
    lastContact: "2026-03-12",
  }
];

export const initialCatalogItems: CatalogItem[] = [
  {
    id: "cat-1",
    name: "Acrylic Finish Modular Kitchen Base Cabinets",
    category: "Kitchen",
    description: "Boiling Waterproof (BWP) HDHMR core board with 1.5mm anti-scratch high-gloss acrylic shutters and waterproof edge banding.",
    unit: "Sq. Ft.",
    size: "Standard Base Height 34 inches, Depth 24 inches",
    material: "HDHMR + Acrylic + PVC Gaskets",
    rate: 1850,

    sku: "MK-BASE-ACR-01",
    active: true,
  },
  {
    id: "cat-2",
    name: "Overhead Kitchen Wall Cabinets with Servo-Lift",
    category: "Kitchen",
    description: "Hydraulic bi-fold lift-up mechanism with frosted glass profile frames and integrated LED profile slots.",
    unit: "Sq. Ft.",
    size: "Height 24-30 inches, Depth 14 inches",
    material: "HDHMR + Aluminum Profile + Glass",
    rate: 2100,

    sku: "MK-WALL-LIFT-02",
    active: true,
  },
  {
    id: "cat-3",
    name: "Full-Height Floor-to-Ceiling Sliding Wardrobe",
    category: "Wardrobe",
    description: "Heavy-duty top-hung concealed sliding system, anti-warp aluminum vertical stiffeners, and 1mm matte laminates with interior drawers.",
    unit: "Sq. Ft.",
    size: "Up to 10 ft Height, 24 inches Depth",
    material: "Action TESA HDHMR + Aluminum Rails",
    rate: 1950,

    sku: "WD-SLIDE-CEIL-01",
    active: true,
  },
  {
    id: "cat-4",
    name: "Tinted Fluted Glass Shutter with Bronze Profile",
    category: "Wardrobe",
    description: "5mm toughened fluted glass encased in sleek 20mm anodized champagne bronze frame with soft-damped hinges.",
    unit: "Sq. Ft.",
    size: "Custom Cut to Size",
    material: "Toughened Fluted Glass + Aluminum",
    rate: 2450,

    sku: "WD-GLASS-BRZ-02",
    active: true,
  },
  {
    id: "cat-5",
    name: "Designer TV Unit with Fluted Charcoal Louvers",
    category: "Living Room",
    description: "Floating entertainment console with push-to-open soft-close drawers and charcoal acoustic louver feature backdrop.",
    unit: "Rft",
    size: "Length 8 to 12 ft, Height 8 ft",
    material: "Charcoal Louver Panels + PU Finish",
    rate: 3200,

    sku: "LR-TV-LOUV-01",
    active: true,
  },
  {
    id: "cat-6",
    name: "King Platform Bed with Upholstered Headboard",
    category: "Bedroom",
    description: "Hydraulic storage box with heavy-duty gas pistons, internal white laminate lining, and luxury boucle/leatherette padded headrest.",
    unit: "Nos",
    size: "72 x 78 inches (King)",
    material: "Marine Ply + High Density Foam",
    rate: 42000,

    sku: "BD-KING-HYD-01",
    active: true,
  },
  {
    id: "cat-7",
    name: "High-End Quartz Stone Countertop Fabrication",
    category: "Kitchen",
    description: "20mm seamless quartz slab fabrication with 40mm sandwich bullnose edge polishing and sink cutout.",
    unit: "Sq. Ft.",
    size: "Custom Slabs",
    material: "93% Natural Quartz Stone",
    rate: 950,

    sku: "KT-QUARTZ-FAB-01",
    active: true,
  },
  {
    id: "cat-8",
    name: "Blum Tandembox Soft-Close Drawer Runner Set",
    category: "Hardware",
    description: "German-engineered concealed full extension soft-close runners with 30kg load capacity and 100,000 cycle certification.",
    unit: "Sets",
    size: "500mm / 550mm",
    material: "Epoxy Coated Steel",
    rate: 3400,

    sku: "HW-BLUM-TND-01",
    active: true,
  },
  {
    id: "cat-9",
    name: "Executive Modular Workstation (Linear Cluster)",
    category: "Commercial",
    description: "Heavy-duty powder coated MS loop leg frame with 25mm prelam top, cable tray, and fabric pinup privacy divider.",
    unit: "Nos",
    size: "4 ft x 2 ft per user",
    material: "MS Steel + Action TESA Prelam",
    rate: 8500,

    sku: "MOD-WS-LOOP-01",
    active: true,
  }
];

export const initialBills: BillDocument[] = [
  {
    id: "bill-001",
    type: "Quotation",
    docNumber: "QT-2026-0001",
    clientId: "cli-101",
    clientName: "Dr. Rajesh K. Patel",
    clientPhone: "+91 98250 XXXXX",
    clientEmail: "dr.rajesh.patel@example.com",
    clientAddress: "A-902, Green City Heights, Near VIP Circle, Surat",
    projectName: "Green City Heights 4BHK Premium Interiors",
    projectLocation: "Vesu, Surat",
    date: "2026-03-05",
    validUntilOrDueDate: "2026-04-05",
    paymentTerms: "10% Token Advance on Design Approval, 40% on Carcass Fabrication, 40% on Material Dispatch, 10% on Final Handover.",
    notes: "Rates are inclusive of professional factory fabrication, edge banding, on-site installation, and 10-year warranty on modular core boards.",
    sections: [
      {
        id: "sec-1",
        roomName: "Modular Kitchen & Pantry",
        items: [
          {
            id: "it-1",
            particular: "Acrylic Finish Base Kitchen Cabinets",
            description: "Waterproof HDHMR carcass with 1.5mm anti-scratch high gloss acrylic shutters & Gola profiles",
            size: "18 Rft (approx 45 sq.ft)",
            quantity: 45,
            unit: "Sq. Ft.",
            rate: 1850,
            amount: 83250,
          },
          {
            id: "it-2",
            particular: "Overhead Cabinets with Hydraulic Lift-Up",
            description: "Bi-fold lift-up system with aluminum frame frosted glass shutters & profile lighting",
            size: "14 Rft (approx 35 sq.ft)",
            quantity: 35,
            unit: "Sq. Ft.",
            rate: 2100,
            amount: 73500,
          },
          {
            id: "it-3",
            particular: "Blum Tandem Soft-Close Drawer Sets",
            description: "German soft-close drawer system with internal cutlery & thali dividers",
            size: "Set of 6 drawers",
            quantity: 6,
            unit: "Sets",
            rate: 3400,
            amount: 20400,
          },
          {
            id: "it-4",
            particular: "Quartz Stone Countertop & Edge Polishing",
            description: "40mm double sandwich edge with seamless under-mount sink cutout",
            size: "45 Sq. Ft.",
            quantity: 45,
            unit: "Sq. Ft.",
            rate: 950,
            amount: 42750,
          }
        ]
      },
      {
        id: "sec-2",
        roomName: "Living & Foyer Area",
        items: [
          {
            id: "it-5",
            particular: "Designer TV Unit with Fluted Charcoal Louvers",
            description: "Floating media storage with PU duco drawers and acoustic louver wall paneling",
            size: "10 ft wide x 8.5 ft high",
            quantity: 10,
            unit: "Rft",
            rate: 3200,
            amount: 32000,
          },
          {
            id: "it-6",
            particular: "Foyer Shoe Console with Seat & Back-lit Mirror",
            description: "Concealed ventilation louvers with cushioned bench and arched warm LED mirror",
            size: "5 ft wide x 7 ft high",
            quantity: 1,
            unit: "Nos",
            rate: 26500,
            amount: 26500,
          }
        ]
      },
      {
        id: "sec-3",
        roomName: "Master Bedroom Suite",
        items: [
          {
            id: "it-7",
            particular: "Floor-to-Ceiling Profile Sliding Wardrobe",
            description: "Champagne bronze aluminum profile with bronze tinted glass and internal LED sensors",
            size: "8 ft wide x 9.5 ft high (76 sq.ft)",
            quantity: 76,
            unit: "Sq. Ft.",
            rate: 2450,
            amount: 186200,
          },
          {
            id: "it-8",
            particular: "King Platform Bed with Hydraulic Storage",
            description: "Marine ply framework with gas lifts and premium boucle upholstered headboard",
            size: "72 x 78 inches",
            quantity: 1,
            unit: "Nos",
            rate: 42000,
            amount: 42000,
          }
        ]
      }
    ],
    subtotal: 506600,
    discountType: "percentage",
    discountValue: 5,
    discountAmount: 25330,


    additionalCharges: 0,
    additionalChargesDesc: "",
    grandTotal: 567898.6,
    amountPaid: 0,
    balanceDue: 567898.6,
    paymentStatus: "Pending",
    payments: [],
    createdAt: "2026-03-05",
  },
  {
    id: "bill-002",
    type: "Invoice",
    docNumber: "INV-2026-0001",
    clientId: "cli-102",
    clientName: "Mr. Naresh Suthar",
    clientPhone: "9898412998",
    clientEmail: "naresh@example.com",
    clientAddress: "Anand, Gujarat - 388001, India",
    projectName: "3 BHK Residence",
    projectType: "Residential Interior",
    projectLocation: "Anand, Gujarat",
    designer: "J.J. Design Team",
    referenceNo: "PRJ-2026-001",
    siteAddress: "Same as above",
    authorizedSignatoryName: "Mukesh Suthar",
    authorizedSignatoryRole: "Proprietor",
    date: "2026-07-29",
    validUntilOrDueDate: "2026-08-05",
    paymentMode: "UPI",
    paymentTerms: "1. Payment terms as agreed with the client.\n2. Material specifications are subject to approved selections.\n3. Any additional work will be billed separately.\n4. Changes after approval may affect cost and timeline.",
    notes: "All material specifications are as per approved samples. Any additional work will be billed separately.",
    sections: [
      {
        id: "sec-inv-1",
        roomName: "MODULAR KITCHEN",
        items: [
          {
            id: "it-inv-1",
            particular: "Kitchen Platform with Tandem Drawer (Acrylic Finish with Premium Hardware)",
            description: "High-density moisture-resistant carcass with soft-close tandem runners and Gola handleless profiles",
            size: "10 x 10",
            quantity: 100,
            unit: "S.F.T.",
            rate: 3000,
            amount: 300000,
          },
          {
            id: "it-inv-2",
            particular: "Overhead Cabinets (Laminate Finish)",
            description: "Overhead storage with hydraulic lift-up fittings and integrated warm profile lights",
            size: "10 x 5",
            quantity: 50,
            unit: "S.F.T.",
            rate: 2200,
            amount: 110000,
          },
          {
            id: "it-inv-3",
            particular: "Chimney Unit with Shutter",
            description: "Concealed duct exhaust enclosure with matching acrylic shutter panel",
            size: "4 x 2",
            quantity: 8,
            unit: "S.F.T.",
            rate: 2800,
            amount: 22400,
          }
        ]
      },
      {
        id: "sec-inv-2",
        roomName: "LIVING ROOM",
        items: [
          {
            id: "it-inv-4",
            particular: "TV Unit with Back Panel (Plywood with Laminate Finish)",
            description: "Floating media console with fluted louvers and acoustic backdrop panel",
            size: "8 x 2",
            quantity: 16,
            unit: "S.F.T.",
            rate: 1800,
            amount: 28800,
          },
          {
            id: "it-inv-5",
            particular: "False Ceiling with LED Lighting",
            description: "Gypsum perimeter false ceiling with indirect cove lighting and recessed COB spotlights",
            size: "-",
            quantity: 1,
            unit: "S.F.T.",
            rate: 45000,
            amount: 45000,
          },
          {
            id: "it-inv-6",
            particular: "Sofa (Custom Made)",
            description: "Bespoke 3+2 sectional sofa with solid teak internal framing and high-density foam upholstery",
            size: "-",
            quantity: 1,
            unit: "S.F.T.",
            rate: 85000,
            amount: 85000,
          }
        ]
      },
      {
        id: "sec-inv-3",
        roomName: "MASTER BEDROOM",
        items: [
          {
            id: "it-inv-7",
            particular: "Wardrobe with Sliding Doors (Matte Finish)",
            description: "Floor to ceiling sliding profile wardrobe with internal drawers and valet mirror",
            size: "8 x 7",
            quantity: 56,
            unit: "S.F.T.",
            rate: 2500,
            amount: 140000,
          },
          {
            id: "it-inv-8",
            particular: "Bed with Storage",
            description: "King size hydraulic storage platform bed with upholstered fluted headboard",
            size: "6 x 6",
            quantity: 36,
            unit: "S.F.T.",
            rate: 2800,
            amount: 100800,
          },
          {
            id: "it-inv-9",
            particular: "Study Table with Chair",
            description: "Floating ergonomic work desk with wire grommet and upholstered revolving chair",
            size: "4 x 2",
            quantity: 8,
            unit: "S.F.T.",
            rate: 2200,
            amount: 17600,
          }
        ]
      },
      {
        id: "sec-inv-4",
        roomName: "OTHER",
        items: [
          {
            id: "it-inv-10",
            particular: "Electrical & Accessories",
            description: "Modular switchboard relocations, accent chandeliers, and specialized fixture installations",
            size: "-",
            quantity: 1,
            unit: "S.F.T.",
            rate: 25000,
            amount: 25000,
          }
        ]
      }
    ],
    subtotal: 749600,
    discountType: "percentage",
    discountValue: 5,
    discountAmount: 37480,


    additionalCharges: 0,
    additionalChargesDesc: "",
    grandTotal: 840301,
    amountPaid: 400000,
    balanceDue: 440301,
    paymentStatus: "Partial",
    payments: [
      {
        id: "pay-1",
        date: "2026-07-29",
        amount: 400000,
        mode: "UPI",
        referenceNumber: "UPI-HDFC-9898412998",
        notes: "Advance installment against manufacturing",
      }
    ],
    createdAt: "2026-07-29",
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "tst-1",
    clientName: "Dr. R. K. Patel",
    project: "4BHK Penthouse Interiors",
    location: "Vesu, Surat",
    review: "J.J. INTERIORS & MODUTECH delivered an impeccable aesthetic for our home. The factory-finish modular cabinetry and seamless walnut veneer work exceeded our high expectations. The timeline was strictly honored.",
    rating: 5,
    featured: true,
    published: true,
  },
  {
    id: "tst-2",
    clientName: "Mr. Harshil Shah",
    project: "Parallel Modular Kitchen & Wardrobe",
    location: "Dumas Road, Surat",
    review: "The modular kitchen quality is truly German standard. The Blum soft-close mechanics and quartz countertop finish are flawless. What impressed me most was the zero-dust on-site assembly from their Modutech workshop.",
    rating: 5,
    featured: true,
    published: true,
  },
  {
    id: "tst-3",
    clientName: "Architect Bhavin Mehta",
    project: "Corporate Workspace & Workstations",
    location: "Ring Road, Surat",
    review: "We collaborated with J.J. INTERIORS & MODUTECH for our 3,000 sq.ft office furniture requirement. The edge banding precision, wire-management details, and acoustic wall panels were executed with masterclass engineering.",
    rating: 5,
    featured: true,
    published: true,
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "How does the interior design process work with J.J. INTERIORS & MODUTECH?",
    answer: "Our process is structured in 6 disciplined phases: 1. Initial Consultation & Lifestyle Analysis, 2. Comprehensive Site Dimension Survey, 3. Spatial Layout Planning & Moodboard Concept, 4. 3D Photorealistic Design & Material Approval, 5. Precision Factory Manufacturing at our Modutech unit, and 6. Clean On-Site Installation and Final Handover.",
    category: "Process",
    order: 1,
  },
  {
    id: "faq-2",
    question: "What makes your 'Modutech' modular solutions superior to on-site carpentry?",
    answer: "Our Modutech modular furniture is manufactured in a controlled factory setup using high-precision European CNC machinery and 0.8mm to 2mm zero-joint edge banders. This ensures 100% termite/borer proofing, millimeter-accurate joinery, water-resistant sealing, and virtually zero dust or disruption at your actual home during installation.",
    category: "Manufacturing",
    order: 2,
  },
  {
    id: "faq-3",
    question: "How long does a complete home interior project take in Gujarat?",
    answer: "A standard 3BHK or 4BHK turnkey interior project typically takes between 45 to 75 working days from 3D design approval, depending on the scale of civil modifications. Modular kitchen and wardrobe installations alone can be completed within 18 to 25 working days.",
    category: "Timelines",
    order: 3,
  },
  {
    id: "faq-4",
    question: "Do you provide transparent cost estimates before beginning work?",
    answer: "Yes, absolutely. We provide a detailed itemized estimate categorized room by room (Living Room, Kitchen, Master Bedroom, etc.) with explicit dimensions, core material specifications, hardware brand names, and transparent unit rates before any financial commitment.",
    category: "Pricing & Billing",
    order: 4,
  },
  {
    id: "faq-5",
    question: "What warranty do you provide on modular kitchens and wardrobes?",
    answer: "We provide an extensive 10-year structural warranty on our HDHMR and BWP core boards against borer and termite infestation, and manufacturer lifetime warranties on premium hardware fittings (such as Blum, Hettich, and Hafele).",
    category: "Warranty",
    order: 5,
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Modern Modular Kitchen Design Trends in Gujarat (2025 – 2026)",
    slug: "modern-modular-kitchen-trends-gujarat",
    excerpt: "Discover how handleless Gola profiles, antimicrobial quartz countertops, and anti-fingerprint acrylics are redefining contemporary luxury kitchens.",
    content: `Modern homeowners demand kitchens that look like editorial centerpieces while withstanding rigorous, spice-rich culinary routines.

### 1. Seamless Gola Profiles and Handleless Aesthetics
The traditional protruding drawer handle is making way for integrated C-profile and J-profile aluminum Gola tracks. This creates a clean, architectural line across base cabinets and island blocks.

### 2. High-Density Water Resistant Boards (HDHMR)
In humid coastal weather and daily wet mopping routines, standard commercial plywood or particle boards easily swell. J.J. INTERIORS & MODUTECH utilizes boiling-water-resistant (BWP) high-density fiberboards with polyurethane edge sealing to guarantee zero moisture ingress.

### 3. Integrated Spice Pantries and Corner Carousels
Every square inch matters. With German blind-corner pullouts (LeMans units) and tandem pantry tall units, items once lost in deep corner corners glide effortlessly to hand height with the touch of a finger.`,
    category: "Modular Kitchen",
    tags: ["Modular Kitchen", "Interior Architecture", "Quartz Counter", "Gola Profile"],
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80",
    author: "J.J. Design Studio",
    readTime: "4 min read",
    publishedAt: "2026-02-18",
    published: true,
    featured: true,
    metaTitle: "Modern Modular Kitchen Design Trends | J.J. INTERIORS & MODUTECH",
    metaDesc: "Explore the latest modular kitchen designs in Gujarat. Discover waterproof materials, Blum fittings, and smart pantry layouts with J.J. INTERIORS & MODUTECH.",
  },
  {
    id: "blog-2",
    title: "The Ultimate Guide to Designing Floor-to-Ceiling Wardrobes",
    slug: "guide-floor-to-ceiling-wardrobes",
    excerpt: "Learn how to maximize vertical volume in luxury apartments with acoustic sliding systems, tinted fluted glass, and automated motion-sensing wardrobe lighting.",
    content: `Standard 7-foot wardrobes leave an awkward, dust-collecting gap between the top of the cabinet and the ceiling. Designing continuous floor-to-ceiling wardrobes visually stretches the height of the room while offering 30% more usable seasonal storage.

### Fluted Glass vs. Solid Veneer
Combining solid smoked walnut doors on the daily storage sections with semi-transparent tinted fluted glass on the evening-wear section creates depth and architectural luxury.

### Velvet Accessory Drawers and Integrated Illumination
Warm 3000K recessed LED profiles triggered by magnetic door sensors transform dressing into a 5-star suite experience.`,
    category: "Wardrobes",
    tags: ["Wardrobes", "Walk-in Closet", "Luxury Bedroom", "Storage Solutions"],
    coverImage: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=900&q=80",
    author: "J.J. Design Studio",
    readTime: "5 min read",
    publishedAt: "2026-01-25",
    published: true,
    featured: true,
    metaTitle: "Floor-to-Ceiling Wardrobes Guide | J.J. INTERIORS & MODUTECH",
    metaDesc: "Comprehensive guide to custom modular wardrobes, sliding profiles, and walk-in dressing rooms with J.J. INTERIORS & MODUTECH.",
  },
  {
    id: "blog-3",
    title: "Residential Interior Design Cost Estimator for Gujarat Homes",
    slug: "interior-design-cost-estimator-gujarat",
    excerpt: "A realistic, transparent breakdown of material rates, civil renovation costs, and modular manufacturing expenses for 3BHK and 4BHK apartments.",
    content: `When embarking on a new home interior, understanding cost distribution is essential for budget discipline.

### How Interior Budgets Are Typically Distributed:
- **Modular Woodwork & Furniture (40-45%)**: Kitchen, wardrobes, TV units, beds, and study desks.
- **Civil & Surface Finishes (20-25%)**: False ceiling, gypsum plaster, Italian marble polishing, and wall paneling.
- **Electrical & Architectural Lighting (15%)**: Magnetic track lights, cob spots, sensor switches, and profile strips.
- **Soft Furnishing & Decor (15-20%)**: Curtains, wallpaper, bespoke upholstery, and artwork.

By sourcing factory-manufactured modular units directly from J.J. INTERIORS & MODUTECH, homeowners save on contractor markups while securing 10-year warranty coverage.`,
    category: "Cost Guide",
    tags: ["Cost Guide", "Budget Planning", "Turnkey Interiors", "Modular Costs"],
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
    author: "J.J. Design Studio",
    readTime: "6 min read",
    publishedAt: "2026-03-01",
    published: true,
    featured: false,
    metaTitle: "Interior Design Cost in Gujarat | Transparent Budget Guide",
    metaDesc: "Realistic turnkey interior design cost breakdown for apartments and villas with J.J. INTERIORS & MODUTECH.",
  }
];

export const initialMediaItems: MediaItem[] = [
  {
    id: "med-1",
    name: "vesu-living-duplex.webp",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    category: "Projects",
    size: "420 KB",
    dimensions: "1920 x 1080",
    uploadedAt: "2026-02-12",
  },
  {
    id: "med-2",
    name: "island-kitchen-quartz.webp",
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
    category: "Modular Kitchen",
    size: "385 KB",
    dimensions: "1920 x 1280",
    uploadedAt: "2026-02-18",
  },
  {
    id: "med-3",
    name: "master-bedroom-boucle.webp",
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    category: "Bedroom",
    size: "410 KB",
    dimensions: "1920 x 1280",
    uploadedAt: "2026-02-22",
  },
  {
    id: "med-4",
    name: "walk-in-closet-fluted.webp",
    url: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85",
    category: "Wardrobes",
    size: "340 KB",
    dimensions: "1600 x 1200",
    uploadedAt: "2026-03-01",
  }
];

export const initialSystemSettings: SystemSettings = {
  invoicePrefix: "INV-2026-",
  quotationPrefix: "QT-2026-",
  lastInvoiceSeq: 4,
  lastQuotationSeq: 3,

  currencySymbol: "₹",
  defaultPaymentTerms: `1. Payment terms as agreed with the client.
2. Material specifications are subject to approved selections.
3. Any additional work will be billed separately.
4. Any additions or alterations post approval will be charged extra.
6. Goods once delivered will not be taken back.
7. Subject to Gujarat jurisdiction only.
8. This is a computer generated invoice and does not require a physical signature.`,
  defaultNotes: "All material specifications are as per approved samples. Any additional work will be billed separately.",
  bankDetails: {
    bankName: "",
    accountName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
    upiId: "ns680578@okicici",
  }
};

export const initialSiteVisits: SiteVisit[] = [
  {
    id: "sv-1",
    date: "2026-03-15",
    time: "11:00 AM",
    leadId: "lead-1",
    clientName: "Bhavik Shah",
    clientPhone: "+91 98251 23456",
    projectName: "4BHK Luxury Apartment, Vesu",
    address: "Tower B, Flat 1202, Greenwoods, VIP Road, Vesu, Surat",
    assignedPerson: "Mukesh Suthar",
    notes: "Initial spatial measurement for modular kitchen and master wardrobe suite. Client interested in acrylic shutters.",
    status: "Scheduled",
    createdAt: "2026-03-10"
  },
  {
    id: "sv-2",
    date: "2026-03-16",
    time: "03:30 PM",
    clientName: "Pooja Desai",
    clientPhone: "+91 99099 87654",
    projectName: "Duplex Villa Renovation",
    address: "Bungalow 42, Riverview Enclave, Piplod, Surat",
    assignedPerson: "Design Lead",
    notes: "Living room TV console acoustic wall paneling and false ceiling framing verification.",
    status: "Scheduled",
    createdAt: "2026-03-11"
  },
  {
    id: "sv-3",
    date: "2026-03-08",
    time: "10:30 AM",
    clientName: "Dr. Kirit Mehta",
    clientPhone: "+91 94260 11223",
    projectName: "Dental Clinic Interior",
    address: "Shop 204, Shivalik Square, Adajan, Surat",
    assignedPerson: "Mukesh Suthar",
    notes: "Site handover checklist completed with zero pending snags.",
    status: "Completed",
    createdAt: "2026-03-05"
  }
];

export const initialSuppliers: Supplier[] = [
  {
    id: "sup-1",
    name: "Greenlam & Century Laminates Hub",
    phone: "+91 98241 55001",
    email: "orders@laminateshub.in",
    category: "Boards & Surfaces",
    products: ["HDHMR Boards", "1mm Matte Laminates", "Acrylic Sheets", "Veneer Flitches"],
    address: "Timber Market, Udhna Main Road, Surat",
    notes: "Primary supplier for Action TESA HDHMR moisture-resistant core boards.",
    outstandingAmount: 45000,
    createdAt: "2025-01-10"
  },
  {
    id: "sup-2",
    name: "Blum & Hettich Hardware Guild",
    phone: "+91 98250 88992",
    email: "surat@hardwareguild.com",
    category: "Hardware & Fittings",
    products: ["Soft-Close Hinges", "Tandem Drawers", "Lift-up Aventos Systems", "Wardrobe Profile Channels"],
    address: "Ring Road Hardware Arcade, Surat",
    notes: "Official distributor for Austrian Blum hardware. 10-year warranty certificate provided.",
    outstandingAmount: 28000,
    createdAt: "2025-01-15"
  },
  {
    id: "sup-3",
    name: "Apex Travertine & Quartz Studio",
    phone: "+91 99044 12345",
    email: "apexquartz@stone.in",
    category: "Countertops & Marble",
    products: ["Calacatta Quartz", "Italian Travertine", "Backlit Onyx Slabs"],
    address: "Bhatar Char Rasta, Surat",
    notes: "Countertop fabrication and seamless mitred sink joints.",
    outstandingAmount: 15000,
    createdAt: "2025-02-01"
  }
];

export const initialExpenses: Expense[] = [
  {
    id: "exp-1",
    date: "2026-03-02",
    category: "Materials",
    projectId: "prj-1",
    projectName: "The Vesu Penthouse Residence",
    supplierId: "sup-1",
    supplierName: "Greenlam & Century Laminates Hub",
    description: "Action TESA 18mm HDHMR Boards (45 sheets) & Adhesive drums",
    amount: 142000,
    paymentMethod: "Bank Transfer",
    receiptNumber: "GL-8821",
    notes: "Delivered directly to factory for CNC router sizing",
    createdAt: "2026-03-02"
  },
  {
    id: "exp-2",
    date: "2026-03-04",
    category: "Hardware",
    projectId: "prj-2",
    projectName: "Bespoke Island Kitchen & Modutech Pantry",
    supplierId: "sup-2",
    supplierName: "Blum & Hettich Hardware Guild",
    description: "Blum Antaro Tandem Boxes & Tip-On Blumotion drawer runners",
    amount: 68500,
    paymentMethod: "UPI",
    receiptNumber: "HG-4412",
    notes: "Dispatched to factory assembly floor",
    createdAt: "2026-03-04"
  },
  {
    id: "exp-3",
    date: "2026-03-06",
    category: "Labor",
    projectId: "prj-1",
    projectName: "The Vesu Penthouse Residence",
    description: "On-site precision installation team payout (Week 1)",
    amount: 48000,
    paymentMethod: "Bank Transfer",
    notes: "Supervised by Mukesh Suthar",
    createdAt: "2026-03-06"
  },
  {
    id: "exp-4",
    date: "2026-03-07",
    category: "Transport",
    projectId: "prj-1",
    projectName: "The Vesu Penthouse Residence",
    description: "Factory-to-site padded transport logistics with bubble wrap packing",
    amount: 9500,
    paymentMethod: "UPI",
    notes: "Surat city transit with hydraulic lift truck",
    createdAt: "2026-03-07"
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New Consultation Inquiry",
    message: "Bhavik Shah requested consultation for 4BHK Luxury Apartment in Vesu.",
    type: "lead",
    targetTab: "leads",
    targetId: "lead-1",
    read: false,
    createdAt: "2026-03-12T10:30:00Z"
  },
  {
    id: "notif-2",
    title: "Site Visit Scheduled",
    message: "Upcoming site visit tomorrow at 11:00 AM at Greenwoods, Vesu.",
    type: "site_visit",
    targetTab: "site_visits",
    targetId: "sv-1",
    read: false,
    createdAt: "2026-03-12T11:00:00Z"
  },
  {
    id: "notif-3",
    title: "Payment Milestone Due",
    message: "Payment milestone 'Installation Phase' due for Piplod Villa project.",
    type: "payment_due",
    targetTab: "billing",
    targetId: "doc-1",
    read: true,
    createdAt: "2026-03-10T14:00:00Z"
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "audit-1",
    action: "Quotation Generated",
    user: "Admin",
    targetType: "Quotation",
    targetId: "QT-2026-0001",
    details: "Created preliminary modular kitchen estimate for Bhavik Shah (₹4,85,000)",
    timestamp: "2026-03-10 16:45"
  },
  {
    id: "audit-2",
    action: "Project Published",
    user: "Admin",
    targetType: "Project",
    targetId: "prj-1",
    details: "Updated portfolio case study for The Vesu Penthouse Residence",
    timestamp: "2026-03-09 11:20"
  },
  {
    id: "audit-3",
    action: "Lead Converted",
    user: "Admin",
    targetType: "Lead",
    targetId: "lead-2",
    details: "Converted lead Ananya Joshi to Client profile CLI-002",
    timestamp: "2026-03-08 14:15"
  }
];

export const initialSEOSettings: SEOSettings = {
  home: {
    title: "J.J. INTERIORS & MODUTECH | Interior Design & Modular Furniture in Vadodara & Surat",
    description: "Leading interior design studio and Modutech modular furniture manufacturing in Vadodara & Surat, Gujarat. Bespoke homes, luxury modular kitchens, and office interiors.",
    keywords: ["Interior Design Surat", "Modular Kitchen Vadodara", "Modutech Solutions Gujarat", "Interior Designer Vesu", "Luxury Wardrobes Surat"]
  },
  about: {
    title: "About J.J. INTERIORS & MODUTECH | 10+ Years of Craftsmanship & Factory Precision",
    description: "Founded by Mukesh Suthar. Combining architectural elegance with zero-joint European factory modular manufacturing across Gujarat.",
    keywords: ["About JJ Interiors", "Mukesh Suthar Interior Designer", "Interior Manufacturing Surat"]
  },
  services: {
    title: "Our Services | Interior Design, Modular Kitchens & Turnkey Execution",
    description: "Complete interior services: residential interiors, 100% waterproof modular kitchens, custom wardrobes, living spaces, and commercial workspaces.",
    keywords: ["Modular Kitchens", "Wardrobe Design", "Commercial Interiors Gujarat"]
  },
  projects: {
    title: "Project Portfolio | Realized Architecture & Case Studies across Gujarat",
    description: "Browse completed residential penthouses, island kitchens, master suites, and corporate headquarters by J.J. INTERIORS & MODUTECH.",
    keywords: ["Interior Design Case Studies", "Surat Penthouse Design", "Modular Kitchen Projects"]
  },
  testimonials: {
    title: "Client Testimonials & Stories | J.J. INTERIORS & MODUTECH",
    description: "Read real client reviews and architectural transformation stories from homeowners and corporate clients across Gujarat.",
    keywords: ["JJ Interiors Reviews", "Client Testimonials Interior Designer Surat"]
  },
  contact: {
    title: "Contact J.J. INTERIORS & MODUTECH | Book a Design Consultation",
    description: "Visit our Vadodara studio or call +91 9898412998 to schedule a site visit and discuss your interior design project.",
    keywords: ["Contact Interior Designer Vadodara", "Book Site Visit Surat"]
  },
  blog: {
    title: "Interior Design Journal & Guides | J.J. INTERIORS & MODUTECH",
    description: "Insights on modular kitchen ergonomics, interior budgeting in Gujarat, and material selection guides.",
    keywords: ["Interior Design Blog", "Modular Kitchen Cost Guide Surat"]
  }
};

export const initialAnalytics: AnalyticsSummary = {
  pageViews: 1420,
  projectViews: {
    "prj-1": 480,
    "prj-2": 395,
    "prj-3": 210,
    "prj-4": 180,
    "prj-5": 115,
    "prj-6": 40
  },
  contactClicks: 84,
  whatsappClicks: 142,
  consultationRequests: 32,
  leadSources: {
    "Website Form": 18,
    "WhatsApp Direct": 8,
    "Instagram": 4,
    "Referral": 2
  }
};

