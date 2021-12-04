/*
    The score of a game for a specific day. A game can be played only once in a day.
*/

export interface Score {
    id: string; /* uuidv4 */
    gameId: number;
    score: number; /* the score must always be a number between 0 and 1 */
};