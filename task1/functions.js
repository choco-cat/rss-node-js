const helper = {
    encode: function(text, shift) {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        const letterArr = letters.split("");
        const textArr = text.trim().split("");
        const encodeTextArr = textArr.map((letter) => {
            let index = (letterArr.indexOf(letter) + shift) % letterArr.length;
            index = (index < 0) ? index + letterArr.length : index;
            return letterArr[index];
        });
        return encodeTextArr.join('');
    }
};

module.exports = helper;

/*
const encodeText = (text, shift) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const letterArr = letters.split("");
    const textArr = text.trim().split("");
    const encodeTextArr = textArr.map((letter) => {
        let index = (letterArr.indexOf(letter) + shift) % letterArr.length;
        index = (index < 0) ? index + letterArr.length : index;
        return letterArr[index];
    });
    return encodeTextArr.join('');
} */
