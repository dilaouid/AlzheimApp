const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

export const generateRandomPair = (length) => {
    const colors = [
        '#791414',
        '#143479',
        '#791462',
        '#147920',
        '#797714',
        '#14AB9D'
    ];
    const icons = [
        'airplane',
        'boat',
        'bulb',
        'color-palette',
        'earth',
        'gift',
        'happy',
        'heart-circle',
        'restaurant',
        'ribbon'
    ]
    var arr = [];
    for (let i = 0; i < length / 2; i++) {
        var indexColor = Math.floor(Math.random() * colors.length);
        var indexIcon = Math.floor(Math.random() * icons.length);
        arr.push({ color: colors[indexColor], icon: icons[indexIcon] }, { color: colors[indexColor], icon: icons[indexIcon] });
        colors.splice(indexColor, 1);
        icons.splice(indexIcon, 1);
    }
    arr = shuffle(arr);
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        el.idx = i
    }

    return (arr);
};