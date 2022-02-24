import { ObjectId } from 'mongoose';

export interface User {
    _id: ObjectId;
    username: string;
    password: string;
    params: {
        strength: number;
        defense: number;
        resilience: number;
        agility: number;
        date: Date;
    };
    warrior: string;
    wins: number;
    loses: number;
    __v?: number;
}
