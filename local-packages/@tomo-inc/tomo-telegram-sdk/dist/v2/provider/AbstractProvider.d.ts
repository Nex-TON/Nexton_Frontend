import EventEmitter from 'eventemitter3';
export declare type AbstractAdapterOptions = {
    protocol?: string;
};
export default class AbstractAdapter extends EventEmitter {
    constructor({ protocol }: AbstractAdapterOptions);
    _initializeChannelMessage(): void;
}
