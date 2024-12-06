class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    handleHello = async (userMessage) => {
        try {
            const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: "khachhang", 
                    message: userMessage,
                }),
            });

            const data = await response.json();

            data.forEach((botMessage) => {
                const message = this.createChatBotMessage(botMessage.text);
                this.setState((prevState) => ({
                    ...prevState,
                    messages: [...prevState.messages, message],
                }));
            });
        } catch (error) {
            console.error("Error communicating with Rasa server:", error);
            const errorMessage = this.createChatBotMessage("Xin lỗi, tôi gặp sự cố khi kết nối với máy chủ.");
            this.setState((prevState) => ({
                ...prevState,
                messages: [...prevState.messages, errorMessage],
            }));
        }
    };
}

export default ActionProvider;
