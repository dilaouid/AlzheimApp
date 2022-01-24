export function ScoreRatio (scoreArray) {
    const scoreMap = [];
    scoreArray.map( (el, i) => {
        scoreMap.push((el.success / (el.success + el.failed)));
    });
};

// 14 victories
// 9 fails