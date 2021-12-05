const getLanguage = (cookie:string) => {
    return ['fr', 'en'].includes(cookie) ? cookie : 'fr';
};

const setLanguage = (cookie: string, languageModel: any) => {
    let lang:string = ['fr', 'en'].includes(cookie) ? cookie : 'fr';
    return (languageModel[lang]);
};

export { setLanguage, getLanguage };