/* eslint-env browser */

/**
 * Configuration object for values shared by multiple components
 */

 const Config = {
    // Default duration for each round
    GAME_TIME_IN_MS: 30000,
    TIME_TO_RESTART: 3000,
    VOWELS: ["a","e","i","o","u"],
    CONSONANTS: ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"],
    MAX_NUMBER_OF_LETTERS: 9,
    MAX_POINTS: 18,
};

Object.freeze(Config);

export default Config;