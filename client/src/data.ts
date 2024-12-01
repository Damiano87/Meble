import bed1 from "/images/bedroom/bed1.jpg";
import bed2 from "/images/bedroom/bed2.webp";
import bed3 from "/images/bedroom/bed3.webp";
import nocka1 from "/images/bedroom/nocka1.webp";
import nocka2 from "/images/bedroom/nocka2.webp";
import nocka3 from "/images/bedroom/nocka3.webp";
import druganocka1 from "/images/bedroom/druganocka1.webp";
import druganocka2 from "/images/bedroom/druganocka2.webp";
import druganocka3 from "/images/bedroom/druganocka3.webp";
import rtv1 from "/images/bedroom/rtv1.webp";
import rtv2 from "/images/bedroom/rtv2.webp";
import rtv3 from "/images/bedroom/rtv3.webp";
import lamp1 from "/images/bedroom/lamp1.webp";
import lamp2 from "/images/bedroom/lamp2.webp";
import lamp3 from "/images/bedroom/lamp3.webp";
import starlamp1 from "/images/bedroom/starlamp1.webp";
import starlamp2 from "/images/bedroom/starlamp2.webp";
import starlamp3 from "/images/bedroom/starlamp3.webp";
import szafa1 from "/images/bedroom/szafa1.webp";
import szafa2 from "/images/bedroom/szafa2.webp";
import szafa3 from "/images/bedroom/szafa3.webp";
import szafka1 from "/images/bedroom/szafka1.webp";
import szafka2 from "/images/bedroom/szafka2.webp";
import szafka3 from "/images/bedroom/szafka3.webp";
import blender1 from "/images/kitchen/blender1.webp";
import blender2 from "/images/kitchen/blender2.webp";
import blender3 from "/images/kitchen/blender3.webp";
import chair1 from "/images/kitchen/chair1.webp";
import chair2 from "/images/kitchen/chair2.webp";
import chair3 from "/images/kitchen/chair3.webp";
import stol1 from "/images/kitchen/stol1.webp";
import stol2 from "/images/kitchen/stol2.webp";
import stol3 from "/images/kitchen/stol3.webp";
import regal1 from "/images/living-room/regal1.webp";
import regal2 from "/images/living-room/regal2.webp";
import regal3 from "/images/living-room/regal3.webp";
import drugiregal1 from "/images/living-room/drugiregal1.webp";
import drugiregal2 from "/images/living-room/drugiregal2.webp";
import drugiregal3 from "/images/living-room/drugiregal3.webp";
import fotel1 from "/images/living-room/fotel1.webp";
import fotel2 from "/images/living-room/fotel2.webp";
import fotel3 from "/images/living-room/fotel3.webp";
import sofa1 from "/images/living-room/sofa1.webp";
import sofa2 from "/images/living-room/sofa2.webp";
import sofa3 from "/images/living-room/sofa3.webp";
import stolik1 from "/images/living-room/stolik1.webp";
import stolik2 from "/images/living-room/stolik2.webp";
import stolik3 from "/images/living-room/stolik3.webp";
import szafasalon1 from "/images/living-room/szafasalon1.webp";
import szafasalon2 from "/images/living-room/szafasalon2.webp";
import szafasalon3 from "/images/living-room/szafasalon3.webp";

const products = [
  {
    id: 1,
    name: "łóżko drewniane",
    price: 5589,
    category: "sypialnia",
    inStore: true,
    images: [bed1, bed2, bed3],
    likes: 345,
  },
  {
    id: 2,
    name: "szafka nocna MDF",
    price: 1689,
    category: "sypialnia",
    inStore: false,
    images: [nocka1, nocka2, nocka3],
    likes: 220,
  },
  {
    id: 3,
    name: "szafka nocna szklana",
    price: 1389,
    category: "sypialnia",
    inStore: false,
    images: [druganocka1, druganocka2, druganocka3],
    likes: 367,
  },
  {
    id: 4,
    name: "szafka rtv szara",
    price: 1339,
    category: "sypialnia",
    inStore: false,
    images: [rtv1, rtv2, rtv3],
    likes: 136,
  },
  {
    id: 5,
    name: "lampa stołowa",
    price: 1339,
    category: "sypialnia",
    inStore: false,
    images: [lamp1, lamp2, lamp3],
    likes: 79,
  },
  {
    id: 6,
    name: "lampa wisząca stalowa",
    price: 1379,
    category: "sypialnia",
    inStore: false,
    images: [starlamp1, starlamp2, starlamp3],
    likes: 48,
  },
  {
    id: 7,
    name: "szafa nowoczesna",
    price: 2004,
    category: "sypialnia",
    inStore: true,
    images: [szafa1, szafa2, szafa3],
    likes: 149,
  },
  {
    id: 8,
    name: "szafka rtv drewniana",
    price: 1199,
    category: "sypialnia",
    inStore: false,
    images: [szafka1, szafka2, szafka3],
    likes: 375,
  },
  {
    id: 9,
    name: "blender chromowany",
    price: 740,
    category: "kuchnia",
    inStore: false,
    images: [blender1, blender2, blender3],
    likes: 123,
  },
  {
    id: 10,
    name: "krzesło obrotowe",
    price: 1089.45,
    category: "kuchnia",
    inStore: false,
    images: [chair1, chair2, chair3],
    likes: 287,
  },
  {
    id: 11,
    name: "stół naturalny",
    price: 3800,
    category: "kuchnia",
    inStore: false,
    images: [stol1, stol2, stol3],
    likes: 149,
  },
  {
    id: 12,
    name: "regał metalowy",
    price: 2640,
    category: "salon",
    inStore: false,
    images: [regal1, regal2, regal3],
    likes: 87,
  },
  {
    id: 13,
    name: "regał z drewna",
    price: 4300.58,
    category: "salon",
    inStore: true,
    images: [drugiregal1, drugiregal2, drugiregal3],
    likes: 245,
  },
  {
    id: 14,
    name: "fotel do salonu",
    price: 4300,
    category: "salon",
    inStore: false,
    images: [fotel1, fotel2, fotel3],
    likes: 57,
  },
  {
    id: 15,
    name: "sofa pikowana",
    price: 12999,
    category: "salon",
    inStore: false,
    images: [sofa1, sofa2, sofa3],
    likes: 358,
  },
  {
    id: 16,
    name: "stolik kawowy",
    price: 994,
    category: "salon",
    inStore: false,
    images: [stolik1, stolik2, stolik3],
    likes: 170,
  },
  {
    id: 17,
    name: "szafa skandynawska",
    price: 4008,
    category: "salon",
    inStore: false,
    images: [szafasalon1, szafasalon2, szafasalon3],
    likes: 470,
  },
];

export default products;
