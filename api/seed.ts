import prisma from "./lib/prisma.js";

async function importProducts(products) {
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log("Import completed");
  await prisma.$disconnect();
}

const products = [
  {
    name: "łóżko drewniane",
    price: 558900,
    category: "sypialnia",
    likes: 345,
    title:
      "Drewniana rama łóżka ze stelażem i wezgłowiem z plecionką wiedeńską",
    description:
      "Zagwarantuj sobie spokojny, relaksujący sen, a także odśwież swoją sypialnię przy pomocy tego przyciągającego uwagę łóżka. Mebel wykonany został z wysokiej jakości drewna kauczukowego, dzięki czemu cechuje się wytrzymałością i nie wymaga codziennej pielęgnacji. Wezgłowie ozdobione zostało plecionką wiedeńską, czym na pewno zachwyci każdego domownika. Ten element łóżka można również regulować, zmieniając jego wysokość. Dzięki dołączonym listwom LED możesz też rozświetlić swoją sypialnię mocnym światłem.",
    images: [
      "https://res.cloudinary.com/damiano/image/upload/v1733423471/bed1_pzllhw.jpg",
      "https://res.cloudinary.com/damiano/image/upload/v1733423472/bed2_wweikn.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423471/bed3_mfeuay.webp",
    ],
    stock: 7,
    features: [
      "Odpowiedni do wszystkich rodzajów materacy",
      "Stabilny, wbudowany stelaż zapewnia trwałość na lata",
      "Wyjątkowy ze względu na naturalne słoje i sęki",
      "Ponadczasowy design",
      "Efektowne oświetlenie LED wprowadza wyjątkową atmosferę",
      "Solidna jakość wykonania",
    ],
    offers: [
      "1 x Rama łóżka",
      "1 x Stelaż (13 listew prostych)",
      "2 x Listwa LED (każda po 120 cm)",
      "2 x Czujnik ruchu",
      "1 x Zasilacz",
      "1 x Adapter",
      "W skład oferty nie wchodzi materac, pościel i poduszki",
    ],
    details: [
      { name: "Numer artykułu", description: "303483-447650" },
      { name: "Gwarancja", description: "24 miesiące" },
      { name: "Rodzaj", description: "Łóżko LED" },
      { name: "Kolor", description: "Jasne drewno" },
      { name: "Materiał", description: "Drewno kauczukowe" },
      { name: "Materiał dodatkowy", description: "Rattan" },
      { name: "Wykończenie", description: "Olejowany" },
      { name: "Waga", description: "50 kg" },
      { name: "Maks. obciążenie", description: "300 kg" },
      { name: "Montaż", description: "Wymaga kompletnego montażu" },
      { name: "Tył wykończony", description: "Tak" },
      { name: "Typ diody", description: "SMD 3528" },
      { name: "Strumień świetlny", description: "66 lm" },
      { name: "Barwa światła", description: "Ciepła biel" },
      { name: "Barwa światła", description: "Ciepła biel 2800 - 3200 K" },
    ],
    dimensions: [
      { name: "Wysokość", dim: "149 cm" },
      { name: "Szerokość", dim: "185 cm" },
      { name: "Długość", dim: "204 cm" },
      { name: "Wysokość nóżek", dim: "23 cm" },
      { name: "Wezgłowie", dim: "175 x 57 cm" },
      { name: "Powierzchnia spania", dim: "180 x 200 cm" },
      { name: "Głębokość ramy", dim: "Mniej niż 5 cm" },
    ],
    materialDetails: [
      { name: "Gatunek drewna", description: ["Hevea brasiliensis"] },
      { name: "Pochodzenie drewna", description: ["Malezja"] },
    ],
    additionalInfo:
      "Wysokość materaca przedstawionego na zdjęciu wynosi 20 cm, zalecamy użycie materaca o podobnej wysokości. Drewno jest surowcem naturalnym. Wszelkie różnice w kolorze i fakturze, znamiona, marszczenia oraz podobne znaki naturalne są potwierdzeniem autentyczności surowca, a nie wadą uzasadniającą reklamację. Drewno to naturalny materiał, dzięki czemu zachowuje swoją strukturę i wyjątkowy charakter powierzchni również po malowaniu.",
    careTips: [
      {
        tip: "Drewno kauczukowe",
        list: [
          "Do czyszczenia należy używać wyłącznie łagodnych detergentów oraz miękkiej ściereczki, wycierając powierzchnię w kierunku słojów.",
          "Aby chronić mebel przed wilgocią, po przetarciu na mokro należy go dokładnie wytrzeć do sucha.",
          "Dla produktów drewnianych z olejowanym wykończeniem: można ponownie olejować po dłuższym użytkowaniu, by utrzymać jego dobry wygląd.",
        ],
      },
      {
        tip: "Rattan",
        list: [
          "Czyścić wyłącznie suchą materiałową ściereczką, bez żadnych środków myjących.",
        ],
      },
    ],
    packing: [
      "1 X Rama łóżka TOUCY, jasne drewno 180 x 200 cm, karton 1/1 (41.5 kg) 256.00 x 19.00 x 30.00 cm (dł. x szer. x wys.)",
      "1 X Wezgłowie VARZY, 180 x 200 cm, jasne drewno (13.6 kg) 198.50 x 7.50 x 71.00 cm (dł. x szer. x wys.)",
      "1 X Taśma LED, 2 x 120 cm ATRATO (0.5 kg) 30.00 x 10.00 x 25.00 cm (dł. x szer. x wys.)",
    ],
  },
  {
    name: "szafka nocna szklana",
    price: 168900,
    category: "sypialnia",
    likes: 220,
    title: "Stolik ozdobny w stylu francuskim",
    description:
      "Ten ozdobny stolik, inspirowany stylem francuskim stanie się prawdziwą ozdobą Twojego domu. Tradycyjny kształt vintage połączony z lustrzaną powierzchnią sprawia, że mebel jest niebagatelny i doda szyku każdemu salonowi, czy sypialni. Mebel optycznie powiększy wybrane pomieszczenie. Stolik zaprezentuje się szczególnie dobrze w towarzystwie dodatków w stylu vintage czy klasycznym.",
    images: [
      "https://res.cloudinary.com/damiano/image/upload/v1733423471/druganocka1_vpblg6.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423472/druganocka2_w1jsfx.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423472/druganocka3_cohs4z.webp",
    ],
    stock: 10,
    features: [
      "Elegancki wygląd",
      "Przyciągający uwagę element wystroju",
      "Lustrzane wykończenie w stylu glamour",
      "Wykonanie z wysokiej jakości materiałów",
      "Dodatkowa przestrzeń do przechowywania",
    ],
    offers: ["1 x Konsola"],
    details: [
      { name: "Numer artykułu", description: "306158-100721" },
      { name: "Gwarancja", description: "24 miesiące" },
      { name: "Rodzaj", description: "Konsola" },
      { name: "Kolor", description: "Srebrny" },
      { name: "Materiał", description: "Szkło" },
      { name: "Materiał dodatkowy", description: "MDF, Drewno jodłowe" },
      { name: "Wykończenie", description: "Lustrzany" },
      { name: "Waga", description: "12 kg" },
      { name: "Maks. obciążenie góry", description: "50 kg" },
      {
        name: "Maks. obciążenie szuflady",
        description: "15 kg",
      },
      { name: "Montaż", description: "Nie wymaga montażu" },
    ],
    dimensions: [
      { name: "Wysokość", dim: "75 cm" },
      { name: "Szerokość", dim: "48 cm" },
      { name: "Głębokość", dim: "34 cm" },
      { name: "Wysokość nóżek", dim: "51 cm" },
    ],
    materialDetails: [
      { name: "Gatunek drewna", description: ["Pinus picea"] },
      { name: "Pochodzenie drewna", description: ["Chiny"] },
    ],
    careTips: [
      {
        tip: "Szkło",
        list: [
          "Do czyszczenia używać wyłącznie łagodnych środków czystości lub detergentów do szkła oraz miękkiej ściereczki. Po przetarciu na mokro, wytrzeć do sucha.",
          "Aby uniknąć zarysowań, nie używać mleczka do czyszczenia.",
        ],
      },
      {
        tip: "MDF",
        list: [
          "Używać wyłącznie łagodnych środków czystości oraz miękkiej ściereczki. Po przetarciu na mokro dokładnie wytrzeć do sucha.",
        ],
      },
    ],
    packing: [
      "1 X Konsola SOMMA, efekt lustra (12.5 kg) 82.00 x 45.50 x 54.00 cm (dł. x szer. x wys.)",
    ],
  },
  {
    name: "szafka nocna biała",
    price: 136000,
    category: "sypialnia",
    likes: 367,
    title: "Praktyczny, biały stolik nocny z 2 szufladami",
    description:
      "Ten rustykalny stolik zachowany jest w klasycznej formie, dzięki czemu jest idealnym wyposażeniem każdej sypialni. Co więcej, 2 dodatkowe głębokie szuflady z ozdobnymi, okrągłymi uchwytami zapewnią wystarczająco miejsca na przedmioty codziennego użytku. Na blacie znajdzie się wystarczająco dużo miejsca, aby umieścić lampkę nocną, budzik oraz ulubioną książkę.",
    images: [
      "https://res.cloudinary.com/damiano/image/upload/v1733423475/nocka1_qmto4i.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423475/nocka2_cp0og5.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423476/nocka3_wzmu5k.webp",
    ],
    stock: 5,
    features: [
      "Praktyczne szuflady ze stabilnym mechanizmem",
      "Wpasuje się doskonale we wnętrza w różnym stylu",
      "Minimalistyczny styl skandynawski",
      "Najwyższej jakości materiały",
      "Precyzyjne wykończenie",
    ],
    offers: ["1 x Szafka nocna"],
    details: [
      { name: "Numer artykułu", description: "306264-66530" },
      { name: "Gwarancja", description: "24 miesiące" },
      { name: "Rodzaj", description: "Szafka nocna 2 szuflady" },
      { name: "Kolor", description: "Biały" },
      { name: "Materiał", description: "MDF, Płyta pilśniowa" },
      { name: "Materiał dodatkowy", description: "Metal" },
      { name: "Wykończenie", description: "Malowany" },
      { name: "Waga", description: "15 kg" },
      { name: "Maks. obciążenie góry", description: "25 kg" },
      { name: "Maks. obciążenie szuflady", description: "5 kg" },
      { name: "Montaż", description: "Wymaga kompletnego montażu" },
      { name: "Typ drzwiczek", description: "Drzwi przesuwne" },
    ],
    dimensions: [
      { name: "Wysokość", dim: "56 cm" },
      { name: "Szerokość", dim: "45 cm" },
      { name: "Głębokość", dim: "40 cm" },
      { name: "Wysokość nóżek", dim: "10 cm" },
    ],
    additionalInfo:
      "Aby zachować trwałość i estetykę blatu, zalecamy stosowanie podkładek pod naczynia oraz jak najszybsze usuwanie mokrych plam i zabrudzeń, co pomoże uniknąć uszkodzeń produktu.",
    careTips: [
      {
        tip: "MDF",
        list: [
          "Używać wyłącznie łagodnych środków czystości oraz miękkiej ściereczki. Po przetarciu na mokro dokładnie wytrzeć do sucha.",
        ],
      },
      {
        tip: "Drewno",
        list: [
          "Do czyszczenia należy używać wyłącznie łagodnych detergentów oraz miękkiej ściereczki, wycierając powierzchnię w kierunku słojów.",
          "Aby chronić mebel przed wilgocią, po przetarciu na mokro należy go dokładnie wytrzeć do sucha.",
          "Dla produktów drewnianych z olejowanym wykończeniem: można ponownie olejować po dłuższym użytkowaniu, by utrzymać jego dobry wygląd.",
        ],
      },
    ],
    packing: [
      "1 X Szafka nocna, JOLIET, biała (15.8 kg) 64.50 x 22.00 x 52.00 cm (dł. x szer. x wys.)",
    ],
  },
  {
    name: "szafka rtv szara",
    price: 133900,
    category: "sypialnia",
    likes: 136,
    title: "Klasyczna, pojemna szafka pod telewizor",
    description:
      "Mówi się, że piękno tkwi w prostocie, co idealnie odnosi się do tej szafki RTV. Klasyczne połączenie czerni i złotych akcentów z ponadczasowym designem sprawia, że świetnie sprawdzi się ona zarówno w pomieszczeniach w stylu retro czy tradycyjnym, jak i w bardziej nowoczesnych aranżacjach. Dzięki pojemnym szafkom i półkom z łatwością przechowasz wszelkiego rodzaju akcesoria oraz sprzęt, a specjalne otwory pozwolą ukryć kable.",
    images: [
      "https://res.cloudinary.com/damiano/image/upload/v1733423475/nocka1_qmto4i.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423475/nocka2_cp0og5.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423476/nocka3_wzmu5k.webp",
    ],
    stock: 6,
    features: [
      "Otwór w tylnej ściance pozwala na łatwy montaż okablowania",
      "Połączenie piękna z funkcjonalnością",
      "Nowoczesny design",
      "Wykonanie z wysokiej jakości materiałów",
      "Niewymagający w pielęgnacji i wyjątkowo trwały",
    ],
    offers: ["1 x Szafka pod telewizor"],
    details: [
      { name: "Numer artykułu", description: "310245-228797" },
      { name: "Gwarancja", description: "24 miesiące" },
      { name: "Rodzaj", description: "Szafka RTV" },
      { name: "Kolor", description: "Szary, Złoty" },
      { name: "Materiał", description: "Płyta pilśniowa" },
      {
        name: "Materiał dodatkowy",
        description: "Stal, Aluminium, Kauczuk syntetyczny",
      },
      { name: "Wykończenie", description: "Melamina" },
      { name: "Waga", description: "34 kg" },
      { name: "Maks. obciążenie półki", description: "25 kg" },
      { name: "Maks. obciążenie góry", description: "120 kg" },
      { name: "Liczba półek", description: "2" },
      { name: "Montaż", description: "Wymaga kompletnego montażu" },
      { name: "Typ drzwiczek", description: "Standardowy" },
    ],
    dimensions: [
      { name: "Wysokość", dim: "57 cm" },
      { name: "Szerokość", dim: "166 cm" },
      { name: "Głębokość", dim: "40 cm" },
    ],
    additionalInfo:
      "Aby zachować trwałość i estetykę blatu, zalecamy stosowanie podkładek pod naczynia oraz jak najszybsze usuwanie mokrych plam i zabrudzeń, co pomoże uniknąć uszkodzeń produktu.",
    careTips: [
      {
        tip: "Płyta pilśniowa",
        list: [
          "Używać wyłącznie łagodnych środków czystości oraz miękkiej ściereczki. Po przetarciu na mokro dokładnie wytrzeć do sucha.",
        ],
      },
      {
        tip: "Stal",
        list: [
          "Czyścić za pomocą ogólnodostępnych, delikatnych środków myjących oraz miękkiej ściereczki, po przetarciu na mokro wytrzeć do sucha.",
          "Aby uniknąć zarysowań, nie używać mleczka do czyszczenia.",
          "Elementy miedziane lub chromowane należy polerować przeznaczonymi do tego środkami.",
        ],
      },
    ],
    packing: [
      "1 X INDIO, szafka RTV, czarny/ złoty, 1/2 (9.7 kg) 59.50 x 11.50 x 50.50 cm (dł. x szer. x wys.)",
      "1 X INDIO, szafka RTV, czarny/ złoty, 2/2 (26.7 kg) 176.50 x 11.00 x 50.50 cm (dł. x szer. x wys.)",
    ],
  },
  {
    name: "lampa stołowa",
    price: 30000,
    category: "sypialnia",
    likes: 79,
    title: "Ceramiczna lampa z bazą imitującą kamień",
    description:
      "Rozświetl dowolne pomieszczenie za pomocą tej tradycyjnej lampy, wykonanej z trwałej i łatwej w pielęgnacji ceramiki. Oprócz niewymagającej czyszczenia struktury, baza lampy imituje kamień, co przyciąga uwagę i czyni produkt unikatowym. Na wygląd pozytywnie wpływa także ręcznie wykonany klosz w jasnym kolorze. Całe to połączenie sprawia, że lampka sprawdzi się w wielu stylach wnętrzarskich utrzymanych w delikatnych kolorach.",
    images: [
      "https://res.cloudinary.com/damiano/image/upload/v1733423473/lamp1_twjqgm.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423474/lamp2_u0d6de.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423474/lamp3_jzuphn.webp",
    ],
    stock: 12,
    features: [
      "Rozproszone, łagodne światło",
      "Równomierne oświetlenie całego pomieszczenia",
      "Tradycyjny design z nutą nowoczesności",
      "Ręczne wykonanie",
      "Niewymagający w pielęgnacji i wyjątkowo trwały",
    ],
    offers: ["1 x Lampa stołowa", "W skład oferty nie wchodzi żarówka"],
    details: [
      { name: "Numer artykułu", description: "302340-315448" },
      { name: "Gwarancja", description: "24 miesiące" },
      { name: "Rodzaj", description: "Lampa stołowa" },
      { name: "Kolor", description: "Biały" },
      { name: "Odcień", description: "Kremowy" },
      { name: "Materiał", description: "Ceramika" },
      {
        name: "Materiał dodatkowy",
        description: "Bawełna, Juta",
      },
      { name: "Waga", description: "3 kg" },
      { name: "Montaż", description: "Częściowo zmontowany" },
    ],
    dimensions: [
      { name: "Wysokość", dim: "60 cm" },
      { name: "Szerokość", dim: "40 cm" },
      { name: "Głębokość", dim: "40 cm" },
      { name: "Podstawa", dim: "15 x 15 cm" },
      { name: "Długość kabla", dim: "200 cm" },
    ],
    additionalInfo:
      "Lampa nadaje się do źródeł światła o klasie energetycznej od A (najbardziej efektywna energetycznie) do G (najmniej efektywna energetycznie). Do lampy nadają się żarówki typu LED, żarówki halogenowe oraz energooszczędne.",
    techData: [
      { name: "Napięcie", data: "250 V" },
      { name: "Typ żarówki", data: "E27" },
      { name: "Moc", data: "40W" },
      { name: "Stopień ochrony", data: "IP 20" },
      { name: "Liczba żarówek", data: "1" },
    ],
    materialDetails: [
      { name: "Skład materiału", description: ["65% Juta", "35% Bawełna"] },
    ],
    careTips: [
      {
        tip: "Ceramika",
        list: [
          "Należy używać wyłącznie łagodnych środków czystości oraz miękkiej ściereczki, po przetarciu na mokro wytrzeć do sucha.",
        ],
      },
      {
        tip: "Juta",
        list: [
          "Plamy należy usuwać za pomocą środka do czyszczenia tapicerki i wilgotnej gąbki lub łagodnego detergentu.",
          "Odkurzać wyłącznie przy pomocy odpowiedniej końcówki.",
        ],
      },
    ],
    packing: [
      "1 X Lampa stołowa, CAINE, kremowa (4.4 kg) 52.50 x 44.00 x 44.00 cm (dł. x szer. x wys.)",
    ],
  },
  {
    name: "lampa wisząca stalowa",
    price: 29900,
    category: "sypialnia",
    likes: 48,
    title: "Lampa sufitowa z mosiężnymi elementami",
    description:
      "Ta stylowa lampa sufitowa nie tylko rozświetli twój salon ciepłym światłem, ale doda mu także stylu i elegancji. Brak kloszy, oraz rzucające się w oczy mosiężne akcenty sprawiają, że lampa idealnie sprawdzi się w nowoczesnych przestrzeniach. Kable różnej długości powodują, że lampa bez problemu zawisnąć może nad stołem kuchennym czy biurkiem.",
    images: [
      "https://res.cloudinary.com/damiano/image/upload/v1733423478/starlamp1_rhyqhi.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423479/starlamp2_a5kqgf.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423479/starlamp3_ag60rg.webp",
    ],
    stock: 24,
    features: [
      "Równomierne oświetlenie całego pomieszczenia",
      "Wytworny design",
      "Doskonale łączy się z wieloma stylami wnętrz",
      "Wykonanie z wysokiej jakości materiałów",
      "Bezproblemowe w utrzymaniu",
    ],
    offers: ["1 x Lampa wisząca", "W skład oferty nie wchodzi żarówka"],
    details: [
      { name: "Numer artykułu", description: "284109-112184" },
      { name: "Gwarancja", description: "24 miesiące" },
      { name: "Rodzaj", description: "Lampa wisząca" },
      { name: "Kolor", description: "Mosiężny, Czarny, Przezroczysty" },
      { name: "Materiał", description: "Szkło" },
      {
        name: "Materiał dodatkowy",
        description: "Metal, PVC",
      },
      { name: "Waga", description: "1 kg" },
      { name: "Montaż", description: "Wymaga instalacji i montażu" },
    ],
    dimensions: [
      { name: "Wysokość", dim: "118 cm" },
      { name: "Szerokość", dim: "30 cm" },
      { name: "Głębokość", dim: "30 cm" },
      { name: "Długość kabla", dim: "46 / 85 / 75 cm" },
    ],
    additionalInfo:
      "Lampa nadaje się do źródeł światła o klasie energetycznej od A (najbardziej efektywna energetycznie) do G (najmniej efektywna energetycznie). Do lampy nadają się żarówki typu LED, żarówki halogenowe oraz energooszczędne. Kable oraz pozostałe części elektryczne mogą być skracane wyłącznie przez elektryka z uprawnieniami.",
    techData: [
      { name: "Napięcie", data: "220-240 V (50 Hz)" },
      { name: "Typ żarówki", data: "E27" },
      { name: "Moc", data: "7W" },
      { name: "Stopień ochrony", data: "IP 20" },
      { name: "Liczba żarówek", data: "3" },
    ],
    materialDetails: [
      { name: "Skład materiału", description: ["65% Juta", "35% Bawełna"] },
    ],
    careTips: [
      {
        tip: "Metal",
        list: [
          "Czyścić za pomocą ogólnodostępnych, delikatnych środków myjących oraz miękkiej ściereczki, po przetarciu na mokro wytrzeć do sucha.",
          "Aby uniknąć zarysowań, nie używać mleczka do czyszczenia.",
          "Elementy miedziane lub chromowane należy polerować przeznaczonymi do tego środkami.",
        ],
      },
      {
        tip: "PVC",
        list: [
          "Używać wyłącznie łagodnych środków czystości oraz miękkiej ściereczki, po przetarciu na mokro wytrzeć do sucha.",
        ],
      },
    ],
    packing: [
      "1 X Lampa wisząca, VESLE, mosiężna (2.9 kg) 51.00 x 24.50 x 35.00 cm (dł. x szer. x wys.)",
    ],
  },
  {
    name: "szafa dwudrzwiowa",
    price: 200000,
    category: "sypialnia",
    likes: 149,
    title: "Szafa w stylu skandynawskim z półkami i drążkiem na ubrania",
    description:
      "Najłatwiejszym sposobem na organizację sypialni czy przedpokoju, jest umieszczenie w nich przestronnej szafy. Ta sprawdzi się idealnie do przechowywania wszystkich twoich ubrań, kurtek czy innych elementów odzieży. Cały produkt wykonano z wysokiej jakości płyty pilśniowej, dzięki czemu szafa jest łatwa w czyszczeniu. Do tego mebel wyposażony jest w 3 półki, a także w szynę na ubrania - całość schowana jest za parą drzwi. Dzięki swojemu skandynawskiemu designowi szafa będzie świetnie wyglądać w wielu różnych stylach wnętrzarskich.",
    images: [
      "https://res.cloudinary.com/damiano/image/upload/v1733423480/szafa1_ke9uhn.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423481/szafa2_kdpizr.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423481/szafa3_fncz7b.webp",
    ],
    stock: 14,
    features: [
      "Różne rodzaje przestrzeni do przechowywania",
      "Wygląda świetnie we wnętrzach w różnym stylu",
      "Minimalistyczny styl skandynawski",
      "Wysoka jakość wykonania",
      "Niewymagający w pielęgnacji i wyjątkowo trwały",
    ],
    offers: ["1 x Szafa"],
    details: [
      { name: "Numer artykułu", description: "283001-326805" },
      { name: "Gwarancja", description: "24 miesiące" },
      { name: "Rodzaj", description: "Szafa" },
      { name: "Kolor", description: "Biały, Jasne drewno" },
      { name: "Materiał", description: "Płyta pilśniowa" },
      {
        name: "Materiał dodatkowy",
        description: "Metal",
      },
      {
        name: "Wykończenie",
        description: "Melamina",
      },
      { name: "Waga", description: "49 kg" },
      { name: "Maks. obciążenie półki", description: "15 kg" },
      { name: "Maks. obciążenie góry", description: "35 kg" },
      { name: "Montaż", description: "Wymaga kompletnego montażu" },
      { name: "Typ drzwiczek", description: "Standardowy" },
    ],
    dimensions: [
      { name: "Wysokość", dim: "180 cm" },
      { name: "Szerokość", dim: "79 cm" },
      { name: "Głębokość", dim: "52 cm" },
      { name: "Wysokość nóżek", dim: "6 cm" },
      { name: "Półka", dim: "76 x 49 cm" },
    ],
    materialDetails: [
      { name: "Skład materiału", description: ["65% Juta", "35% Bawełna"] },
    ],
    careTips: [
      {
        tip: "Płyta pilśniowa",
        list: [
          "Używać wyłącznie łagodnych środków czystości oraz miękkiej ściereczki. Po przetarciu na mokro dokładnie wytrzeć do sucha.",
        ],
      },
    ],
    packing: [
      "1 X Szafa, SELLIN, biała, karton 1/2 (18.7 kg) 88.00 x 12.00 x 58.00 cm (dł. x szer. x wys.)",
      "1 X Szafa, SELLIN, biała, karton 2/2 (31.0 kg) 191.00 x 11.00 x 57.50 cm (dł. x szer. x wys.)",
    ],
  },
  {
    name: "Szafka RTV jasne drewno",
    price: 76500,
    category: "sypialnia",
    likes: 375,
    title: "Minimalistyczna szafka pod telewizor z szufladami",
    description:
      "Dodaj swojemu wnętrzu porządku i stylu wraz z tą stylową, a zarazem funkcjonalną szafką RTV. Doskonale sprawdzi się ona w salonie lub sypialni w stylu minimalistycznym, jak też inspirowanym Skandynawią. W czterech pojemnych szufladach, w szafce i na trzech półkach zmieścisz kolekcję książek, czy pamiątki rodzinne, takie jak zdjęcia. Stolik wykonano z wysokiej jakości płyty, która jest bardzo łatwa w pielęgnacji i odporna. Cztery metalowe nóżki zapewniają stabilność szafki. Idealne połączenie funkcjonalności i stylu.",
    images: [
      "https://res.cloudinary.com/damiano/image/upload/v1733423482/szafka1_pq5gic.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423483/szafka2_ewlt7l.webp",
      "https://res.cloudinary.com/damiano/image/upload/v1733423483/szafka3_aycho6.webp",
    ],
    stock: 11,
    features: [
      "Z wygodną w użytkowaniu półką",
      "Praktyczne szuflady ze stabilnym mechanizmem",
      "Doskonale uzupełnia wnętrze w każdym stylu",
      "Najwyższej jakości materiały",
      "Solidna rama",
      "Praktyczne miejsce do przechowywania",
    ],
    offers: ["1 x Szafka pod telewizor"],
    details: [
      { name: "Numer artykułu", description: "283070-178140" },
      { name: "Gwarancja", description: "24 miesiące" },
      { name: "Rodzaj", description: "Szafka RTV" },
      { name: "Kolor", description: "Jasne drewno, Czarny" },
      { name: "Materiał", description: "Płyta pilśniowa" },
      {
        name: "Materiał dodatkowy",
        description: "Żelazo",
      },
      {
        name: "Wykończenie",
        description: "Laminowany",
      },
      { name: "Waga", description: "47 kg" },
      { name: "Maks. obciążenie półki", description: "15 kg" },
      { name: "Maks. obciążenie góry", description: "25 kg" },
      { name: "Maks. obciążenie szuflady", description: "15 kg" },
      { name: "Liczba półek", description: "2" },
      { name: "Montaż", description: "Wymaga kompletnego montażu" },
    ],
    dimensions: [
      { name: "Wysokość", dim: "51 cm" },
      { name: "Szerokość", dim: "127 cm" },
      { name: "Głębokość", dim: "40 cm" },
    ],
    additionalInfo:
      "Aby zachować trwałość i estetykę blatu, zalecamy stosowanie podkładek pod naczynia oraz jak najszybsze usuwanie mokrych plam i zabrudzeń, co pomoże uniknąć uszkodzeń produktu.",
    careTips: [
      {
        tip: "Płyta pilśniowa",
        list: [
          "Używać wyłącznie łagodnych środków czystości oraz miękkiej ściereczki. Po przetarciu na mokro dokładnie wytrzeć do sucha.",
        ],
      },
      {
        tip: "Żelazo",
        list: [
          "Czyścić za pomocą ogólnodostępnych, delikatnych środków myjących oraz miękkiej ściereczki, po przetarciu na mokro wytrzeć do sucha.",
          "Aby uniknąć zarysowań, nie używać mleczka do czyszczenia.",
          "Elementy miedziane lub chromowane należy polerować przeznaczonymi do tego środkami.",
        ],
      },
    ],
    packing: [
      "1 X Szafka RTW ATLANTA jasne drewno, karton 1/2 (22.0 kg) 140.00 x 11.50 x 50.00 cm (dł. x szer. x wys.)",
      "1 X Szafka RTW ATLANTA jasne drewno, karton 2/2 (25.7 kg) 140.00 x 16.50 x 50.00 cm (dł. x szer. x wys.)",
    ],
  },
];
