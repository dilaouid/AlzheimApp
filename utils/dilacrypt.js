export const encrypt = (string, key) => {
    if (!key || !string) return (false)
    let encryptedString = '';
    let j = 0;
    for (let i = 0; i < string.length; i++) {
        if (key.length === j) j = 0;
        encryptedString += String.fromCharCode( string.charCodeAt(i) - key.charCodeAt(j) - key.length );
    }
    return (encryptedString);
};

export const decrypt = (string, key) => {
    if (!key || !string) return (false)
    let decryptedString = '';
    let j = 0;
    for (let i = 0; i < string.length; i++) {
        if (key.length === j) j = 0;
        decryptedString += String.fromCharCode( string.charCodeAt(i) + key.charCodeAt(j) + key.length );
    }
    return (decryptedString);
};