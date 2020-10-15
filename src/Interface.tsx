import React from "react";

export interface Episodes {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    type: string;
    airdate: string;
    airtime: string;
    airstamp: string;
    runtime: number;
    image: {
        medium: string;
        original: string;
    };
    summary: string;
    _links: {
        self: {
            href: string;
        };
    };
}

export interface IState {
    episodes: Array<Episodes>;
    favorites: Array<any>;
}

export interface IAction {
    type: string;
    payload: any;
}
