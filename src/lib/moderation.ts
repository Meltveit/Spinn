// English profanity filter
// Focuses on hate speech, explicit sexual terms, and severe insults.

const DENYLIST = [
    // Hate Speech / Racism
    "nigger",
    "nigga",
    "faggot",
    "kike",
    "beaner",
    "wetback",
    "chink",
    "gook",
    "spic",
    "coon",
    "jungle specialist",

    // Explicit / Sexual
    "fuck",
    "cunt",
    "pussy",
    "dick",
    "cock",
    "whore",
    "slut",
    "bitch",
    "rapist",
    "rape",
    "pedophile",
    "pedo",
    "incest",
    "beastiality",
    "cum",
    "jizz",
    "sperm",

    // Severe insults
    "retard",
    "mongoloid",
    "motherfucker",
    "tit",
    "tits"
];

export function checkProfanity(text: string): boolean {
    if (!text) return false;

    const lower = text.toLowerCase();

    // Check for exact matches or words containing the bad terms
    return DENYLIST.some(badWord => {
        return lower.includes(badWord);
    });
}
