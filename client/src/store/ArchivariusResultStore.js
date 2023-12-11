import {makeAutoObservable} from 'mobx';

export default class ArchivariusResultStore {
    constructor(){
        this._wordResult = [];
        this._pathResult = [];
        this._eventDataResult = {};
        makeAutoObservable(this);
    }

    setWordResult(wordResult){
        this._wordResult = wordResult;
    }
    setPathResult(pathResult){
        this._pathResult = pathResult;
    }
    setEventDataResult(eventDataResult){
        this._eventDataResult = eventDataResult;
    }

    get wordResult (){
        return this._wordResult;
    }
    get pathResult (){
        return this._pathResult;
    }
    get eventDataResult (){
        return this._eventDataResult;
    }
}