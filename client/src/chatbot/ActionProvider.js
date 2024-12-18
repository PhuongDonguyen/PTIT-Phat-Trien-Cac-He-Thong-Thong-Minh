class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    handleHello = async (userMessage) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [
                ...prevState.messages,
                this.createChatBotMessage("Chờ tôi một lát nhé", { withAvatar: true, id: "typing-indicator" }),
            ],
        }));

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

            console.log("Response message:", data);

            // Remove typing indicator
            this.setState((prevState) => ({
                ...prevState,
                messages: prevState.messages.filter((msg) => msg.id !== "typing-indicator"),
            }));

            // Add bot messages with delay
            data.forEach((botMessage, index) => {
                setTimeout(() => {
                    const message = this.createChatBotMessage(botMessage.text, { withAvatar: true });
                    this.setState((prevState) => ({
                        ...prevState,
                        messages: [...prevState.messages, message],
                    }));
                }, index * 2000); // 1-second delay between messages
            });
        } catch (error) {
            console.error("Error communicating with Rasa server:", error);

            // Remove typing indicator
            this.setState((prevState) => ({
                ...prevState,
                messages: prevState.messages.filter((msg) => msg.id !== "typing-indicator"),
            }));

            const errorMessage = this.createChatBotMessage("Xin lỗi, tôi gặp sự cố khi kết nối với máy chủ.");
            this.setState((prevState) => ({
                ...prevState,
                messages: [...prevState.messages, errorMessage],
            }));
        }
    };
}

export default ActionProvider;