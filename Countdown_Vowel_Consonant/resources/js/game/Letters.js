/* eslint-env browser */

import Config from "../utils/Config.js";

var vowel,
    consonant,
    usedLetters = [];

    function getConsonant(){
        let consonantNumber = Math.floor(Math.random() * Config.CONSONANTS.length);
        consonant = Config.CONSONANTS[consonantNumber];
        usedLetters.push(consonant);
        return consonant;
    }
    
    function getVowel(){
        let vowelNumber = Math.floor(Math.random() * Config.VOWELS.length);
        vowel = Config.VOWELS[vowelNumber];
        usedLetters.push(vowel);
        return vowel;
    }

    class Letters{
        
    static setConsonant(){
        let el = document.getElementsByClassName("letter")[usedLetters.length];
        if(usedLetters.length < Config.MAX_NUMBER_OF_LETTERS){
            getConsonant();
            el.textContent = consonant;
            el.classList.remove("empty");   
        }
        else{
            console.log("max number of Letters reached");
        }

    }
    
    static setVowel(){
        let el = document.getElementsByClassName("letter")[usedLetters.length];
        if(usedLetters.length < Config.MAX_NUMBER_OF_LETTERS){
            getVowel();
            el.textContent = vowel;
            el.classList.remove("empty");
        }
        else{
            console.log("max number of Letters reached");
        }

    }
    
    static getUsedLetters(){
        return usedLetters;
    }
}

export default Letters;