export interface HTMLInputEvent extends Event{
    target: HTMLInputEventTarget;
}

export interface HTMLInputEventTarget extends EventTarget{
    value: string;
}