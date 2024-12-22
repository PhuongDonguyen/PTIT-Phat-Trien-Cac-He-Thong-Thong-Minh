import React from 'react';
import parse from 'html-react-parser';

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

            // Remove typing indicator
            this.setState((prevState) => ({
                ...prevState,
                messages: prevState.messages.filter((msg) => msg.id !== "typing-indicator"),
            }));

            // Add bot messages with HTML parsing
            data.forEach((botMessage, index) => {
                setTimeout(() => {
                    const parsedHTML = parse(botMessage.text); // parse HTML from the bot
                    const message = this.createChatBotMessage("", {
                        withAvatar: true,
                        widget: "customHTML",
                    });
                    message.message = parsedHTML;
                    this.setState((prevState) => ({
                        ...prevState,
                        messages: [...prevState.messages, message],
                    }));
                }, index * 2000);
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
