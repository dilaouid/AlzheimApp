/*  The model of the tracked person with the Alzeihmer disease. 
    Each individual would have his/her Person model attached to.
 */

import { Activity } from './Activity';

export interface PersonGroup {
    persons: Person[]
};

export interface Person {
    id: string; /* uuidv4 */
    name: string; /* the name of the person */
    picture: number; /* the picture ID */
    activity: Activity[];
};