import natural from "natural";
import { prisma } from "./lib/prisma";

// const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

export async function ml() {
  console.time("fetchProducts");
  const products = await prisma.product.findMany({
    select: {
      title: true,

      disc: {
        select: {
          name: true,
        },
      },
    },

    // take: 100,
  });
  console.timeEnd("fetchProducts");

  // return products;

  console.time("tokenize");
  const filters = [
    " - Krokhol Disc Golf Shop",
    " - GuruDiscGolf.no",
    " - Aceshop",
    " - Frisbeesor.no",
    " | Spinnvill",
    " fra Innova Discs",
    "Paul McBeth",
    "Tour Series",
    "Kevin Jones",
    "Gregg Barsby",
    "Jessica Weese",
    "Paige Pierce",
    "Missy Gannon",
    "Ohn Scoggins",
    "Hailey King",
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
    "-",
    " - discshopen.no",
    "[",
    "]",
    "crystal",
    "Team Fundraiser",
    "Zackeriath Johnson",
  ].map((filter) => filter.toLowerCase());

  const data = products.map((product) => {
    let title = product.title.toLowerCase();

    filters.forEach((filter) => {
      title = title.replace(filter, "");
    });

    const input = title.trim();
    const output = product.disc?.name.toLowerCase() || "not-a-disc";

    return [input, output];
  });
  console.timeEnd("tokenize");

  const LEN = Math.floor(data.length * 0.99);

  const trainData = data.slice(0, LEN);
  const testData = data.slice(LEN, data.length);

  console.time("train");
  trainData.forEach(([input, output]) => {
    classifier.addDocument(input, output);
  });

  classifier.train();
  console.timeEnd("train");

  let correctGuesses = 0;

  testData.forEach(([input, correct]) => {
    const guess = classifier.classify(input);

    if (guess === correct) {
      correctGuesses++;
    } else {
      console.log("WRONG", { guess, correct, input });
    }
  });

  console.log(`#### ${correctGuesses} / ${testData.length} correct ####`);

  return products;
}
