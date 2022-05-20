import { Subject } from 'rxjs';

const subject = new Subject();

export const messageService = {
    onGlobalSearch: message => subject.next({ text: message }),
    clearGlobalSearch: () => subject.next(),
    onMessage: () => subject.asObservable()
}