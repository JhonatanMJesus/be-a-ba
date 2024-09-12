export const game = {
    letters: [],
    word: "",
    error: false,
    streak: 0,
    inputedWords: [],
    newGame: function(){
        this.letters = [];

        const alphabet ='abcdefghijklmnopqrstuvwxyz';
        
        this.letters = new Array(3).fill().map(function(letter) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            return alphabet[randomIndex];
        });

        this.word = '';
        this.error = false;
    },

    validateWord: async function(word) {
        for (let i=0; i<this.letters.length; i++) {
            if (word.includes(this.letters[i]) === false) {
                this.error = true;
                return false;
            }

        }

        if(this.inputedWords.includes(word)) {
            return false;
        }

        const rawData = await fetch(`https://api.dicionario-aberto.net/word/${word}`)
        const data = await rawData.json();

        if (!data.length) {
            return false;
        }

        this.inputedWords.push(word);
        this.streak++;
        return true;
    }
}