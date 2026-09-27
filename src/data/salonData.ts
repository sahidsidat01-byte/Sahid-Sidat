export interface Service {
  id: string;
  name: string;
  category: 'bridal' | 'hair' | 'skincare' | 'nails' | 'lash-brow';
  categoryLabel: string;
  price: number;
  deposit?: number;
  duration: string;
  durationMins: number;
  image: string;
  badge?: string;
  tags: string[];
  shortDesc: string;
  fullDesc: string;
  rating: number;
  reviewsCount: number;
  inclusions?: string[];
  itinerary?: { step: string; time: string; title: string; desc: string }[];
  dos?: string[];
  donts?: string[];
  atelierProducts?: { brand: string; product: string; icon: string }[];
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  bio: string;
  credentials: string;
  specialties: string[];
  featured?: boolean;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'bridal' | 'hair' | 'skincare' | 'salon';
  categoryLabel: string;
  image: string;
  artist: string;
  investment?: string;
  duration?: string;
  formulaNotes: string;
  productsUsed: string[];
  badge?: string;
  isCover?: boolean;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  service: string;
  content: string;
  avatar: string;
  verified: boolean;
}

export const STYLISTS: Stylist[] = [
  {
    id: 'jessa-vance',
    name: 'Jessa Vance',
    role: 'Founder & Master Aesthetician',
    experience: '14+ Years Experience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwZOVp3I9ad-ptidb6VS4ifRcljLYx-pl4w3ZEPj0rGRmGrQW8adg1Sbcbhjc6q10WnclH0BhHC4jxqRF0s1Ke0y1mJ0ziUhBQVMViuDjZMA934SDdJJhqC7JbyrZmnqXiAUkKTbo_Uedaq1mzP11bvRqgo0TIxEDN970y5HkufauCmfFyNZfJ-6iSrYO7UU8icamEBcVxUOztOHc7ssI5TH9YTuBg4CqLZ2ewYCsDGAR_oUC0cUQY',
    bio: 'Trained between Paris and London, Jessa founded the Mayfair sanctuary to blend high-fashion backstage artistry with clinical dermal reverence.',
    credentials: 'Paris Haute Couture Academy & British Aesthetic Master Board',
    specialties: ['Bridal Architecture', 'Micro-Airbrush HD Complexion', 'Couture Facial Sculpting'],
    featured: true,
  },
  {
    id: 'camille-laurent',
    name: 'Camille Laurent',
    role: 'Senior Couture Stylist',
    experience: '10+ Years Experience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp28K3Wrt1V9OkP-7TMJ27zRldZleE3CEYJ9AaWGlmsoUHMzVAlLFjPvsASuqSX-4UO7hRZlFWEl3GIgbY_9fcWDyR8pRGEk6FhTw9Y9HCF95oDsd4G_Utl3LQ1UjZ72ri3ew_x6-fu1wC1LaVhKBXn0si_inmuDCZszVF2B_1oAwj_PER21oza-sypZVPvX9s5ayqpLg9dZRZGQoEX9z3fRZUJwtY7vlFCEDcicY6CkRLob8y9L0h',
    bio: 'Renowned for red-carpet transformations and architectural veil setting, Camille brings effortless French grace to every bridal party.',
    credentials: 'L’Oréal Master Coloriste Paris & Vidal Sassoon London Honors',
    specialties: ['French Balayage', 'Bridal Updos & Veil Setting', 'Silk Infusion Smoothing'],
    featured: true,
  },
  {
    id: 'helene-rossi',
    name: 'Helene Rossi',
    role: 'Senior Colorist & Hair Director',
    experience: '11+ Years Experience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZSr8ie3Zwtt7rGQrWe_kUGZ7pcp3mPOr3ULhuM3D-N7rpyZYe-CU37udb8YjYHMSZ-Zw25EKq6xhzWmz4MnN4V7dU003KEgAwKXMZSjJ4oMpeEKXn9s4x-y1xcXkmIDeCRAoCLcN2UgjwXc5Hhz7SUNC5rynLYApvtcYXzkmjSDxDomKnIl-fTbGOouvikuIRA4oJdI2Ynmzp6etgljTL9GdfG1j-A7c50cRrFtnsaUMU3tULYVWt',
    bio: 'Specializing in sun-drenched multidimensional ribbons and silk gloss baths, Helene crafts fluid luxury tones that preserve ultimate fiber health.',
    credentials: 'Milan Color Mastery Institute',
    specialties: ['Champagne Melt Balayage', 'Japanese Silk Gloss Baths', 'Caviar Hair Treatments'],
    featured: false,
  },
  {
    id: 'dr-camille-thorne',
    name: 'Dr. Camille Thorne',
    role: 'Clinical Aesthetic Director',
    experience: '12+ Years Experience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCux_w1BlnLcU5FZ5synV-OpnJOywLfVRykwtv8F_TAqSR2BvDWlSrwiGjKR8SvKdHDN9r_cWtAhg5IqjVi8HcG15J_vZFP6kXWk6qQq08QYCk2Kh90Rh8SkY3JxSjET8gfxiVVtY03b8p7xrPQ0x_qQjgcYQ5hJk9ItuLhtoYQUxyws8Kobq7Gog5zX3fMeLZ7rS8uYQTyBmQCGaS9Gr5dt8P2d6Utl5liQl6iBKlFSI9dvAnE2fXW',
    bio: 'Dr. Thorne oversees our non-invasive clinical therapies, integrating micro-current toning and pure 24K gold cellular infusions.',
    credentials: 'MBBS Aesthetic Dermatology & Advanced Laser Cert.',
    specialties: ['24K Gold Cellular Lift', 'Hydra-Infusion Peeling', 'Lymphatic Cryo-Therapy'],
    featured: false,
  },
  {
    id: 'nurse-melissa-ward',
    name: 'Nurse Melissa Ward',
    role: 'Senior Lash & Brow Architect',
    experience: '8+ Years Experience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvdI-lFuTyU93VahAcJeMLVI7plwxdZ30n9thE6p0adJbNZHnqgUuAsAwMAjaBnU0cGeyuqgAc7yPRx_kslKM2FYBEYsECuqJC6qpL-xgoC9_-4fV6hlzqVyIqr2NK0j9rBPKFzD2v24O-Bdsu8dl7SEazzGr_zwrV9xfryCaLanhoQyK3evYNNFH1ME3vQYj-S8HoB-xWbEbpsWwLGFHaCyB4j6MnLWQp7cYjS66oB31AG0raA3pv',
    bio: 'Master of featherweight Russian volume fans and micro-pigment lip contours, providing subtle definition tailored to natural bone structure.',
    credentials: 'Certified Phibrows Master & Registered Aesthetic Practitioner',
    specialties: ['Russian Volume 4D-6D', 'Microblading & Ombré Shading', 'Lip Blush Contour'],
    featured: false,
  }
];

export const SERVICES: Service[] = [
  {
    id: 'royal-bridal-glamour-suite',
    name: 'Royal Bridal Glamour Suite',
    category: 'bridal',
    categoryLabel: 'Bridal & Occasion',
    price: 350,
    deposit: 100,
    duration: '3 hrs 15 min',
    durationMins: 195,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRFhWrVWkCAU1908COmCsLmScu6JdlRpgO6AOTTZfhUoEv5UpVm96Gzb8sT4ZWo9n4zfrMml4pbMDPcyiUNas00lUt0FqZYaKCETysOMH4rpIEYKGNbmYe72pAhGOB9AcLlGjWYmk2IUz-dJuBodCSzYxt0okiUlv-avu2UsptAzLmcl_0s8d0frGQlv542xFWoPdmoOR8wJilx3coqwE9FmIie7hKjD2kjCov2efRAMZRwMsGMG8x',
    badge: 'Couture Signature',
    tags: ['Airbrush HD', 'Trial Included', 'Veil Fitting', '24H Longevity'],
    shortDesc: 'Flawless airbrushed canvas, architectural lash contouring, and 16-hour jewel finish designed for royal vows.',
    fullDesc: 'Designed as the crown jewel of Jessa’s bridal sanctuary, the Royal Bridal Glamour Suite transcends conventional beauty styling. Every brushstroke is an orchestrated harmonization of bespoke color theory, ultra-fine microscopic airbrushing, and couture hair architecture tailored directly to your gown silhouette, ceremony lighting, and bridal aesthetic.',
    rating: 4.98,
    reviewsCount: 124,
    inclusions: [
      'Pre-wedding full trial session & aesthetic moodboard (90m)',
      'Waterproof 24-hour HD Micro-Airbrush base application',
      'Custom-measured 3D Silk Mink lashes & eye contouring',
      'Bridal Emergency Touch-Up Kit (full-size lipstick, blot papers & pins)',
      'Continuous Laurent-Perrier Champagne concierge service & VIP private suite'
    ],
    itinerary: [
      { step: '1', time: '15 MIN', title: 'Consultation & Dermal Mapping', desc: "Reviewing the day's lighting plan, veil attachment mechanics, and baseline skin hydration metrics." },
      { step: '2', time: '30 MIN', title: 'Cellular Deep Hydration & Sculpt', desc: 'Lymphatic cryo-sculpting, gold leaf eye peptide infusion, and moisture lock-in barrier primer.' },
      { step: '3', time: '75 MIN', title: 'Micro-Fine Airbrush Base & Eye Artistry', desc: 'Seamless weightless foundation misting, hand-clustered 3D mink lashes, and camera-calibrated eye design.' },
      { step: '4', time: '60 MIN', title: 'Couture Hair Architecture', desc: 'Thermal structural setting, volume padding integration, and placement of tiara, headpiece, or botanical pins.' },
      { step: '5', time: '15 MIN', title: 'Micro-Mist Seal & Crown Veil Lock', desc: 'Final waterproof setting mist application, veil weight adjustment, and handover of your emergency touch-up box.' }
    ],
    dos: [
      'Arrive with clarified, completely dry hair washed the previous evening.',
      'Wear a button-up silk shirt or robe to preserve hair and makeup upon change.',
      'Bring veil, jewelry, hair extensions, and tiara to the styling suite.',
      'Gentle lip scrub 24 hours prior to maintain optimal pigment absorption.'
    ],
    donts: [
      'No chemical peels, laser resurfacing, or microneedling within 14 days.',
      'Do not apply heavy silicones or overnight hair masks on the wedding eve.',
      'Avoid heavy retinoids and exfoliants 48 hours prior to appointment.',
      'No spray tanning on the face 72 hours prior (body tanning is welcome).'
    ],
    atelierProducts: [
      { brand: 'Charlotte Tilbury', product: 'Flawless Filter Complex', icon: 'spa' },
      { brand: 'Dior Backstage', product: 'Waterproof Glow Pigments', icon: 'diamond' },
      { brand: 'Chanel Beauté', product: 'Les Beiges Velvet Veil', icon: 'flare' },
      { brand: 'Kérastase Paris', product: 'Chroma Absolu Elixir', icon: 'brush' }
    ]
  },
  {
    id: 'signature-balayage-silk-gloss',
    name: 'Signature Balayage & Silk Gloss',
    category: 'hair',
    categoryLabel: 'Hair Couture & Color',
    price: 240,
    deposit: 70,
    duration: '2 hrs 30 min',
    durationMins: 150,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9FXGhaJ02vgRaLdSn9uOI36SHZRxanO0AMT7gTtEDsaRoWXog2jJkSV-MLaSNWZKRnDlOThGvLuNruwFiJtojX5cP4hdBhLZRnK1COPy2oDkp9D7KYepk4_jxO0qc2e5c0QDt6xotQvw1XrnaUkQKTKzR6BjF6r0exMr8_1y9CqX64oBuDqhD6XUfcaaxDZgiTuEle4FWpovgGw7ANwiDqsVLipso8OE7ISdRtKHae3eJbyDzfFdt',
    badge: 'Dimensional Hue',
    tags: ['French Balayage', 'Silk Gloss Bath', 'Signature Blow-out'],
    shortDesc: 'Custom hand-painted French balayage highlights, nourishing post-color silk gloss bath, and our signature royal blow-out.',
    fullDesc: 'Bespoke contour light placements personalized to facial architecture, completed with an Italian protein glaze, scalp reflexology rinse, and round-brush bouncy finish for radiant flowing density.',
    rating: 4.96,
    reviewsCount: 168,
    inclusions: [
      'Comprehensive tone analysis and strand health test',
      'Freehand light painting using bond-protecting olaplex-infused lightener',
      'Japanese silk gloss bath with organic botanical oils',
      'Scalp detox rinse and tension-release head massage',
      'Editorial signature blowout & soft thermal waves'
    ]
  },
  {
    id: '24k-gold-cellular-renewal',
    name: '24K Gold Cellular Renewal',
    category: 'skincare',
    categoryLabel: 'Aesthetic Skincare & Peels',
    price: 195,
    deposit: 60,
    duration: '1 hr 30 min',
    durationMins: 90,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuZ2184K2oZKJMeZwYQ03I0jdB_fKuWIBrYcLfQBs3c4rQVzs306y2Nmm4F_ek4SuKlWhrEXAjpqaEsCnHWRkmUYqmSuE3xQaF2cTT7m-W5BcUvzJKqrLgbS4mReO7QnOc9VwW45yl96CK11OgB1b5HjSmoa4jkfS3WHRuRvAGC1XxkMv-5bDct6iRYDxyBNG6u2nAdM4H2LgFGNxLqoyBbGuQa21WjtyCFiRqwRYwpslV8JGAjQPN',
    badge: 'Cellular Pure 24K',
    tags: ['24K Gold Mask', 'Micro-current', 'Lymphatic Drain'],
    shortDesc: 'Deep ultrasonic pore infusion, firming micro-current stimulation, and authentic 24K gold foil anti-aging compress.',
    fullDesc: 'An imperial dermal rejuvenation: double cleanse, enzymatic steam exfoliation, micro-current lifting, pure colloidal gold massage, and cold jade stone closure for instantaneous dewdrop clarity.',
    rating: 4.99,
    reviewsCount: 94,
    inclusions: [
      'Enzymatic bamboo steam purification',
      'Micro-current facial muscle re-education',
      'Direct application of authentic 24-karat gold leaf foil',
      'Cryogenic collagen globes lymphatic drainage',
      'Broad-spectrum antioxidant veil'
    ]
  },
  {
    id: 'keratin-velvet-smoothing',
    name: 'Keratin Velvet Smoothing',
    category: 'hair',
    categoryLabel: 'Hair Couture & Color',
    price: 220,
    deposit: 70,
    duration: '2 hrs',
    durationMins: 120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_VzYg-LZKP1eyLKDFRBADU-uT6tCtZi2qB00NW5piVWHZpMAaqLt2R0rRbiHCpkr66AwpxlMiWhyORQcgFEAUGY_9DJtzDYgbcDLD8r00iqSEaBHHdA4DpqvkcFT8jZVD2K-MH7128JN3mma0lsc0JRkTHAAB0v4oWfyj46VD6UoQwAtFZZVpnKDCXta5vWLHeoQdWEVVWyht2FHf7qcYnipIOdukDXfc42M41rA7Yp6Kv0eBuXKx',
    badge: 'Glass Hair Armor',
    tags: ['Zero Formaldehyde', '5-Month Shield', 'Anti-Humidity'],
    shortDesc: 'Formaldehyde-free organic botanical keratin infusion that completely eradicates frizz for up to 5 months of mirror gloss.',
    fullDesc: 'Deep conditioning keratin protein bonding sealed with titanium thermal plates at controlled temperatures to preserve fiber integrity while sealing cuticle flat for liquid glass hair.',
    rating: 4.94,
    reviewsCount: 112,
    inclusions: [
      'Clarifying chelating wash to prepare hair shaft',
      'Custom amino-acid botanical keratin saturation',
      'Nano-steam infusion hood activation',
      'Infrared flat iron seal for 5-month longevity',
      'Complimentary sulfate-free home care mini set'
    ]
  },
  {
    id: 'russian-volume-lash-extensions',
    name: 'Russian Volume Lash Extensions',
    category: 'lash-brow',
    categoryLabel: 'Lash & Brow Bar',
    price: 160,
    deposit: 50,
    duration: '1 hr 45 min',
    durationMins: 105,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvdI-lFuTyU93VahAcJeMLVI7plwxdZ30n9thE6p0adJbNZHnqgUuAsAwMAjaBnU0cGeyuqgAc7yPRx_kslKM2FYBEYsECuqJC6qpL-xgoC9_-4fV6hlzqVyIqr2NK0j9rBPKFzD2v24O-Bdsu8dl7SEazzGr_zwrV9xfryCaLanhoQyK3evYNNFH1ME3vQYj-S8HoB-xWbEbpsWwLGFHaCyB4j6MnLWQp7cYjS66oB31AG0raA3pv',
    badge: 'Weightless Cashmere',
    tags: ['4D–6D Fans', 'Cashmere Mink', 'Medical Adhesive'],
    shortDesc: 'Handcrafted multi-dimensional cashmere fan lashes engineered for featherweight softness, opulent density, and retention.',
    fullDesc: 'Handmade wide fans tailored to each natural lash strength using hyper-lightweight 0.05 cashmere fibers. Includes soothing collagen eye patches and lash bath.',
    rating: 4.97,
    reviewsCount: 88,
    inclusions: [
      'Gentle micellar lash bubble bath & primer',
      'Personalized eye-mapping tailored to eyelid contour',
      'Handcrafted 4D-6D cashmere synthetic mink fans',
      'Medical-grade hypoallergenic adhesive',
      'Collagen under-eye cooling treatment'
    ]
  },
  {
    id: 'luxe-gel-sculpt-caviar-spa',
    name: 'Luxe Gel Sculpt & Caviar Spa',
    category: 'nails',
    categoryLabel: 'Nails & Hand Spa',
    price: 95,
    deposit: 30,
    duration: '1 hr 15 min',
    durationMins: 75,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU7j4jHdF81H3PQ51NzPOt-Y66rlhbH0pVw94Gq-fI_opF40rFVnPyHr2JknBz06vVS6C8lRfxhnUfMoGf3EEHUu_M8BuneFtLqpR2X2KwW3fuJycEJJsG7rkybB_gS1GIDVtRy3B3FoXcIWBtO7qYOAGU8vqgvJeTgcXSRmUjRr8as72iqMk14HLkQIw4PL5iA0ioMsexkWxNVFUga1aFr0P_zt8Ux1axY0V-lqC-QFzf6tkoKeRG',
    badge: 'Russian Precision',
    tags: ['Hard Gel Sculpt', 'Caviar Hand Bath', 'Custom Gold Foil'],
    shortDesc: 'Warm dead-sea salt hand bath, botanical sugar exfoliation, hard-gel architectural sculpting, and personalized artisanal gold nail art.',
    fullDesc: 'Precision e-file Russian cuticle treatment, reinforced builder gel structure, moisturizing hot towel wrap, and a therapeutic hand massage with caviar extract serum.',
    rating: 4.95,
    reviewsCount: 140,
    inclusions: [
      'Dead-sea mineral immersion with fresh rose petals',
      'Diamond bit Russian dry manicure for clean cuticle lines',
      'Structural hard-gel nail bed shaping and apex reinforcement',
      'Hand-painted minimalist 24K gold foil or French chrome detail',
      'Warm rosehip oil massage and hot towel cocoon'
    ]
  },
  {
    id: 'hydra-infusion-botanical-peeling',
    name: 'Hydra-Infusion Botanical Peeling',
    category: 'skincare',
    categoryLabel: 'Aesthetic Skincare & Peels',
    price: 140,
    deposit: 40,
    duration: '1 hr',
    durationMins: 60,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwLMeOBh21a2Qy3sMwndWZVE6QePEyq6QaH7Bt6x4iJFckC7xEEkP6ZiZNKTmNiBL-nrstVIeR0EM8mCtB-wtNd8zAx0n7AJevM8-Fnu83O9cS5fujhUWLEaqiLHH6XQkX47ByLrgb2TmRudt4Ovgmg9W1BiRbQzBWLkzGSzQax7pU2aD7IoebDFlxrNVIWidXbqABcVBHZ6r243tQvyFv2ihYQj-dUAZjHOqttkSMDFpYCYzqx9bO',
    badge: 'Glass Dermal Dew',
    tags: ['Vortex Hydration', 'Lactic + Glycolic', 'Zero Downtime'],
    shortDesc: 'Non-invasive skin resurfacing with vortex suction, AHA fruit acid renewal, and deep hyaluronic acid peptide saturation.',
    fullDesc: 'Simultaneous physical vortex extraction and medical-grade serum infusion targeting congestion, fine lines, and uneven tone with instant radiant glass-skin glow.',
    rating: 4.96,
    reviewsCount: 78,
    inclusions: [
      'Double enzymatic botanical cleanse',
      'Gentle hydro-vortex suction of cellular debris',
      'Mild fruit lactic & glycolic peel blend (zero peeling flaking)',
      'Hyaluronic & niacinamide peptide pressure misting',
      'LED yellow collagen light therapy'
    ]
  },
  {
    id: 'scalp-detox-aromatherapy',
    name: 'Scalp Detox & Aromatherapy',
    category: 'hair',
    categoryLabel: 'Hair Couture & Color',
    price: 85,
    deposit: 30,
    duration: '45 min',
    durationMins: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCroj3dPeKPklc1kfmH6H8XTHCaTRm1QyjFeVLlyi61Jd0QJHwveISwlB_iu089SPD18QCCuvyiLLfxepmbzr1E5Q_qGmQCRQFF_ZNCjUnKWpYZOEySJEWjkd5Cv3Nf06_YSGz9B7Y3LBzvGBdQGQij_PPu0Wfac-4sjTmNTLYqLQCpmvVupEl56VPBprswcs0VyTIbLJpwyMyUUVQ0u2YNHUtiptM9SwFaorUuB9HMn1g6u6d14NrV',
    badge: 'Japanese Head Spa',
    tags: ['Moroccan Clay', 'Acupressure', 'Aromatherapy Bath'],
    shortDesc: 'Moroccan clay purifying mask, warm herbal waterfall bath, deep acupressure head massage, and botanical finish.',
    fullDesc: 'Transepidermal scalp purification utilizing rosewood and cedarwood organic elixirs, targeted pressure on cranial tension points, circular rain halo bath, and silky blow dry.',
    rating: 4.98,
    reviewsCount: 104,
    inclusions: [
      'Microscopic scalp dermal assessment',
      'Purifying Atlas Mountain Moroccan rhassoul clay mask',
      'Aromatherapeutic warm rain halo shower session',
      'Acupressure neck and cranial meridian massage',
      'Botanical protective blowout with argan gloss'
    ]
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'ethereal-autumn-bride',
    title: 'Ethereal Autumn Bride',
    category: 'bridal',
    categoryLabel: 'Bridal Haute Couture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0cJyX_osr2qJ14djxla5-zd1M1Sn9JTpgX0Bbp38ElVB6BliSwj6Vtahwg5TPDiyBjZ0PbgjS5SWu1eIR2YJPv00dS9ZtHZgWqdbX4qn40PHjRimu2R0Wd2vLuTKnpmduYfPJytQYNdZQh43Zm6MzLwDHLUNOMhFkQLKCqlZ40JpUiF_Ma1ZccY0Z_8DOELSwyZ8RFq6rK_-wCxfdiFSDApPwJYc4c-ZC21FgYwJMIypaTc9vcCIf',
    artist: 'Jessa Vance • Master Aesthetician',
    investment: '£420 • Bespoke Suite Booking',
    formulaNotes: 'Sculpted contour paired with micronized gold leaf eyelids, 3D individual silk lashes, and a hydrating dewy cushion finish designed specifically for royal evening galas.',
    productsUsed: ['Dior Backstage 0W', 'Charlotte Tilbury Pillow Talk Luxe', '24k Leaf Accent', 'Olaplex Silk Mist'],
    badge: 'Cover Feature',
    isCover: true
  },
  {
    id: 'champagne-blonde-balayage',
    title: 'Champagne Blonde Balayage',
    category: 'hair',
    categoryLabel: 'Hair Coloring & Styling',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLrJtrTWum6TN9wh8UDRsP9jWGa80sSei8_XPsCeN7I1_fMUA2NGc4pQCt9leU9LWcYPW0VFcnAaUmY8vnQk6BfwZDKorpagAOougtcg_819cEr1d5Mkax9M45RUfTWiLc4sFfy8L1IAt2RODWPbK5UC0HWFoDLAm3G4KNafTnclvOfSIKxBam_hlq62bsZYD-85td-519aJat_25yK9ZWaPNCr4SigJwtVSnNglC06-uFFfRgqlIK',
    artist: 'Helene Rossi • Senior Colorist',
    investment: '£285',
    formulaNotes: 'Multi-dimensional ribboning with cool vanilla highlights and high-gloss botanical glaze for natural sunlight shimmer without warmth degradation.',
    productsUsed: ['Redken Shades EQ 09V/09GI', 'Kérastase Blonde Absolu', 'Pure Moroccan Argan'],
    badge: 'Color Lab'
  },
  {
    id: 'glass-glow-facial-results',
    title: 'Glass Glow Facial Results',
    category: 'skincare',
    categoryLabel: 'Clinical Skin Glow',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCveSCS3SBfMU2Bz-h0ZPOuk4Mfm6rGZlzda6cd9tgQ8b3ATDWLExwup7hLTQJesc0sHPgf3SkUL3gPEpPIUK5t0DdogNHzINr0e4mPq5QJYbxA23_XfdNdy3MfyjIsYdKB_Qtm6C6EazQuKXQkYSKLux5PqJdy9hrZAFme0y4Plbb9AirGyFZo_kn3iwiYAjG6eydlFL91_ctrRHfj5jU4ymJK_orgoh2QzPytnWKlVQuSZqawR-nb',
    artist: 'Dr. Camille Thorne',
    duration: '75 Mins • £210',
    formulaNotes: 'Triple-molecular hyaluronic infusion, cryogenic dermaplaning, and colloidal gold micro-current lifting for flawless zero-filter dermal clarity.',
    productsUsed: ['Colloidal Gold Serum 5%', 'Medical Hyaluronic Acid 2.5%', 'Cryo Mineral Mist'],
    badge: 'Clinical Glow'
  },
  {
    id: 'midnight-velvet-glam',
    title: 'Midnight Velvet Glam',
    category: 'bridal',
    categoryLabel: 'Evening Gala',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1mZI6p4yKXG9_cGwedpG6TyiKq1Z5yHj0hmv55vu0Y1c2CjupFUQ0JBPDIB0B9wTwBYe0Smw38IxM1eVjt2usrQRZKFwru7UlAZG9Y_p-Ht0CdJf8UxmOswXEeBFf75HZkxyB2bMshMSPUQ8Vzkn5xCIlMoS19djy9whhoxCw_J2Os-p5_fJetUf4GPL_TtpyGRUU2h-6jld5Fd2w3q6cezLZLiH-GTSOx-IkzJZStjE4MWRDbvBf',
    artist: 'Jessa Vance',
    duration: '2.0 Hours • £240',
    formulaNotes: 'Dramatic burgundy lip statement blended with warm champagne cut-crease eye architecture, contoured under simulated candlelight.',
    productsUsed: ['Tom Ford Velvet Orchid Lip', 'Pat McGrath Mothership Palette', 'Armani Luminous Silk 8.5'],
    badge: 'Evening Gala'
  },
  {
    id: 'mayfair-vip-lounge',
    title: 'Mayfair VIP Lounge',
    category: 'salon',
    categoryLabel: 'Suite Architecture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTeURcFD_6gfBzrtkDuZPgWLZvsr9OWtD3D4bWy2j2KrP5L_lQcH7wu4HvSnhHE_8HSZWuOWOdulxgFZjNKBK39PzVyHeTDluJFdJzXeKxj7ihEiK0w4r9By5VvkJUfA8hRHscFfzQ_ox7Mn5LAcDCqjKiWRxjdJr9ATKYcXln1oDnTaGGC4DujfSuDHQwXcWSNM8hDMdwkksXfssZiwvc-2JRXv9Ake-6LbM3wolE4ixAhk7Z2cui',
    artist: 'Private Chandelier Suite',
    formulaNotes: 'Acoustically isolated private salon suite with gilded champagne mirrors, custom plum velvet styling stations, and medical autoclave sterilization bays.',
    productsUsed: ['Laurent-Perrier Bar', 'Neroli Aromatherapy', 'Bose Sound Sanctuary'],
    badge: 'The Sanctuary'
  },
  {
    id: 'brunette-silk-gloss-sculpt',
    title: 'Brunette Silk Gloss & Sculpt',
    category: 'hair',
    categoryLabel: 'Hair Coloring & Styling',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLrJtrTWum6TN9wh8UDRsP9jWGa80sSei8_XPsCeN7I1_fMUA2NGc4pQCt9leU9LWcYPW0VFcnAaUmY8vnQk6BfwZDKorpagAOougtcg_819cEr1d5Mkax9M45RUfTWiLc4sFfy8L1IAt2RODWPbK5UC0HWFoDLAm3G4KNafTnclvOfSIKxBam_hlq62bsZYD-85td-519aJat_25yK9ZWaPNCr4SigJwtVSnNglC06-uFFfRgqlIK',
    artist: 'Helene Rossi',
    investment: '£160',
    formulaNotes: 'Deep espresso depth with high-reflection caviar moisture wrap and sculpted long curtain fringe for effortless density.',
    productsUsed: ['Kérastase Chronologiste', 'Pure Moroccan Silk Glaze'],
    badge: 'Hair Therapy'
  },
  {
    id: 'gilded-empress-bridal-crown',
    title: 'Gilded Empress Bridal Crown',
    category: 'bridal',
    categoryLabel: 'Bridal Haute Couture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlR0CP5QwctsCUeqXr79yj2lN61kwGR70iGnCFghwQCAIT7Wy9WzNbyJjR8sS7utj_hDQdWwNAfl7ld8QjRVaGdsnILTtQb_V-rKTLiXR9TYDmMy1nJNwsTG9CV2HCIS-2ClbojBnT-bNSV2yqxxJgitn_4AuP94DkuNnvoAJLY71X8v6TUbxKaL-Sx05pfrmC5Zlo6KnSucbjaeTfDN5yhZdCzAyMKWmzEF7VVs1yTJ3d-VMNduoj',
    artist: 'Jessa Vance • Master Artist',
    investment: 'Royal Bridal Archive Suite',
    formulaNotes: 'Intricate low chignon with woven 24k gold leaf foil accents and a bespoke natural luminescent skin veil designed for camera flash.',
    productsUsed: ['Gold Foil Inlays', 'Bespoke Cathedral Veil', 'Hourglass Ambient Glow'],
    badge: 'Royal Bridal Archive'
  },
  {
    id: 'japanese-head-spa-basin',
    title: 'Japanese Head Spa & Rainfall Basin',
    category: 'salon',
    categoryLabel: 'Salon Interior & VIP Suites',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCroj3dPeKPklc1kfmH6H8XTHCaTRm1QyjFeVLlyi61Jd0QJHwveISwlB_iu089SPD18QCCuvyiLLfxepmbzr1E5Q_qGmQCRQFF_ZNCjUnKWpYZOEySJEWjkd5Cv3Nf06_YSGz9B7Y3LBzvGBdQGQij_PPu0Wfac-4sjTmNTLYqLQCpmvVupEl56VPBprswcs0VyTIbLJpwyMyUUVQ0u2YNHUtiptM9SwFaorUuB9HMn1g6u6d14NrV',
    artist: 'Holistic Scalp Therapy',
    duration: '90 Mins • £195',
    formulaNotes: 'Micro-mist oxygenation and warm circular water halo treatment inside private acoustic suites for profound deep relaxation.',
    productsUsed: ['Atlas Rhassoul Clay', 'Rosewood Scalp Oil', 'Epsom Rain Infusion'],
    badge: 'Scalp Sanctuary'
  },
  {
    id: 'hydra-plump-lip-contour',
    title: 'Hydra-Plump Lip & Contour',
    category: 'skincare',
    categoryLabel: 'Clinical Skin Glow',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuUh1eKFKUoLyYvPWdYtuSPAJXCX9csvTrWBSD4ZdVQlUxxc5aQWdmHygjrT9btWebIlAQa1cEHm09i_hLJZAKtJx1BJ1YIxHBFa8ceYiM6ZPhdNrDss-WlVz7zF3VU8_mWqCiSq4bEFN5B0cOkP3-HyiGEoIHpf2kvUQG8svEWwwfPfV0JPqqcyRVaRLTjOLJH_K_CQaq-Q3jItaOIF9rOJPGN08FNqxGRIUeWpmIngRJg5ox0vAI',
    artist: 'Nurse Melissa Ward',
    duration: '60 Mins • £180',
    formulaNotes: 'Non-invasive peptide plump infusion paired with delicate lip micro-scrub and mauve satin organic tint lock-in.',
    productsUsed: ['Volumizing Peptides', 'Organic Rose Damascena Wax', 'Hyaluronic Mist'],
    badge: 'Clinical Dermal'
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev-1',
    author: 'Lady Evelyn Ward',
    role: 'Bridal Suite Patron • Verified',
    rating: 5,
    date: 'October 2024',
    service: 'Royal Bridal Glamour Suite',
    content: 'Jessa and her elite team styled my wedding day. From the private champagne suite to the zero-crease airbrush makeup, I felt regal throughout our 14-hour celebration. Absolute perfection.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi7KRME3aib-yQZEEISF0ESj1j6TYdhpzXCE892_QlTI1BZW8FP8jvfHyNU1uPzhfQoh5ouNhWjxZaYLdhLI1XbRzNf5MlCW7jJMZ4isb5Bn_pMIdK_Y1B7yymzQ3-7SRkDef764Lc59bfMnPR8gowxO85rjPP0_4cdFMf59O529t03BcVxe8nWMa5LDMVG1z_syDVh_ckREEAL-qqHh-6tsRXQmYG2mq_sJrKfMD84fzBtnDIM1Ie',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Camilla Sterling',
    role: 'Creative Director • Verified',
    rating: 5,
    date: 'November 2024',
    service: '24K Gold Cellular Renewal',
    content: 'The Advanced 24K Gold Glow Facial cured my skin fatigue completely before London Fashion Week. The sterile standard is unmatched, and the botanical oils are heavenly.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ22JkxKiRH10tu0kHyres1rZAx5bRGfhxbxBNIhT6IXvSxKc0vr40xMSHd00R-dGwbKctoaX0-nknLwn5X8rZMhobqK9lz1QDO13-GueY84lsOWVQDnGv2H90oHWxIgHQxrYpXCrMQOZckFOVs_TcNQLjHfTuBxfR7oWHCX4VCvxDouhLxTOhzp7cYhU-74FwPDNNkBgB4HX5zGcNeE1CziQaVdvGl9RKzm_E-uIedVFYDovcGRoJ',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Natasha Rossi',
    role: 'VIP Club Member • Verified',
    rating: 5,
    date: 'December 2024',
    service: 'Signature Balayage & Silk Gloss',
    content: 'Their precision Balayage gave my brunette locks dimension without stripping health. You aren’t just getting a service; you are treated like royalty from the moment you step into the Mayfair suite.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAne8Oah8UfikbKIUR-1DWtnZuCFiXngwcWJYNpn9Q55gVh-NIaw0z6I9g6wBFZ6KARqlu73Qwxb6_BxX4qADvyM9oQFWmMBvv7FalqHSKrcBcpctt58oSHMTnX-2Op_Dk95FtxK0o_N56IZfpeL3IqjVP3YmdBhMgfEGsEC6bFnjIiYK9aP_oqKZ8EUBGikPDw8a_YR17bXIRlw3ECPGyS3Ruq0CG8A0UAhXaK8vOAiZ9rtcaXkxBs',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Lady Eleanor Harrington',
    role: 'Bridal Suite Patron • Verified',
    rating: 5,
    date: 'January 2025',
    service: 'Royal Bridal Glamour Suite',
    content: 'My bridal glam lasted past 3 AM through endless dancing and joyful tears without a single crease. Jessa and Camille treated me and my bridal party with extraordinary grace.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqY7v7rclTthpTniT3w4LF8ArSEap5iqhLRoO699A_gJk-b7QnHcZQfIjHn_0EesAJc4S2JwS6PlYb46jutHxGfkb2D7WQQ7GwGyyK_b0vPiWIRLF4UlvjYAOM39lpmNXEkdJ2UFyRmtJSgB7og0jLNGGnee5C9UpGmOagtql3jvepzhyLZmNnUM2qZFzrlosdnSwn_CSJeyVbJqYy1igCi39iM8XTje5bmuSjgk-cO-U_GLRswwGm',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Baroness Sophie von Berg',
    role: 'VIP Patron • Verified',
    rating: 5,
    date: 'February 2025',
    service: 'Japanese Head Spa & Rainfall Basin',
    content: 'The acoustic private suite and circular rainfall halo transformed a hectic work week into pure sanctuary. The cedarwood aroma and cranial massage are simply nonpareil.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi7KRME3aib-yQZEEISF0ESj1j6TYdhpzXCE892_QlTI1BZW8FP8jvfHyNU1uPzhfQoh5ouNhWjxZaYLdhLI1XbRzNf5MlCW7jJMZ4isb5Bn_pMIdK_Y1B7yymzQ3-7SRkDef764Lc59bfMnPR8gowxO85rjPP0_4cdFMf59O529t03BcVxe8nWMa5LDMVG1z_syDVh_ckREEAL-qqHh-6tsRXQmYG2mq_sJrKfMD84fzBtnDIM1Ie',
    verified: true
  }
];

export const SALON_INFO = {
  name: "Jessa's Beauty Parlor & Aesthetics",
  tagline: "Where Artistry Meets Pure Luxury",
  address: "482 Royal Crescent, Suite 100, Mayfair, London W1K 7AA",
  phone: "+44 (0) 20 7946 0882",
  whatsapp: "+44 7700 900321",
  email: "concierge@jessasbeauty.co.uk",
  hours: [
    { days: "Tuesday – Saturday", times: "9:00 AM – 7:30 PM" },
    { days: "Sunday", times: "10:00 AM – 5:00 PM" },
    { days: "Monday", times: "Closed (Available for Private VIP Buyouts)" }
  ],
  stats: [
    { label: "Happy Clients", value: "15k+" },
    { label: "Master Stylists", value: "12+" },
    { label: "Guest Rating", value: "4.98★" },
    { label: "Pure Botanical", value: "100%" }
  ],
  socialHandles: {
    instagram: "@jessasbeautyparlor",
    tiktok: "@jessasbeauty"
  }
};
