export class Key {
    key: string = '';
    url: string = '';

    constructor(params:any) {
        this.key = params['key'];
        this.url = params['url'];
    }
}