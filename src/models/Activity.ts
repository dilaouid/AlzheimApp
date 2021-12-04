/*  This interface is about the activities of a specific person.
    Like what is his/her history with the app. It's included as an array
    in the Person model.

    Each entry of this array will be have date, with all the specific games played : an array of History.
    The mood is also specified, for checking up if the person feels happy or not.
*/

import { Score } from './Score';

export interface Activity {
    id: string; /* uuidv4 */
    date: Date; /* Each activity entries must have an unique date attached to it */
    history: Score[];
    score: number; /* A number between 0 and 1, giving the average score of the day */
    mood: number;
};