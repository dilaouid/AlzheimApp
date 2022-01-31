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
    if (total == 0)
        return 0;
    const score = ((success / total) * 100).toFixed(2);
    return score;
};