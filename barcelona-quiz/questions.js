const questions = [
  {
    question: "Guess who?",
    image: "futbolcu.jpg",  // public veya proje dizininde olması gereken görsel dosyası
    options: ["Messi", "Iniesta", "Puyol", "Xavi"],
    correctAnswer: 3
  },
  {
    question: "Efsane Barcelona futbolcusu Messi'nin tam ismi aşağıdakilerden hangisidir?",
    options: [
      "Lionel Andrés Messi",
      "Lionel Andrés Messi Cucittinni",
      "Lionel Andrés Messi Cuccittini",
      "Lionel Andréas Messi Cuccittini"
    ],
    correctAnswer: 2
  },
  {
    question: "Aşağıdaki hangi sezonun formasıdır?",
    image: "forma.jpg",
    options: ["06-07 sezonu", "07-08 sezonu", "08-09 sezonu", "09-10 sezonu"],
    correctAnswer: 1
  },
  {
    question: "Barcelona'daki ünlü kilise hangisidir?",
    options: ["Notre Dame", "Sagrada Família", "La Catedral", "San Marco"],
    correctAnswer: 1
  },
  {
    question: "Barcelona'nın resmi kulüp mottosu nedir?",
    options: ["More Than a Club", "Victory is Everything", "Play with Passion", "Football is Life"],
    correctAnswer: 0
  },
  {
    question: "Barcelona hangi özerk bölgede yer alır?",
    options: ["Endülüs", "Bask Bölgesi", "Katalonya", "Valensiya"],
    correctAnswer: 2
  },
  {
    question: "Aşağıdakilerden hangisi FC Barcelona'nın ezeli rakibidir?",
    options: ["Dicle💙💙💙", "Real Betis", "Sevilla", "Real Madrid"],
    correctAnswer: 0
  },
  {
    question: "Barcelona'nın efsane teknik direktörlerinden biri kimdir?",
    options: ["Jose Mourinho", "Pep Guardiola", "Diego Simeone", "Jurgen Klopp"],
    correctAnswer: 1
  },
  {
    question: "İspanya'da bulunan özerk topluluk sayısı kaçtır?",
    options: [
      "15",
      "17",
      "19",
      "21"
    ],
    correctAnswer: 1
  },
  {
    question: "Aşağıdakilerden hangisi İspanya'nın ulusal marşı hakkında doğrudur?",
    options: [
      "Sözleri yoktur",
      "Latincedir",
      "Kraliyet ailesi tarafından yazılmıştır",
      "Endülüs döneminden kalmadır"
    ],
    correctAnswer: 0
  },
  {
    question: "İspanya'nın en uzun nehri hangisidir?",
    options: [
      "Ebro",
      "Tajo (Tagus)",
      "Guadalquivir",
      "Duero"
    ],
    correctAnswer: 1
  },
  {
    question: "İspanya'nın bayrağındaki armada hangi hayvan yer alır?",
    options: [
      "Aslan",
      "Kartal",
      "Boğa",
      "At"
    ],
    correctAnswer: 0
  },
  {
    question: "İspanya'nın anayasaya göre resmi yönetim şekli nedir?",
    options: [
      "Parlamenter monarşi",
      "Federal cumhuriyet",
      "Başkanlık sistemi",
      "Mutlak monarşi"
    ],
    correctAnswer: 0
  },
  {
    question: "La Masia nedir?",
    options: ["Stadyum", "Taraftar grubu", "Genç oyuncu akademisi", "Katalan yemeği"],
    correctAnswer: 2
  },
  {
    question: "Barcelona'nın takma adı 'Barça' ne anlama gelir?",
    options: ["Krallar", "Şampiyonlar", "Şehir", "Kısaltma"],
    correctAnswer: 3
  },
  {
    question: "Barcelona'nın efsane kaptanı Carles Puyol, hangi mevkide oynadı?",
    options: [
      "Orta saha",
      "Forvet",
      "Defans",
      "Kaleci"
    ],
    correctAnswer: 2
  },
  {
    question: "İspanya'da hangi şehir Endülüs bölgesinin başkentidir?",
    options: [
      "Sevilla",
      "Barselona",
      "Valensiya",
      "Madrid"
    ],
    correctAnswer: 0
  },
  {
    question: "İspanyol kültüründe ünlü 'Tomatina' festivali hangi şehirde yapılır?",
    options: [
      "Valensiya",
      "Madrid",
      "Buñol",
      "Barcelona"
    ],
    correctAnswer: 2
  },
  {
    question: "Barcelona'nın futbol dışında en çok başarı kazandığı branş hangisidir?",
    options: ["Basketbol", "Voleybol", "Tenis", "Yüzme"],
    correctAnswer: 0
  },
  {
    question: "Camp Nou kapasitesi yaklaşık kaçtır?",
    options: ["50.000", "70.000", "99.000", "120.000"],
    correctAnswer: 2
  },
  {
    question: "Dicle'nin en çok neyini seviyorsun?",
    options: [
      "Düşünceli",
      "O mükemmel, her şeyini seviyorum",
      "Saf",
      "Gülüşünü"
    ],
    correctAnswer: 1
  },

  {
    question: "Barcelona'daki ünlü parkın adı nedir?",
    options: ["Central Park", "Park Güell", "Retiro Park", "Park Real"],
    correctAnswer: 1
  },
  {
    question: "Barcelona'da en çok konuşulan diller hangileridir?",
    options: ["İspanyolca ve Katalanca", "İngilizce ve Fransızca", "Portekizce ve İtalyanca", "Almanca ve Baskça"],
    correctAnswer: 0
  },
  {
    question: "Andrés Iniesta hangi mevkide oynuyordu?",
    options: ["Kaleci", "Stoper", "Orta saha", "Forvet"],
    correctAnswer: 2
  },
  {
    question: "Barcelona'nın şehri hangi denize kıyıdır?",
    options: ["Karadeniz", "Baltık Denizi", "Akdeniz", "Atlantik"],
    correctAnswer: 2
  },
  {
    question: "Aşağıdaki futbolculardan hangisi Barça'da oynamamıştır?",
    options: ["Ronaldinho", "Zidane", "Xavi", "Piqué"],
    correctAnswer: 1
  },
  {
    question: "Barcelona şehri hangi mimarın eserleriyle tanınır?",
    options: ["Mimar Sinan", "Antonio Gaudí", "Le Corbusier", "Frank Gehry"],
    correctAnswer: 1
  },
 {
    question: "Birlikte gitmek istediğimiz ilk yer neresi?",
    options: [
      "O nereyi isterse tam tersi",
      "Barcelona-Camp Nou",
      "İtalya-Como Gölü",
      "Ofis-rocket+Miran Lahmacun💙"
    ],
    correctAnswer: 3,
    images: [
      "", // 0. seçenek için resim yok
      "campnou.jpg", // 1. seçenek resmi
      "como.jpg",          // 2. seçenek resmi
      "rocket.jpg" // 3. seçenek resmi
    ]
  },
  {
    question: "Barcelona'yı birlikte izlemeyi en çok ne zaman isterdim?",
    options: ["Şampiyonlar Ligi Finali", "El Clasico'da", "Doğum gününde", "Ne zaman olursa olsun"],
    correctAnswer: 3
  },
  {
    question: "Seninle Barcelona’ya gidersek ne yapardık?",
    options: ["Maça gideriz", "Tüm şehri gezeriz", "Katalan pizzası yeriz", "Her anın tadını çıkarırız"],
    correctAnswer: 3
  },
  {
    question: "Barcelona’da yapılacak en güzel şey nedir?",
    options: [
      "Deniz kenarında seninle yürümek",
      "Tarihi sokaklarda kaybolmak",
      "Senle forma giyip maça gitmek💙",
      "Siesta yapıp güneşlenmek"
    ],
    correctAnswer: 2
  },
  {
    question: "Dicle'yle en çok hangi müziği dinlemeyi seversin?",
    options: [
      "Murat Boz - Özledim",
      "Hakkı Bulut - Ben Buyum",
      "Dicle’yle müzik dinlenmez",
      "Mayın Tarlası"
    ],
    correctAnswer: 2
  },

  {
  question: "Barcelona'da yer alan ünlü sokak caddesi hangisidir?",
  options: [
    "La Rambla",
    "Champs-Élysées",
    "Via del Corso",
    "Oxford Street"
  ],
  correctAnswer: 0
  }
];
