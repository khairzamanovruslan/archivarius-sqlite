import { makeAutoObservable } from 'mobx';

export default class SelectionStore {
    constructor() {
        this._selection = [];
        makeAutoObservable(this);
    }

    setSelection(selection) {
        this._selection = selection;
    }

    get selection() {
        return this._selection;
    }
}