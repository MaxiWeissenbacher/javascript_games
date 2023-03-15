/* eslint-env */

const SERVER_URL =
    "https://{{lang}}.wiktionary.org/w/api.php?action=query&origin=*&format=json&titles={{word}}",
    AVAILABLE_LANGUAGES = ["en", "mg", "fr", "ru", "sh", "es", "zh", "de", "nl", "sv", "pl", "ku", "lt", "el", "it", "ca", "fi", "hu", "ta", "tr", "ko", "io", "hy", "kn", "pt", "vi", "sr", "ja", "chr", "hi", "th", "ro", "no", "id", "ml", "et", "my", "uz", "li", "cs", "or", "te", "eo", "fa", "ar", "jv", "az", "eu", "gl", "oc", "br", "da", "lo", "uk", "hr", "fj", "ky", "tg", "bg", "simple", "ps", "ur", "sk", "la", "cy", "wa", "vo", "is", "zh-min-nan", "af", "ast", "he", "scn", "tl", "sw", "fy", "pa", "nn", "lv", "bn", "co", "mn", "pnb", "ka", "nds", "sl", "sq", "lb", "bs", "nah", "sa", "kk", "tk", "sm", "mk", "km", "hsb", "be", "ms", "vec", "ga", "an", "wo", "ang", "tt", "mt", "yue", "sd", "gn", "mr", "ie", "so", "gd", "csb", "ug", "st", "roa-rup", "si", "hif", "ia", "mi", "ay", "kl", "fo", "jbo", "ln", "zu", "na", "gu", "gv", "kw", "rw", "ts", "ne", "om", "qu", "su", "ss", "ha", "iu", "am", "dv", "za", "tpi", "ik", "yi", "ti", "sg", "tn", "ks", "as", "mo", "pi", "als", "ab", "sn", "bh", "dz", "tw", "to", "bi", "yo", "bo", "rm", "xh", "aa", "sc", "bm", "ak", "cr", "av", "ch", "rn", "mh"],
    DEFAULT_LANGUAGE = "en";

/*
 * Simple validation client for the Wiktionary API. Tests if an entry exists for a given
 * word. The targeted wiktionary can be set by passing a language code (i.g. "en") to the 
 * constructor or  by using the setLang method (Default language is English). 
 * Available languages are listed here: https://en.wikipedia.org/wiki/List_of_Wiktionaries
 *
 * Usage:
 *
 * - Import default export from this file
 * - Create WiktionaryClient
 * - [optional] Set language
 * - Call assertWordExists and get results from Promise
 *
 * Example:
 *
 * import Client from "Wiktionary.js"; // [Import this file!]
 *
 * let wiktionary = new Client();
 * wiktionary.assertWordExist("computer").then(function(pageID) {
 *  // case: word exists
 * }).catch(function(error) {
 *  // case: word does not exist
 * })
 */

function requestEntry(word, lang, onSuccess, onError) {
    let url = SERVER_URL.replace("{{lang}}", lang.toLowerCase());
    url = url.replace("{{word}}", word.toLowerCase());
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(json) {
        onSuccess(json);
    }).catch(onError);
}

function isValidLanguageCode(code) {
    return AVAILABLE_LANGUAGES.includes(code);
}

class WiktionaryClient {

    /**
     * @param {String} Language code to define which wiktionary should be used
     */
    constructor(lang = DEFAULT_LANGUAGE) {
        this.setLang(lang);
    }

    /**
     * Sets the wiktionary in which words should be searched and throws an Error if
     * a language code is invalid.
     * 
     * @param {String} Language code to define which wiktionary should be used
     */
    setLang(lang = DEFAULT_LANGUAGE) {
        if (isValidLanguageCode(lang)) {
            this.lang = lang;
        } else {
            throw new Error("Invalid language code. Check [https://en.wikipedia.org/wiki/List_of_Wiktionaries] to see available languages.");
        }
    }

    /**
     * Checks if word exists (i.e. a wiktionary entry exists for word) 
     *
     * This functions returns a Promise [1] that resolves to the word's wiktionary ID if it
     * exists or is rejected with an error if the word does not exists or network problems 
     * occured while trying to fetch the word's entry.
     *
     * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
     * 
     * @param  {String} Word to check
     * @return {Promise}
     */
    assertWordExist(word) {
        let self = this,
            entryPromise = new Promise(function(resolve, reject) {
                requestEntry(word, self.lang, function(result) {
                    let firstID = Object.keys(result.query.pages)[0];
                    if (firstID !== "-1") {
                        resolve(firstID);
                    } else {
                        reject(new Error(`No entry found for: ${word}`));
                    }
                }, function(error) {
                    reject(error);
                });
            });
        return entryPromise;
    }
}

export default WiktionaryClient;