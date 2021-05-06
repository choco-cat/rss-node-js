const helper = {
    encodeDecode: function(text, shift, action) {
        switch (action) {
            case "encode" :
                return transform(text, shift);
                break;
            case "decode" :
                return transform(text, -shift);
                break;
            default:
                //error
                break;
        }
    },
};

const transform = (text, shift) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const letterArr = letters.split("");
    const textArr = text.trim().split("");
    const encodeTextArr = textArr.map((letter) => {
        let encodeLetter = letter;
        const isUppercase = (letter === letter.toUpperCase()) ? true : false;
        if (letterArr.indexOf(letter.toLocaleLowerCase()) !== -1) {
            let index = (letterArr.indexOf(letter.toLocaleLowerCase()) + shift) % letterArr.length;
            index = (index < 0) ? index + letterArr.length : index;
            encodeLetter = isUppercase ? letterArr[index].toLocaleUpperCase() : letterArr[index];
        }
        return encodeLetter;
    });
    return encodeTextArr.join('');
}

module.exports = helper;
