
let all_product = [
  // WOMEN'S PRODUCTS
  {
    id: 1,
    name: "Women Black Solid Faux Fur Coat",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429773/product_1_fdgmtv.png",
    new_price: 50.0,
    old_price: 80.5,
    description: "A blend of acrylic and polyester fibres, faux fur is given the appearance and warmth of animal fur. It is easy to clean and care for.",
    subcategory: "Coat",
    tags: "Trendy, Casual, Elegant"
  },
  {
    id: 2,
    name: "Women Square Neck Regular Top",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429774/product_2_bjnxk0.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Pink regular top, Ribbed, Square neck, short, regular sleeves, Detail, Woven Closure",
    subcategory: "Blouse",
    tags: "Trendy, Summer, Feminine"
  },
  {
    id: 3,
    name: "Colourblocked Crop Top",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429775/product_3_ejk808.png",
    new_price: 60.0,
    old_price: 100.5,
    description: "Nude-coloured crop fitted top, sleeveless Sheen detail Knitted cotton",
    subcategory: "Top",
    tags: "Classic, Casual, Versatile"
  },
  {
    id: 4,
    name: "Women Bell Sleeve Wrap Top",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429776/product_4_gzhmtd.png",
    new_price: 100.0,
    old_price: 150.0,
    description: "V-neck, three-quarter, bell sleevee, Waist tie-ups detail Knitted crepe",
    subcategory: "Blouse",
    tags: "Bohemian, Maxi, Solid"
  },
  {
    id: 5,
    name: "Black & Pink Floral Print Bishop Sleeves Crop Top",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429818/product_5_xwdcoe.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Black and pink crop regular top, Floral print V-neck, long, bishop sleeves, Woven georgette, Concealed zip closure.",
    subcategory: "Blouse",
    tags: "Floral, Casual, Layering"
  },
  {
    id: 6,
    name: "Women Solid Scarves",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429819/product_6_cq8vkr.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Beige solid scarves, has solid border",
    subcategory: "Scraf",
    tags: "Silk, Luxury, Professional"
  },
  {
    id: 7,
    name: "Cotton Turtle Neck Pullover Sweaters",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429822/product_7_raex3i.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "White ribbed pullover ,has a turtle neck, long sleeves, straight hem.",
    subcategory: "Cardigans",
    tags: "Cozy, Knit, Comfortable"
  },
  {
    id: 8,
    name: "Floral Print Puff Sleeve Georgette Crop Top",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429823/product_8_ualsea.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Black regular top, Floral print, Square neck, short, puff sleeves, Woven georgette.",
    subcategory: "Blouse",
    tags: "Trendy, Casual, Tailored"
  },
  {
    id: 9,
    name: "Romantic Floral Print Chiffon Wrap Crop Top",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429826/product_9_myoovd.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Red crop wrap top, Floral print, V-neck, long, cuffed sleeves, Woven chiffon.",
    subcategory: "Tops",
    tags: "Lace, Romantic, Feminine"
  },
  {
    id: 10,
    name: "Women Maroon Solid Hooded Sweatshirt",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429827/product_10_paypsy.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Maroon solid sweatshirt, has a hood, long sleeves, straight hem.",
    subcategory: "Hoodie",
    tags: "Casual, fashionable, Comfortable"
  },
  {
    id: 11,
    name: "Midnight Muse Cami Top",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429828/product_11_ckrxvs.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Slip into sultry elegance with this sleek cami, perfect for moonlit nights and starry adventures. Its your ticket to effortless allure.",
    subcategory: "Blouses",
    tags: "Trendy, Casual, Fashionable"
  },
  {
    id: 12,
    name: "Women Blue Solid Top",
    category: "women",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429829/product_12_ygaps5.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Blue solid knitted regular top, has a high neck, Full sleeves.",
    subcategory: "Blouse",
    tags: "Modern, Solid, Versatile"
  },

  // MEN'S PRODUCTS
  {
    id: 13,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429831/product_13_zjxuf9.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Green solid bomber jacket with hooded design, 2 pockets, and zip closure. Features long sleeves and straight hemline without lining.",
    subcategory: "Bomber Jackets",
    tags: "Bomber, Casual, Streetwear"
  },
  {
    id: 14,
    name: "Men Lightweight Puffer Jacket with Patchwork",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429832/product_15_gggjhu.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "White graphic printed lightweight puffer jacket with patchwork, has a mandarin collar, 2 pockets ,has a zip closure, long sleeves, straight hemline, polyester lining",
    subcategory: "Jacket",
    tags: "Warm, Classic, Casual"
  },
  {
    id: 15,
    name: "Men Camouflage Polyester Lightweight Outdoor Sporty Jacket",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429832/product_15_gggjhu.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Black camouflage printed lightweight sporty jacket, has a mock collar, 2 pockets ,has a zip closure, long sleeves, straight hemline, polyester lining engineered with rapid-dry.",
    subcategory: "jacket",
    tags: "Camouflage , Casual, Weekend"
  },
  {
    id: 16,
    name: "Men's Athletic Track Jacket",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429834/product_16_thfqhs.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Performance track jacket with moisture-wicking fabric and full zip closure. Ideal for workouts and sports activities.",
    subcategory: "Athletic Wear",
    tags: "Athletic, Performance, Sports"
  },
  {
    id: 17,
    name: "Men Denim Jacket",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429836/product_17_havxnz.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Blue solid denim jacket with zip detail, has a spread collar, 4 pockets ,has a button closure, long sleeves, straight hemline, without lining.",
    subcategory: "Denim",
    tags: "Casual, Trendy, Denim"
  },
  {
    id: 18,
    name: "Men Lightweight Sporty Jacket",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429836/product_17_havxnz.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Grey solid lightweight sporty jacket, has a mock collar, 2 side pockets, full zip closure, long sleeves and straight hemline.",
    subcategory: "Sporty Jackets",
    tags: "Sports, Workout, Edgy"
  },
  {
    id: 19,
    name: "Men's Plaid Flannel Shirt",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429838/product_19_mesj8a.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Warm plaid flannel shirt with button-down design and chest pockets. Perfect for autumn and winter wear.",
    subcategory: "Flannel Shirts",
    tags: "Plaid, Flannel, Warm"
  },
  {
    id: 20,
    name: "Men's Hooded Sweatshirt",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429838/product_20_omyqeo.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Comfortable hooded sweatshirt with kangaroo pocket and ribbed cuffs. Great for casual lounging and outdoor activities.",
    subcategory: "Hoodies",
    tags: "Hoodie, Comfortable, Casual"
  },
  {
    id: 21,
    name: "Men's Striped Henley Shirt",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429841/product_21_mrdgbm.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Classic striped henley shirt with button placket and long sleeves. Versatile piece for layering or standalone wear.",
    subcategory: "Henley Shirts",
    tags: "Henley, Striped, Versatile"
  },
  {
    id: 22,
    name: "Men's Quilted Vest",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429841/product_22_kfpb0y.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Insulated quilted vest with zip closure and side pockets. Perfect for layering during transitional seasons.",
    subcategory: "Vests",
    tags: "Quilted, Layering, Insulated"
  },
  {
    id: 23,
    name: "Men Olive Green Solid Denim Shirt",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429842/product_23_k6dowc.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Olive solid denim jacket with, has a spread collar, 2 pockets, has a button closure, long sleeves, straight hemline, without lining.",
    subcategory: "Sweaters",
    tags: "Denim, Solid, Classic"
  },
  {
    id: 24,
    name: "Men Leather Lightweight Biker Jacket",
    category: "men",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429844/product_24_zgscft.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Black solid lightweight biker jacket with zip detail, has a lapel collar, 2 pockets ,has a zip closure, long sleeves, curved hemline, polyester lining engineered with anti odour",
    subcategory: "Blazers",
    tags: "Leather, Smart-Casual, Sophisticated"
  },

  // KIDS' PRODUCTS
  {
    id: 25,
    name: "Boys Logo Printed Hooded Sweatshirt",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429845/product_25_iwfzp4.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Blue color and logo printed sweatshirt has a hood, 2 insert pockets, long sleeves,zip closure, ribbed hem",
    subcategory: "Hoodies",
    tags: "Colorblock, Active, Comfortable"
  },
  {
    id: 26,
    name: "Kids Print T-Shirt",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429846/product_26_vcn34f.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Fun print t-shirt made from soft cotton. Features colorful graphics that kids will love.",
    subcategory: "T-Shirts",
    tags: "Print, Fun, Colorful"
  },
  {
    id: 27,
    name: "Boys Stripe Hoodie",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429848/product_27_kjcfcv.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Cheerful stripe hoodie with comfortable fit. Perfect for playtime and parties.",
    subcategory: "Hoodie",
    tags: "Stripe, Playful, Comfortable"
  },
  {
    id: 28,
    name: "Kids Dinasuar Patchwork Overalls",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429849/product_28_iyrx9j.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "White printed sweatshirt has a round neck, na pockets, long sleeves, snap button closure, ribbed hem",
    subcategory: "Overalls",
    tags: "Dinasaur, Classic, Durable"
  },
  {
    id: 29,
    name: "Boys Superhero Graphic Tee",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429850/product_29_ywy3hq.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Action-packed superhero graphic tee with bold colors and favorite character designs. Made from comfortable cotton blend.",
    subcategory: "Graphic Tees",
    tags: "Superhero, Bold, Action"
  },
  {
    id: 30,
    name: "Girls Floral Summer Shorts",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429852/product_30_nl0erm.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Pretty floral summer shorts with elastic waistband and comfortable fit. Perfect for warm weather activities.",
    subcategory: "Shorts",
    tags: "Floral, Summer, Comfortable"
  },
  {
    id: 31,
    name: "Kids Sport Track Suit",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429853/product_31_joyp7r.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Complete track suit set with matching jacket and pants. Designed for active kids who love sports and outdoor play.",
    subcategory: "Track Suits",
    tags: "Sport, Active, Complete Set"
  },
  {
    id: 32,
    name: "Boys Plaid Button-Up Shirt",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429853/product_32_wdyvr1.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Smart plaid button-up shirt perfect for school events and family gatherings. Made from soft, breathable fabric.",
    subcategory: "Button-Up Shirts",
    tags: "Plaid, Smart, School"
  },
  {
    id: 33,
    name: "Girls Unicorn Themed Sweatshirt",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429856/product_33_thvesk.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Magical unicorn themed sweatshirt with sparkly details and soft fleece interior. Every little girl's dream outfit.",
    subcategory: "Sweatshirts",
    tags: "Unicorn, Magical, Sparkly"
  },
  {
    id: 34,
    name: "Kids Cargo Pants",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429856/product_34_lquc6e.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Practical cargo pants with multiple pockets and adjustable waist. Perfect for outdoor adventures and school wear.",
    subcategory: "Cargo Pants",
    tags: "Cargo, Practical, Adventure"
  },
  {
    id: 35,
    name: "Boys Baseball Cap Set",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429857/product_35_hsverr.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Classic baseball cap with team logos and adjustable strap. Protects from sun while adding sporty style.",
    subcategory: "Accessories",
    tags: "Baseball, Sport, Sun Protection"
  },
  {
    id: 36,
    name: "Girls Princess Tutu Skirt",
    category: "kid",
    image: "https://res.cloudinary.com/dijumyrxb/image/upload/v1768429859/product_36_nzycjl.png",
    new_price: 85.0,
    old_price: 120.5,
    description: "Fluffy princess tutu skirt with multiple layers and elastic waistband. Perfect for dress-up and special occasions.",
    subcategory: "Skirts",
    tags: "Princess, Tutu, Dress-up"
  },
];

export default all_product;