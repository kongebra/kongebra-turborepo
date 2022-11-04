// this needs to be updated when prisma updates!
export type Disc = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  speed: number;
  glide: number;
  turn: number;
  fade: number;
  brandId: number;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  slug: string;
  views: number;
  outOfProduction: boolean;
};

type FindManyFn = (haystack: string[]) => Promise<Disc[]>;

export const findDiscMatch = async (title: string, findMany: FindManyFn) => {
  const filters = [
    " - Krokhol Disc Golf Shop",
    " - GuruDiscGolf.no",
    "gurudiscgolf.no",
    " - Aceshop",
    "aceshop",
    " - Frisbeesor.no",
    " | Spinnvill",
    " - discshopen.no",
    " fra Innova Discs",
    " fra Dynamic Discs",
    "Paul McBeth",
    "Tour Series",
    "Kevin Jones",
    "Gregg Barsby",
    "Jessica Weese",
    "Paige Pierce",
    "Missy Gannon",
    "Ohn Scoggins",
    "Hailey King",
    "Haley King",
    "Ricky Wysocki",
    "McBeth",
    "Emerson Keith",
    "Eagle McMahon",
    "Lykke Lorentzen",
    "Signature Series",
    "Ledgestone",
    "Gannon Buhr",
    "Adam Hammes",
    "Scott Stokely",
    "Paul Ulibarri",
    "Ben Callaway",
    "Chandler Fry",
    "Christine Jennings",
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "Tim Barham",
    "Van Dyken",
    "Little My Family",
    "Lauri Lehtinen",
    "Halloween",
    "Andrew Presnell",
    "Simon Lizotte",
    "Innova Discs",
    "Nate Saxton",
    "Big Jerm",
    "Christmas Special",
    "Catrina Allen",
    "crystal",
    "Team Fundraiser",
    "Zackeriath Johnson",
    "Tim Barham",
    "Cale Leiviska",
    "Elaine King",
    "Dragon Line", // TODO: Do something else for this
    "[Ethereal Nebula]",
    "Eagle Stamp",
    "Dark Maul",
    "Shadow Titan",
    "Imperial Eagle",
    "Nordic Phenom",
    "Niklas Anttila",
    "Colten Montgomery",
    "Kalvin Klein",
    "Nathan Queen",
    "James Proctor",
    "Philo Brathwaite",
    "signature",
    "X5 WC",
    "Marvel Captain America",
    "ekstra god glide",
    "Raptor Eye",

    // duplicates, need to be bottom
    "Stamp",
  ].map((filter) => filter.toLowerCase());

  const specialRules: [string, string][] = [
    // needs to be first
    ["reko x-out", "reko"],

    ["[", " "],
    ["]", " "],
    ["(", " "],
    [")", " "],
    ["-", " "],
    [",", " "],

    // discraft
    ["banger gt", "banger-gt"],
    ["ringer gt", "ringer-gt"],
    ["avenger ss", "avenger-ss"],
    ["crank ss", "crank-ss"],
    ["surge ss", "surge-ss"],
    ["buzzz ss", "buzzz-ss"],
    ["buzzz gt", "buzzz-gt"],
    ["buzzz os", "buzzz-os"],
    ["nuke ss", "nuke-ss"],
    ["nuke os", "nuke-os"],
    ["challenger ss", "challenger-ss"],
    ["challenger os", "challenger-os"],
    ["captain's raptor", "captains-raptor"],

    // prodigy
    ["h1v2", "h1-v2"],
    ["h2v2", "h2-v2"],
    ["h3v2", "h3-v2"],
    ["h4v2", "h4-v2"],
    ["h1 v2", "h1-v2"],
    ["h2 v2", "h2-v2"],
    ["h3 v2", "h3-v2"],
    ["h4 v2", "h4-v2"],
    ["p model s", "p-model-s"],
    ["p model us", "p-model-us"],
    ["p model os", "p-model-os"],
    ["m model s", "m-model-s"],
    ["m model us", "m-model-us"],
    ["m model os", "m-model-os"],
    ["f model s", "f-model-s"],
    ["f model os", "f-model-os"],
    ["f model us", "f-model-us"],
    ["d model s", "d-model-s"],
    ["d model us", "d-model-us"],
    ["d model os", "d-model-os"],
    ["d2 max", "d2-max"],
    ["d2 pro", "d2-pro"],
    ["d2pro", "d2-pro"],
    ["d3 max", "d3-max"],
    ["fx2", "fx-2"],
    ["fx3", "fx-3"],
    ["fx4", "fx-4"],
    ["mx3", "mx-3"],
    ["pa1", "pa-1"],
    ["pa2", "pa-2"],
    ["pa3", "pa-3"],
    ["pa4", "pa-4"],
    ["pa5", "pa-5"],
    ["px3", "px-3"],
    ["fx 2", "fx-2"],
    ["fx 3", "fx-3"],
    ["fx 4", "fx-4"],
    ["mx 3", "mx-3"],
    ["pa 1", "pa-1"],
    ["pa 2", "pa-2"],
    ["pa 3", "pa-3"],
    ["pa 4", "pa-4"],
    ["pa 5", "pa-5"],
    ["px 3", "px-3"],

    // discmania
    ["cloudbreaker", "dd3"],
    ["cloud breaker", "dd3"],
    ["cloud-breaker", "dd3"],
    ["sea serpent", "sea-serpent"],
    ["sun crow", "sun-crow"],

    // dynamic discs
    ["sockibomb slammer", "sockibomb-slammer"],

    // innova
    ["aviar x3", "aviarx3"],
    ["rhyno x", "rhyno-x"],
    ["beast x", "beast-x"],
    ["aviar x", "aviar-x"],
    ["roc 3", "roc3"],
    ["dark rebel", "dark-rebel"],
    ["phantom sword", "phantom-sword"],
    ["mid disc3", "mid-disc3"],
    ["power disc2", "power-disc2"],
    ["power disc 2", "power-disc2"],
    ["destroyer raptor", "destroyer"],
    ["thundervant", "thunderbird"],
    ["firebid", "firebird"],
    ["mako 3", "mako3"],
    ["roc 3", "roc3"],

    // kastaplast
    ["st�l", "stål"],
    ["j�rn", "järn"],
    ["jârn", "järn"],
    ["g�te", "göte"],
    ["gøte", "göte"],
    ["gôte", "göte"],
    ["reko x", "reko-x"],
    ["grym x", "grym-x"],
    ["kaxe z", "kaxe-z"],
    ["rask z version", "rask-z-version"],

    // latitude 64
    ["ballista pro", "ballista-pro"],
    ["river pro", "river-pro"],
    ["saint pro", "saint-pro"],

    // westside discs
    // TODO: What to do with these stores that just call it "swan"?
    ["swan 1", "swan-1"],
    ["swan 2", "swan-2"],
    ["swan1", "swan-1"],
    ["swan2", "swan-2"],
    ["war horse", "war-horse"],

    // gateway?
    ["silent cruiser", "silent-cruiser"],
    ["diamond slayer", "slayer"],
    ["slayer diamond", "slayer"],
    ["diamond spear", "spear"],
    ["diamond spirit", "spirit"],
    ["spirit diamond", "spirit"],
    ["magic diamond", "magic"],
    ["wizard pure white", "wizard"],
    ["warrior diamond", "warrior"],

    // guru
    ["flow motion", "flow-motion"],
    ["mad mission", "mad-mission"],
    ["night trooper", "night-trooper"],
    ["short slacker", "short-slacker"],

    ["code x", "code-x"],

    ["orion ls", "orion-ls"],
  ];

  // mest mulig riktig ting her, slipper db kall da
  const redFlags = [
    "sekk",
    "backpack",
    "mini berg",
    "berg mini",
    "mini reko",
    "Reko Mini",
    "core bag",
    "rain cover",
    "towel",
    "flexfit",
    "bag",
    "regntrekk",
    "starter",
    "markør",
    "skolepakke",
    "caps",
    "paraply",
    "traveler target",
    "gloves",
    "world peace mini",
    "opto set",
    "Latitude 64 Core",
    "Umbrella",
    "Mini Marker",
    "veggskilt",
    "patch",
    "håndkle",
    "Hundefrisbee",
    "t-shirt",
    "mikrofiber",
    "Polo",
    "Throw and Catch Disc",
    "nano",
    "macro",
    "T-skjorte",
    "Nybegynnersett",
    "flashlight",
    "basket",
    "snapback",
    "water bottle",
    "Disc Golf Set",
    "Hydrogen Mini",
    "BIRDIE CARD",
    "hoodie",
    "genser",
    "Putterpakke",
    "grip eq",
    "mini tesla",
    "tesla mini",
    "grip6",
    "Disc Gator",
    "Metal Mini",
    "Sack",
    "Mercy Mini",
    " cap ",
    "ultra star",
    "Vinyls",
    "MINI World",
    "DyeMax",
    "Footbag",
  ].map((flag) => flag.toLowerCase());

  let filteredTitle = title.toLowerCase();

  for (const redFlag of redFlags) {
    if (filteredTitle.includes(redFlag)) {
      return [];
    }
  }

  // 1st: apply special rules
  specialRules.forEach(([find, replace]) => {
    filteredTitle = filteredTitle.replace(find, replace);
  });

  // 2nd: cleaning filters
  filters.forEach((filter) => {
    filteredTitle = filteredTitle.replace(filter, "");
  });

  const superSpecialRules: [string, string][] = [
    ["captains raptor", "captains-raptor"],

    ["slammer", "sockibomb slammer"],

    ["aviar x", "aviar-x"],
    ["beast x", "beast-x"],
    ["rhynox", "rhyno-x"],
    ["xd", "xd+"],

    ["rask z version", "rask z-version"],

    ["pa 1", "pa-1"],
    ["pa 2", "pa-2"],
    ["pa 3", "pa-3"],
    ["pa 4", "pa-4"],
    ["pa 5", "pa-5"],
    ["px 3", "px-3"],
    ["fx 2", "fx-2"],
    ["fx 3", "fx-3"],
    ["fx 4", "fx-4"],
    ["mx 3", "mx-3"],
  ];

  const haystack = filteredTitle
    // split on space
    .split(" ")
    // replace "-" with " "
    .map((word) => word.replaceAll("-", " ").trim())
    // remove any empty string
    .filter((word) => word);

  // 3rd: super special rules
  superSpecialRules.forEach(([find, replace]) => {
    const index = haystack.findIndex((word) => word === find.toLowerCase());
    if (index !== -1) {
      haystack[index] = replace;
    }
  });

  const discs = await findMany(haystack);

  if (discs.length > 1) {
    const discNames = discs.map((disc) => disc.name.toLowerCase());

    function shouldNotCoExists(name: string) {
      if (discNames.length > 1 && discNames.includes(name)) {
        // cosmic is a plastic axiom/mvp
        const index = discNames.findIndex((x) => x === name);

        discs.splice(index, 1);
      }
    }

    shouldNotCoExists("aurora");
    shouldNotCoExists("cosmic");
    shouldNotCoExists("world");
    shouldNotCoExists("birdie");
    shouldNotCoExists("halo");
    shouldNotCoExists("barbarian");
    shouldNotCoExists("force");
    shouldNotCoExists("warrior");
    shouldNotCoExists("reaper");
    shouldNotCoExists("nebula");
    shouldNotCoExists("cobra");
    shouldNotCoExists("wasp"); // ?? denne må testes litt mer
  }

  //   if (discs.length > 1 || discs.length === 0) {
  //     console.log(haystack);
  //   }

  return discs;
};
