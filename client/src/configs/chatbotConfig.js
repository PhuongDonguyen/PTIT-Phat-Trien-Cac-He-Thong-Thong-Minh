
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    initialMessages: [
        createChatBotMessage("Xin chào! Tôi là trợ lý ảo của CSKH. Bạn hãy để lại tin nhắn để được hỗ trợ nhé!"),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#0084FF",
        },
        chatButton: {
            backgroundColor: "#0084FF",
        },
    },
    customComponents: {
        header: () => <div class="react-chatbot-kit-chat-header">Trợ lý ảo CSKH</div>
    },
};

export default config;
