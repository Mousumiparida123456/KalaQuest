
import data from './placeholder-images.json';
export const placeholderImages = data.placeholderImages;

export type Artisan = {
  id: string;
  name: string;
  craft: string;
  bio: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  artisanId: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type MysteryQuiz = {
  id: string;
  title: string;
  description: string;
  story: string[];
  questions: QuizQuestion[];
};

export type Monument = {
  id: string;
  name: string;
  facts: string[];
};

export type StateInfo = {
  id: string;
  name: string;
  monuments: Monument[];
};

export type JobOpportunity = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  employmentType: 'Contract' | 'Full-time' | 'Part-time' | 'Freelance';
  postedDate: string; // e.g., "2024-07-25"
  contactEmail: string;
};

export const jobOpportunities: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'Mural Painter for Boutique Hotel',
    company: 'The Crimson Palace',
    location: 'Jaipur, Rajasthan',
    description: 'We are seeking a talented artist to design and paint a large-scale mural with traditional Rajasthani motifs for our hotel lobby. The artist should have experience in wall painting and a strong portfolio. This is a contract position with a competitive fee.',
    employmentType: 'Contract',
    postedDate: '2024-07-22',
    contactEmail: 'hr@crimsonpalace.com',
  },
  {
    id: 'job-2',
    title: 'Lead Potter for Ceramics Studio',
    company: 'Earth & Elm Goods',
    location: 'Bengaluru, Karnataka',
    description: 'Our growing studio is looking for an experienced potter to lead workshops and manage studio production. The ideal candidate will be skilled in various pottery techniques and have a passion for teaching. Full-time position with benefits.',
    employmentType: 'Full-time',
    postedDate: '2024-07-20',
    contactEmail: 'careers@earthandelm.com',
  },
  {
    id: 'job-3',
    title: 'Textile Designer (Block Printing)',
    company: 'IndiThreads Collective',
    location: 'Remote/Freelance',
    description: 'We are looking for freelance textile designers specializing in traditional Indian block printing. You will collaborate with our team to create new patterns for our upcoming clothing line. Must have a digital portfolio.',
    employmentType: 'Freelance',
    postedDate: '2024-07-18',
    contactEmail: 'collab@indithreads.co',
  },
  {
    id: 'job-4',
    title: 'Woodworking Apprentice',
    company: 'Sharma & Sons Fine Furniture',
    location: 'Saharanpur, Uttar Pradesh',
    description: 'Learn the art of fine sandalwood and sheesham wood carving from master craftsmen. This is a paid apprenticeship program for passionate individuals looking to build a career in woodworking. No prior experience required, but a strong desire to learn is essential.',
    employmentType: 'Part-time',
    postedDate: '2024-07-15',
    contactEmail: 'apprentice@sharmaandsons.in',
  },
  {
    id: 'job-5',
    title: 'Traditional Jewelry Designer',
    company: 'Kundan Gems',
    location: 'Hyderabad, Telangana',
    description: 'Seeking a creative jewelry designer with expertise in traditional Kundan and Polki work. The role involves designing new collections and custom pieces for high-end clients. Experience with CAD software is a plus.',
    employmentType: 'Full-time',
    postedDate: '2024-07-25',
    contactEmail: 'design@kundangems.com',
  },
  {
    id: 'job-6',
    title: 'Bronze Sculptor for Public Art Project',
    company: 'City of Chennai Arts Council',
    location: 'Chennai, Tamil Nadu',
    description: 'The City of Chennai is commissioning a series of bronze sculptures for a new public park. We invite sculptors skilled in the lost-wax casting technique to submit their proposals and portfolio. This is a large-scale commission with a significant budget.',
    employmentType: 'Contract',
    postedDate: '2024-07-24',
    contactEmail: 'publicart@chennai.gov.in',
  },
];

export const states: StateInfo[] = [
    {
        id: "state-up",
        name: "Uttar Pradesh",
        monuments: [
          {
            id: "mon-taj-mahal",
            name: "Taj Mahal",
            facts: [
              "It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.",
              "The Taj Mahal changes color depending on the time of day and whether there is a moon at night.",
              "The four minarets are tilted slightly outwards to protect the main tomb in case of an earthquake."
            ],
          },
          {
            id: "mon-fatehpur-sikri",
            name: "Fatehpur Sikri",
            facts: [
              "It was the capital of the Mughal Empire for only about 10 years.",
              "The city was abandoned due to a water shortage.",
              "It is home to one of the largest mosques in India, the Jama Masjid."
            ],
          }
        ]
    },
    {
        id: "state-dl",
        name: "Delhi",
        monuments: [
            {
                id: "mon-qutub-minar",
                name: "Qutub Minar",
                facts: [
                  "At 73 meters, it is the tallest brick minaret in the world.",
                  "The iron pillar in the courtyard has stood for over 1,600 years without rusting.",
                  "Its construction was started in 1193 by Qutab-ud-din Aibak but was completed by his successor, Iltutmish."
                ],
            },
            {
                id: "mon-humayuns-tomb",
                name: "Humayun's Tomb",
                facts: [
                  "It was the first garden-tomb on the Indian subcontinent.",
                  "It inspired several major architectural innovations, culminating in the construction of the Taj Mahal.",
                  "It was built by Humayun's first wife, Empress Bega Begum."
                ],
            }
        ]
    },
    {
        id: "state-rj",
        name: "Rajasthan",
        monuments: [
            {
                id: "mon-hawa-mahal",
                name: "Hawa Mahal",
                facts: [
                  "It has 953 windows, or 'jharokhas', which are intricately decorated.",
                  "It was built so that the royal women could observe everyday life and festivals in the street below without being seen.",
                  "It is built of red and pink sandstone."
                ],
            },
            {
                id: "mon-amer-fort",
                name: "Amer Fort",
                facts: [
                  "The fort is known for its artistic Hindu style elements.",
                  "It has a series of gates, and each has a unique name and architectural style.",
                  "The Sheesh Mahal (Mirror Palace) inside the fort is world-renowned for its intricate mirror work."
                ],
            }
        ]
    },
    {
      id: "state-mh",
      name: "Maharashtra",
      monuments: [{
        id: "mon-ajanta-ellora",
        name: "Ajanta & Ellora Caves",
        facts: [
          "The Ajanta Caves are 30 rock-cut Buddhist cave monuments.",
          "The Ellora Caves are one of the largest rock-cut monastery-temple cave complexes in the world, featuring Buddhist, Hindu and Jain monuments.",
          "The Kailasa Temple at Ellora is the largest single monolithic rock excavation in the world."
        ],
      }, {
        id: "mon-gateway-of-india",
        name: "Gateway of India",
        facts: [
          "It was built to commemorate the visit of King George V and Queen Mary to Mumbai.",
          "The last British troops to leave India passed through the Gateway.",
          "Its architecture is a blend of Indian and Saracenic styles."
        ],
      }]
    },
    {
      id: "state-tn",
      name: "Tamil Nadu",
      monuments: [{
        id: "mon-meenakshi-temple",
        name: "Meenakshi Temple",
        facts: [
          "The temple has 14 gopurams (gateway towers), each elaborately sculpted and painted.",
          "It is dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva.",
          "The temple complex is believed to house over 33,000 sculptures."
        ],
      }, {
        id: "mon-brihadeeswara-temple",
        name: "Brihadeeswara Temple",
        facts: [
          "It is one of the largest South Indian temples and an exemplary example of fully realized Dravidian architecture.",
          "The temple's vimana (tower) is 66 meters high, one of the tallest in the world.",
          "The Kumbam (the apex or the bulbous structure on the top) of the temple is carved out of a single rock and weighs around 80 tons."
        ],
      }]
    },
    {
      id: "state-ka",
      name: "Karnataka",
      monuments: [{
        id: "mon-hampi",
        name: "Hampi",
        facts: [
          "Hampi was the capital of the Vijayanagara Empire in the 14th century.",
          "The ruins are a UNESCO World Heritage Site, spread over 4,100 hectares.",
          "It is famous for its stone chariot in the Vittala Temple complex."
        ],
      }, {
        id: "mon-mysore-palace",
        name: "Mysore Palace",
        facts: [
          "It is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore.",
          "The palace is illuminated with over 97,000 light bulbs on Sundays and public holidays.",
          "It is a blend of Hindu, Mughal, Rajput, and Gothic styles of architecture."
        ],
      }]
    },
    {
      id: "state-kl",
      name: "Kerala",
      monuments: [{
        id: "mon-kerala-backwaters",
        name: "Kerala Backwaters",
        facts: [
          "They are a network of interconnected canals, rivers, lakes and inlets, a labyrinthine system of more than 900 km of waterways.",
          "The backwaters are home to unique species of aquatic life including crabs, frogs and mudskippers, water birds such as terns, kingfishers.",
          "Kettuvallams, or houseboats, are a popular way to experience the backwaters."
        ],
      }]
    },
    {
      id: "state-wb",
      name: "West Bengal",
      monuments: [{
        id: "mon-victoria-memorial",
        name: "Victoria Memorial",
        facts: [
          "It is a large marble building dedicated to the memory of Queen Victoria.",
          "It is now a museum and a popular tourist destination under the auspices of the Ministry of Culture.",
          "The Angel of Victory on top of the dome rotates with the wind."
        ],
      }]
    },
    {
      id: "state-gj",
      name: "Gujarat",
      monuments: [{
        id: "mon-rani-ki-vav",
        name: "Rani ki Vav",
        facts: [
          "It is an intricately constructed stepwell, a UNESCO World Heritage Site.",
          "It was built as a memorial to an 11th-century king by his widowed queen.",
          "It is designed as an inverted temple highlighting the sanctity of water."
        ],
      }]
    },
    {
      id: "state-or",
      name: "Odisha",
      monuments: [{
        id: "mon-konark-temple",
        name: "Konark Sun Temple",
        facts: [
          "The temple is designed in the shape of a gigantic chariot with 24 wheels, pulled by seven horses.",
          "The wheels of the temple are sundials which can be used to calculate time accurately.",
          "It is also known as the Black Pagoda."
        ],
      }]
    }
];


export const mysteryQuizzes: MysteryQuiz[] = [
  {
    id: "mystery-1",
    title: "The Secret of the Persian Glaze",
    description: "Jaipur's famous Blue Pottery is not made of clay. Its unique composition, derived from quartz, is a closely guarded secret. It is said the original formula, which gave it a brilliant turquoise hue, was a gift from a traveling Persian artisan. Can you piece together the clues to rediscover the original glaze?",
    story: [
        "Legend has it that the art of blue pottery came to Jaipur in the early 19th century under the reign of Maharaja Sawai Ram Singh II. He was so taken with the art form during a visit to Delhi that he sent local artisans to be trained.",
        "What makes Jaipur Blue Pottery truly unique is its composition. It's the only pottery in the world that does not use clay. Instead, a special dough is prepared by mixing quartz stone powder, powdered glass, Multani Mitti (Fuller's Earth), borax, gum, and water.",
        "Your quest is to rediscover the key ingredients that create the iconic brilliant blue glaze."
    ],
    questions: [
        {
            id: 1,
            question: "The first ingredient is not from the earth, but ground from a common stone that tells time. What is it?",
            options: ["Marble", "Granite", "Quartz", "Limestone"],
            correctAnswer: "Quartz"
        },
        {
            id: 2,
            question: "What green-tinged salt, found in the salt flats of Sambhar Lake, provides the color's base?",
            options: ["Copper Sulphate", "Sodium Chloride", "Iron Sulphate", "Zinc Sulphate"],
            correctAnswer: "Copper Sulphate"
        },
        {
            id: 3,
            question: "What sticky plant defense, sourced from the 'Gond' tree, binds the mixture together?",
            options: ["Resin", "Latex", "Sap", "Gum"],
            correctAnswer: "Gum"
        },
        {
            id: 4,
            question: "To achieve the true Persian turquoise, the firing must be controlled. What kind of heat did the old masters use?",
            options: ["Intense and quick", "Gentle and slow", "High and sustained", "Smoky and low"],
            correctAnswer: "Gentle and slow"
        }
    ]
  }
];

export const artisans: Artisan[] = [
  {
    id: "artisan-1",
    name: "Rajesh Kumar",
    craft: "Jaipur Blue Pottery",
    bio: "From a long line of potters, Rajesh Kumar masterfully combines traditional techniques with contemporary designs, keeping the centuries-old art of Jaipur Blue Pottery alive and vibrant.",
    image: placeholderImages.find(p => p.id === 'artisan-1')?.imageUrl || '',
  },
  {
    id: "artisan-2",
    name: "Fatima Begum",
    craft: "Kashmiri Pashmina Weaving",
    bio: "Fatima Begum has been weaving pashmina shawls for over 40 years, her hands telling the story of a rich cultural heritage passed down through generations of women in her family.",
    image: placeholderImages.find(p => p.id === 'artisan-2')?.imageUrl || '',
  },
  {
    id: "artisan-3",
    name: "Sanjay Jha",
    craft: "Madhubani Painting",
    bio: "Sanjay Jha's intricate Madhubani paintings are a celebration of nature and mythology. His work is characterized by its vibrant colors and detailed patterns, a hallmark of this ancient Bihari art form.",
    image: placeholderImages.find(p => p.id === 'artisan-3')?.imageUrl || '',
  },
  {
    id: "artisan-4",
    name: "Prakash Sharma",
    craft: "Sandalwood Carving",
    bio: "A master carver from Rajasthan, Prakash Sharma transforms blocks of sandalwood into exquisite sculptures and artifacts, each piece a testament to his precision and artistic vision.",
    image: placeholderImages.find(p => p.id === 'artisan-4')?.imageUrl || '',
  },
  {
    id: 'artisan-5',
    name: 'Priya Das',
    craft: 'Terracotta Pottery',
    bio: 'Priya Das brings a rustic charm to modern homes with her terracotta creations, inspired by the ancient pottery traditions of Bengal. Each piece is hand-shaped and sun-dried.',
    image: placeholderImages.find(p => p.id === 'artisan-5')?.imageUrl || '',
  },
  {
    id: 'artisan-6',
    name: 'Rohan Joshi',
    craft: 'Leatherwork (Mojari Shoes)',
    bio: 'Rohan Joshi is a master craftsman of Mojari, the traditional embroidered footwear of Rajasthan. His family has been perfecting this craft for over a century, blending comfort and regal style.',
    image: placeholderImages.find(p => p.id === 'artisan-6')?.imageUrl || '',
  },
  {
    id: 'artisan-7',
    name: 'Meera Patel',
    craft: 'Bandhani Tie-Dye',
    bio: 'From the Kutch region of Gujarat, Meera Patel creates mesmerizing patterns through the meticulous art of Bandhani. Each dot is tied by hand before dyeing, resulting in vibrant, unique textiles.',
    image: placeholderImages.find(p => p.id === 'artisan-7')?.imageUrl || '',
  },
  {
    id: 'artisan-8',
    name: 'Arjun Singh',
    craft: 'Metal Embossing (Tarkashi)',
    bio: 'Arjun Singh practices the delicate art of Tarkashi, inlaying fine brass wires into wood. His work adorns decorative boxes and furniture with intricate geometric and floral patterns.',
    image: "https://picsum.photos/seed/artisan8/400/400",
  },
  {
    id: 'artisan-9',
    name: 'Sunita Devi',
    craft: 'Appliqué (Pipli)',
    bio: 'Sunita Devi is a celebrated artist from Pipli, Odisha, known for her vibrant appliqué work. She stitches together pieces of colored cloth to create vivid depictions of gods, animals, and nature.',
    image: placeholderImages.find(p => p.id === 'artisan-9')?.imageUrl || '',
  },
  {
    id: 'artisan-10',
    name: 'Vikram Reddy',
    craft: 'Kalamkari Painting',
    bio: 'Using a traditional pen made from bamboo, Vikram Reddy free-hands mythological scenes onto fabric with natural dyes. His Kalamkari art from Andhra Pradesh is a testament to storytelling through visuals.',
    image: placeholderImages.find(p => p.id === 'artisan-10')?.imageUrl || '',
  },
  {
    id: 'artisan-11',
    name: 'Ishita Sharma',
    craft: 'Zardozi Embroidery',
    bio: 'Ishita Sharma is an expert in Zardozi, a lavish embroidery technique using gold and silver threads. Her work, often seen on luxurious fabrics, revives the grandeur of the Mughal era.',
    image: placeholderImages.find(p => p.id === 'artisan-11')?.imageUrl || '',
  },
  {
    id: 'artisan-12',
    name: 'Anand Verma',
    craft: 'Bidriware (Metal Inlay)',
    bio: 'From Bidar, Karnataka, Anand Verma creates stunning Bidriware by inlaying pure silver onto a blackened zinc and copper alloy. This 14th-century Persian art form is known for its striking contrast.',
    image: placeholderImages.find(p => p.id === 'artisan-12')?.imageUrl || '',
  },
  {
    id: 'artisan-13',
    name: 'Kavita Nair',
    craft: 'Coir Weaving',
    bio: "Kavita Nair transforms coconut fibers into beautiful and durable coir products, from floor mats to decorative items. Her work represents Kerala's sustainable and eco-friendly craft traditions.",
    image: placeholderImages.find(p => p.id === 'artisan-13')?.imageUrl || '',
  },
  {
    id: 'artisan-14',
    name: 'Mohan Lal',
    craft: 'Lacquerware',
    bio: 'Mohan Lal is a skilled artisan from Channapatna, the "toy town" of Karnataka. He uses a unique technique of applying colored lacquer to wood, creating smooth, vibrant, and safe wooden toys.',
    image: placeholderImages.find(p => p.id === 'artisan-14')?.imageUrl || '',
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Azure Floral Vase",
    description: "A beautiful Jaipur Blue Pottery vase, hand-painted with delicate floral motifs. Made without the use of clay, it's a unique decorative piece.",
    price: 850.00,
    image: placeholderImages.find(p => p.id === 'product-1')?.imageUrl || '',
    artisanId: "artisan-1",
  },
  {
    id: "prod-2",
    name: "Handwoven Pashmina Shawl",
    description: "An incredibly soft and warm pashmina shawl from Kashmir, featuring traditional 'sozni' embroidery. A timeless piece of luxury.",
    price: 4500.00,
    image: placeholderImages.find(p => p.id === 'product-2')?.imageUrl || '',
    artisanId: "artisan-2",
  },
  {
    id: "prod-3",
    name: "The Fish of Life",
    description: "A vibrant Madhubani painting depicting a pair of fish, symbolizing fertility and prosperity. Painted with natural dyes on handmade paper.",
    price: 1500.00,
    image: placeholderImages.find(p => p.id === 'product-3')?.imageUrl || '',
    artisanId: "artisan-3",
  },
  {
    id: "prod-4",
    name: "Carved Elephant Figure",
    description: "An intricately carved sandalwood elephant, a symbol of wisdom and strength. The detailed 'jali' work showcases incredible craftsmanship.",
    price: 2800.00,
    image: placeholderImages.find(p => p.id === 'product-4')?.imageUrl || '',
    artisanId: "artisan-4",
  },
  {
    id: "prod-5",
    name: "Cerulean Blue Mug",
    description: "A stunning mug crafted in the Jaipur Blue Pottery style, perfect for your morning coffee or as a piece of art.",
    price: 450.00,
    image: placeholderImages.find(p => p.id === 'product-5')?.imageUrl || '',
    artisanId: "artisan-1",
  },
  {
    id: "prod-6",
    name: "Crimson Silk Scarf",
    description: "A lightweight silk scarf, handwoven by Kashmiri artisans. Its deep crimson color is derived from natural plant-based dyes.",
    price: 1200.00,
    image: "https://picsum.photos/seed/product6/400/400",
    artisanId: "artisan-2",
  },
  {
    id: "prod-7",
    name: "Peacock's Dance Painting",
    description: "A mesmerizing Madhubani painting showcasing the magnificent peacock, a symbol of grace and beauty in Indian culture.",
    price: 1800.00,
    image: placeholderImages.find(p => p.id === 'product-7')?.imageUrl || '',
    artisanId: "artisan-3",
  },
  {
    id: "prod-8",
    name: "Sandalwood Jewelry Box",
    description: "A fragrant and beautifully carved box to store your precious jewelry, featuring traditional Rajasthani floral patterns.",
    price: 3200.00,
    image: placeholderImages.find(p => p.id === 'product-8')?.imageUrl || '',
    artisanId: "artisan-4",
  },
  {
    id: "prod-9",
    name: "Terracotta Dinner Set",
    description: "A set of four hand-shaped terracotta bowls, perfect for serving traditional meals and adding an earthy touch to your dining table.",
    price: 950.00,
    image: "https://picsum.photos/seed/product9/400/400",
    artisanId: "artisan-5",
  },
  {
    id: "prod-10",
    name: "Royal Blue Mojari Shoes",
    description: "Handcrafted leather Mojari shoes, embroidered with golden thread. A perfect blend of comfort and traditional style for festive occasions.",
    price: 1100.00,
    image: "https://picsum.photos/seed/product10/400/400",
    artisanId: "artisan-6",
  },
  {
    id: "prod-11",
    name: "Crimson Bandhani Scarf",
    description: "A vibrant silk scarf created using the Bandhani tie-dye technique from Gujarat. Each dot is a testament to the artisan's skill.",
    price: 900.00,
    image: "https://picsum.photos/seed/product11/400/400",
    artisanId: "artisan-7",
  },
  {
    id: "prod-12",
    name: "Tarkashi Keepsake Box",
    description: "An exquisite wooden box decorated with Tarkashi, the art of inlaying fine brass wire. Ideal for storing treasured keepsakes.",
    price: 3500.00,
    image: "https://picsum.photos/seed/product12/400/400",
    artisanId: "artisan-8",
  },
  {
    id: "prod-13",
    name: "Sun Temple Appliqué Wall Art",
    description: "A stunning piece of Pipli appliqué work from Odisha, depicting the chariot wheel of the Konark Sun Temple in vibrant colors.",
    price: 1600.00,
    image: "https://picsum.photos/seed/product13/400/400",
    artisanId: "artisan-9",
  },
  {
    id: "prod-14",
    name: "Tree of Life Kalamkari Tapestry",
    description: "A hand-painted Kalamkari tapestry showing the 'Tree of Life', a symbol of creation and vitality. Made with natural dyes on cotton fabric.",
    price: 2500.00,
    image: "https://picsum.photos/seed/product14/400/400",
    artisanId: "artisan-10",
  },
  {
    id: "prod-15",
    name: "Regal Zardozi Evening Clutch",
    description: "An elegant evening clutch purse, lavishly embroidered with gold Zardozi work on velvet. A perfect accessory for a royal look.",
    price: 4800.00,
    image: placeholderImages.find(p => p.id === 'product-15')?.imageUrl || '',
    artisanId: "artisan-11",
  },
  {
    id: "prod-16",
    name: "Silver Inlaid Bidriware Vase",
    description: "A classic Bidriware vase, featuring intricate floral patterns inlaid with pure silver on a dark alloy base. A masterpiece from Bidar.",
    price: 3200.00,
    image: placeholderImages.find(p => p.id === 'product-16')?.imageUrl || '',
    artisanId: "artisan-12",
  },
  {
    id: "prod-17",
    name: "'Welcome' Coir Doormat",
    description: "A durable and eco-friendly doormat woven from natural coir fibers from Kerala, featuring a simple and elegant welcome design.",
    price: 350.00,
    image: placeholderImages.find(p => p.id === 'product-17')?.imageUrl || '',
    artisanId: "artisan-13",
  },
  {
    id: "prod-18",
    name: "Set of 5 Channapatna Spinning Tops",
    description: "A colorful set of traditional wooden spinning tops from Channapatna, handcrafted with safe, non-toxic lacquer. Fun for all ages.",
    price: 550.00,
    image: placeholderImages.find(p => p.id === 'product-18')?.imageUrl || '',
    artisanId: "artisan-14",
  },
];
