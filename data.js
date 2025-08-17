// Product data
const products = [
  {
    id: "1",
    name: "Gond Painting - Tree of Life",
    description: "Handcrafted Gond painting from Madhya Pradesh depicting the sacred tree of life. Each painting tells a story of tribal mythology and showcases the rich cultural heritage of the Gond tribe.",
    price: 5800,
    originalPrice: 6500,
    image: "WhatsApp Image 2025-04-07 at 02.47.07_1f17d735.jpg",
    category: "Wall Art",
    origin: "Madhya Pradesh, India",
    isRentable: true,
    rentalPrices: {
      daily: 290,
      weekly: 1740,
      monthly: 5800
    },
    featured: true
  },
  {
    id: "2",
    name: "Dokra Metal Sculpture",
    description: "Traditional Dokra metal craft sculpture using lost-wax casting technique, passed down through generations. This piece represents a tribal deity and is crafted by artisans from Bastar region.",
    price: 3200,
    image: "IMG-20250407-WA0011.jpg",
    category: "Sculpture",
    origin: "Bastar, Chhattisgarh",
    isRentable: true,
    rentalPrices: {
      daily: 160,
      weekly: 960,
      monthly: 3200
    },
    featured: true
  },
  {
    id: "3",
    name: "Warli Painted Earthen Pot",
    description: "Traditional earthen pot adorned with intricate Warli tribal art from Maharashtra. This functional art piece can be used for storage or as a decorative element in your home.",
    price: 1800,
    image: "IMG-20250407-WA0010.jpg",
    category: "Home Decor",
    origin: "Maharashtra, India",
    isRentable: true,
    rentalPrices: {
      daily: 90,
      weekly: 540,
      monthly: 1800
    }
  },
  {
    id: "4",
    name: "Banjara Embroidered Wall Hanging",
    description: "Vibrant wall hanging featuring traditional Banjara embroidery, mirror work, and colorful tassels. Each piece tells a story of nomadic heritage and skilled craftsmanship.",
    price: 4200,
    originalPrice: 4800,
    image: "IMG-20250407-WA0009.jpg",
    category: "Textiles",
    origin: "Rajasthan, India",
    isRentable: true,
    rentalPrices: {
      daily: 210,
      weekly: 1260,
      monthly: 4200
    },
    featured: true
  },
  {
    id: "5",
    name: "Tribal Wooden Mask",
    description: "Hand-carved wooden mask representing tribal folklore and spiritual traditions. These masks are used in ritual performances and ceremonies.",
    price: 2400,
    image: "IMG-20250407-WA0007.jpg",
    category: "Wall Art",
    origin: "Arunachal Pradesh, India",
    isRentable: true,
    rentalPrices: {
      daily: 120,
      weekly: 720,
      monthly: 2400
    }
  },
  {
    id: "6",
    name: "Bamboo Crafted Table Lamp",
    description: "Eco-friendly table lamp crafted from bamboo by tribal artisans. The intricate design creates beautiful light patterns and brings a warm, earthy atmosphere to any space.",
    price: 1600,
    image: "IMG-20250407-WA0008.jpg",
    category: "Lighting",
    origin: "Northeast India",
    isRentable: true,
    rentalPrices: {
      daily: 80,
      weekly: 480,
      monthly: 1600
    }
  },
  {
    id: "7",
    name: "Dhokra Brass Bell",
    description: "Traditional brass bell made using the ancient Dhokra metal casting technique. These bells are not only decorative but are believed to ward off negative energies.",
    price: 1200,
    image: "IMG-20250407-WA0006.jpg",
    category: "Home Decor",
    origin: "West Bengal, India",
    isRentable: true,
    rentalPrices: {
      daily: 60,
      weekly: 360,
      monthly: 1200
    }
  },
  {
    id: "8",
    name: "Tribal Pattachitra Painting",
    description: "Intricate scroll painting depicting tribal mythology and folklore. This ancient art form uses natural colors and traditional techniques passed down through generations.",
    price: 3600,
    image: "IMG-20250407-WA0012.jpg",
    category: "Wall Art",
    origin: "Odisha, India",
    isRentable: true,
    rentalPrices: {
      daily: 180,
      weekly: 1080,
      monthly: 3600
    },
    featured: true
  },
  {
    id: "9",
    name: "Madhubani Painted Ceramic Plates (Set of 2)",
    description: "Hand-painted ceramic plates featuring traditional Madhubani art. These plates are perfect for serving or as decorative wall pieces.",
    price: 2200,
    image: "IMG-20250407-WA0014.jpg",
    category: "Tableware",
    origin: "Bihar, India",
    isRentable: true,
    rentalPrices: {
      daily: 110,
      weekly: 660,
      monthly: 2200
    }
  },
  {
    id: "10",
    name: "Kutch Embroidered Cushion Cover",
    description: "Vibrant cushion cover featuring traditional Kutch embroidery with mirror work and intricate patterns. Each piece is handcrafted by skilled women artisans.",
    price: 1400,
    image: "WhatsApp Image 2025-04-07 at 02.47.08_c414f5b9.jpg",
    category: "Home Textiles",
    origin: "Gujarat, India",
    isRentable: true,
    rentalPrices: {
      daily: 70,
      weekly: 420,
      monthly: 1400
    }
  },
  {
    id: "11",
    name: "Tribal Bell Metal Gong",
    description: "Traditional bell metal gong used in tribal ceremonies and rituals. Each piece produces a distinctive sound and carries cultural significance.",
    price: 5200,
    image: "IMG-20250407-WA0013.jpg",
    category: "Musical Instruments",
    origin: "Assam, India",
    isRentable: true,
    rentalPrices: {
      daily: 260,
      weekly: 1560,
      monthly: 5200
    }
  },
  {
    id: "12",
    name: "Kalamkari Hand-painted Cotton Tapestry",
    description: "Hand-painted cotton tapestry using the traditional Kalamkari technique with natural dyes. This piece depicts tribal life and cultural motifs.",
    price: 4800,
    image: "WhatsApp Image 2025-04-07 at 02.47.08_9d9d4988.jpg",
    category: "Textiles",
    origin: "Andhra Pradesh, India",
    isRentable: true,
    rentalPrices: {
      daily: 240,
      weekly: 1440,
      monthly: 4800
    }
  }
];

// Categories
const categories = [
  { id: "wall-art", name: "Wall Art" },
  { id: "sculpture", name: "Sculpture" },
  { id: "home-decor", name: "Home Decor" },
  { id: "textiles", name: "Textiles" },
  { id: "lighting", name: "Lighting" },
  { id: "tableware", name: "Tableware" },
  { id: "musical-instruments", name: "Musical Instruments" },
];

// Testimonials
const testimonials = [
  {
    id: "1",
    name: "Anjali Sharma",
    text: "I rented a Gond painting for my office and received so many compliments! The rental process was smooth and the artwork added such character to my space.",
    rating: 5,
    location: "Bangalore"
  },
  {
    id: "2",
    name: "Rahul Mehta",
    text: "The Dokra sculpture I purchased is absolutely stunning. The craftsmanship is impeccable and it's become the centerpiece of my living room.",
    rating: 5,
    location: "Mumbai"
  },
  {
    id: "3",
    name: "Priya Nair",
    text: "I've been collecting tribal arts for years, and the pieces from Tribal Treasure are among the most authentic I've found. Their rental option allowed me to try different styles before making a purchase.",
    rating: 4,
    location: "Delhi"
  }
]; 