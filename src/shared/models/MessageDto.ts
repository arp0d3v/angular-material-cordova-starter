
export class MessageDto {
    constructor(
        public Message: any,
        public ActionTitle?: string,
        public Duration?: number,
        public Type?: number,
        public CssClass?: string,
    ) { }
}
