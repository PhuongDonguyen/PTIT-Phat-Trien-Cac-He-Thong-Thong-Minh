
class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        this.actionProvider.handleHello(message);
    }
}

export default MessageParser;
