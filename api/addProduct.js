import prisma from "./lib/prisma.js";

async function addProduct() {
  const product = await prisma.product.create({
    data: {
      name: "Stół ogrodowy akacjowy",
      price: 175900,
      category: "ogród",
      likes: 68,
      title: "Klasyczny stół do jadalni z drewna akacjowego",
      description:
        "Uczyń swój ogród stylowym miejscem spotkań dzięki temu rustykalnemu stołowi jadalnianemu. Wykonany został z wysokiej jakości laminowanego drewna akacjowego, dzięki czemu można go używać zarówno wewnątrz, jak i na zewnątrz. Widoczne słoje drewna dodają mu wyjątkowości, dzięki czemu każdy stół jest unikatowy. Jasny odcień drewna sprawia, że z łatwością wpasuje się w każdą aranżację.",
      images: [
        "https://res.cloudinary.com/damiano/image/upload/v1734462127/stologrod1_gl5mbr.jpg",
        "https://res.cloudinary.com/damiano/image/upload/v1734462127/stologrod2_rijodc.jpg",
        "https://res.cloudinary.com/damiano/image/upload/v1734462127/stologrod3_rypify.jpg",
      ],
      stock: 7,
      features: [
        "Ponadczasowy design",
        "Wyjątkowy ze względu na naturalne słoje i sęki",
        "Wykonanie z wysokiej jakości materiałów",
        "Odpowiedni do użytku na zewnątrz i wewnątrz",
        "Niezwykle stabilna konstrukcja nóżek",
      ],
      offers: ["1 x Stół"],
      details: [
        { name: "Numer artykułu", description: "237753-248974" },
        { name: "Gwarancja", description: "24 miesiące" },
        { name: "Rodzaj", description: "Stół ogrodowy" },
        { name: "Kolor", description: "Jasne drewno" },
        { name: "Materiał", description: "Drewno akacjowe" },
        { name: "Wykończenie", description: "Olejowany, Laminowany" },
        { name: "Waga", description: "37 kg" },
        { name: "Maks. obciążenie", description: "80 kg" },
        { name: "Montaż", description: "Wymaga montażu nóżek" },
        { name: "Kształt", description: "Prostokątny" },
        { name: "Miejsce dla", description: "8 osób" },
      ],
      dimensions: [
        { name: "Wysokość", dim: "77 cm" },
        { name: "Szerokość", dim: "90 cm" },
        { name: "Długość", dim: "210 cm" },
        { name: "Wysokość nóżek", dim: "68 cm" },
      ],
      materialDetails: [
        { name: "Gatunek drewna", description: ["Acacia mangium"] },
        { name: "Pochodzenie drewna", description: ["Wietnam"] },
      ],
      resistance: {
        resistFrom: ["Na wiatr", "Na wilgoć", "Na zabrudzenia"],
        resistDesc:
          "Produkt wykonano z materiałów o podwyższonej odporności na plamy, dzięki czemu przebarwienia nie powinny się osadzać tak łatwo lub powinny być łatwe do usunięcia. Przy usuwaniu plam prosimy kierować się wskazówkami dotyczącymi pielęgnacji. Odporność na wilgoć oznacza, że produkt ten nie ulegnie zniszczeniu pod wpływem niewielkiej ilości wody czy innych płynów. Możesz swobodnie korzystać z niego na zewnątrz, również w trakcie niewielkich opadów deszczu, czy wilgotnego powietrza. Obfite opady deszczu, czy duże ilości wody, mogą jednak powodować uszkodzenia. Aby zapewnić jak najlepszy wygląd i funkcjonalność, zalecamy przechowywanie produktu w suchym, zadaszonym pomieszczeniu lub pod przykryciem, kiedy nie jest używany.",
      },
      additionalInfo:
        "Do poniższego produktu dołączamy szczegółową książeczkę pielęgnacji, dzięki której mebel będzie wyglądał jak najlepiej przez wiele lat. Sprawdź instrukcję konserwacji i wskazówki, jak prawidłowo dbać o swój nowy produkt – znajdziesz je obok instrukcji montażu. Drewno jest surowcem naturalnym. Wszelkie różnice w kolorze i fakturze, znamiona, marszczenia oraz podobne znaki naturalne są potwierdzeniem autentyczności surowca, a nie wadą uzasadniającą reklamację.",
      careTips: [
        {
          tip: "Drewno akacjowe",
          list: [
            "Do czyszczenia należy używać wyłącznie łagodnych detergentów oraz miękkiej ściereczki, wycierając powierzchnię w kierunku słojów. Po przetarciu na mokro, dokładnie wytrzeć do sucha.",
            "Drewno z olejowanym wykończeniem należy olejować przed użyciem oraz ponownie po sezonie, w szczególności w wilgotnym klimacie.",
            "Poza sezonem oraz podczas niesprzyjających warunków pogodowych, zaleca się przechowywanie mebli pod plandeką albo w suchym i chłodnym pomieszczeniu.",
          ],
        },
      ],
      packing: [
        "1 X Stół ogrodowy, LIVORNO, 210x90 cm, QTJ (38.0 kg) 218.00 x 15.50 x 98.00 cm (dł. x szer. x wys.)",
      ],
    },
  });
  console.log("Produkt dodany:", product);
}

addProduct();

// data: {
//       name: "Zestaw ogrodowy stół i 6 krzeseł",
//       price: 339900,
//       category: "ogród",
//       likes: 298,
//       title: "6-osobowy zestaw mebli ogrodowych",
//       description:
//         "Elegancki i stylowy zestaw składający się ze stołu i 6 krzeseł jest doskonałym dodatkiem do ogrodu, na taras lub patio. Wykonany z solidnej ramy aluminiowej i syntetycznego drewna jest odporny na warunki atmosferyczne. Krzesła wyposażone są w podłokietniki, a możliwość sztaplowania ułatwia ich przechowywanie.",
//       images: [
//         "https://res.cloudinary.com/damiano/image/upload/v1734461760/zestawogrod1_dijohq.jpg",
//         "https://res.cloudinary.com/damiano/image/upload/v1734461760/zestawogrod2_eouvij.jpg",
//         "https://res.cloudinary.com/damiano/image/upload/v1734461760/zestawogrod3_o44ghk.jpg",
//       ],
//       stock: 4,
//       features: [
//         "Uzupełnienie ogrodu w nowoczesnym stylu",
//         "Ponadczasowy design",
//         "Odpowiedni do użytku na zewnątrz i wewnątrz",
//         "Łatwe w pielęgnacji i wytrzymałe materiały",
//         "Możliwość sztaplowania, oszczędność miejsca",
//       ],
//       offers: ["1 x Stół", "6 x Krzesło"],
//       details: [
//         { name: "Numer artykułu", description: "237020-10591" },
//         { name: "Gwarancja", description: "24 miesiące" },
//         { name: "Rodzaj", description: "Stół ogrodowy z krzesłami" },
//         { name: "Kolor", description: "Szary, Srebrny" },
//         { name: "Materiał", description: "Drewno syntetyczne" },
//         { name: "Materiał dodatkowy", description: "Aluminium" },
//         { name: "Wykończenie", description: "Anodowane, Szczotkowany" },
//         { name: "Miejsce dla", description: "6 osób" },
//         { name: "Waga", description: "64 kg" },
//         { name: "Maks. obciążenie stołu", description: "150 kg" },
//         { name: "Maks. obciążenie krzesła", description: "150 kg" },
//         { name: "Montaż", description: "Częściowo zmontowany" },
//       ],
//       dimensions: [
//         { name: "Stół", dim: "180 x 90 x 76 cm" },
//         { name: "Krzesło", dim: "54 x 57 x 88 cm" },
//         { name: "Wysokość siedziska", dim: "45 cm" },
//       ],
//       resistance: {
//         resistFrom: [
//           "Na wodę",
//           "Na promieniowanie UV",
//           "Na rdzę",
//           "Na wiatr",
//           "Na zabrudzenia",
//         ],
//         resistDesc:
//           "Ten produkt cechuje się wysoką odpornością na działanie wody. Oznacza to, że nie powinien ulec zniszczeniu wskutek ekspozycji na opady deszczu czy kontakt z innymi płynami. Poza sezonem zalecamy przechowywanie pod przykryciem, najlepiej w zadaszonym pomieszczeniu. Meble odporne na promieniowanie UV wykazują większą wytrzymałość na przebarwienia czy inne defekty spowodowane działaniem promieni słonecznych. Zalecamy jednak, aby były przechowywane pod przykryciem, kiedy nie są używane. Zapewni to maksymalną żywotność mebli. Dzięki odpowiedniemu wykończeniu powierzchnia produktu jest odporna na powstawanie rdzy. Oznacza to, że może być użytkowany na zewnątrz. Kiedy meble nie są używane, zalecane jest używanie pokrowca lub przechowywanie ich w suchym miejscu. Produkt ten jest odporny na działanie silnego wiatru, dzięki czemu nie powinien przewracać się, tracić stabilności wskutek podmuchów wiatru. Produkt wykonano z materiałów o podwyższonej odporności na plamy, dzięki czemu przebarwienia nie powinny się osadzać tak łatwo lub powinny być łatwe do usunięcia. Przy usuwaniu plam prosimy kierować się wskazówkami dotyczącymi pielęgnacji.",
//       },
//       additionalInfo:
//         "Nie należy stawiać szklanych przedmiotów (wazony, szklanki, itp.) bezpośrednio na powierzchni mebli. Skoncentrowana wiązka promieni słonecznych może doprowadzić do przegrzania materiału i uszkodzenia produktu. Do poniższego produktu dołączamy szczegółową książeczkę pielęgnacji, dzięki której mebel będzie wyglądał jak najlepiej przez wiele lat. Sprawdź instrukcję konserwacji i wskazówki, jak prawidłowo dbać o swój nowy produkt – znajdziesz je obok instrukcji montażu.",
//       careTips: [
//         {
//           tip: "Aluminium",
//           list: [
//             "Czyścić wodą z mydłem i łagodnym detergentem. Kurz wycierać miękką ściereczką.",
//             "Poza sezonem zaleca się przechowywanie mebli pod plandeką albo w suchym i chłodnym pomieszczeniu.",
//           ],
//         },
//         {
//           tip: "Drewno syntetyczne",
//           list: [
//             "Zaleca się czyszczenie za pomocą łagodnego roztworu mydła, miękką ściereczką.",
//             "Używając grilla w pobliżu mebli, należy uważać, aby odpryskujące iskry nie miały z nimi kontaktu, gdyż mogą je uszkodzić. Z tego samego powodu nie należy zostawiać na ich powierzchni gorących akcesoriów do grillowania.",
//             "Materiał jest wyjątkowo odporny na warunki atmosferyczne. Jednak poza sezonem, zaleca się przechowywanie mebli pod plandeką albo w suchym i chłodnym pomieszczeniu.",
//           ],
//         },
//       ],
//       packing: [
//         "1 X Stół, VERNIO, szary, new (28.0 kg) 176.50 x 16.50 x 101.50 cm (dł. x szer. x wys.)",
//         "1 X Krzesło, VERNIO, szare, 6 szt. (37.0 kg) 100.00 x 57.00 x 77.00 cm (dł. x szer. x wys.)",
//       ],
//     },
//   });
