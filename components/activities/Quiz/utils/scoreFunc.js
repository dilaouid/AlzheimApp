export function ScoreRatio (content, personId) {
    var success = 0;
    var fail = 0;
    content.map( (el, i) => {
        const score = el.score.filter( (el) => el.personId == personId );
        score.map( (el, i) => {
            success += parseInt(el.success);
            fail += parseInt(el.failed);
        });
    });
    const total = success + fail;
    return (success / (total));
};