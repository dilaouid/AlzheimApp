const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

export const generateRandomPair = (length) => {
    const colorsTmp = [
        '#791414',
        '#143479',
        '#791462',
        '#147920',
        '#797714',
        '#14AB9D'
    ];
    var arr = [];
    for (let i = 0; i < length / 2; i++) {
        var index = Math.floor(Math.random() * colorsTmp.length);
        arr.push({ color: colorsTmp[index], icon: null }, { color: colorsTmp[index], icon: null });
        colorsTmp.splice(index, 1);
    }
    arr = shuffle(arr);
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        el.idx = i
    }

    return (arr);
};