import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import ChatBot from "react-chatbot-kit";
import ActionProvider from './chatbot/ActionProvider';
import MessageParser from './chatbot/MessageParser';
import config from './configs/chatbotConfig';
import 'react-chatbot-kit/build/main.css';
/* Routes */
/* Basic components */
import Navbar from './components/Navbar';
import Footer from './components/Footer';
/* Page components */
import Home from './pages/Home';
import { useState } from 'react';
import ProductDetail from './pages/ProductDetail';
import ProductCategory from './pages/ProductCategory';
import AllProducts from './pages/AllProducts';

/* ====== Layout ====== */
const Layout = () => {
  const [showChatBot, setShowChatBot] = useState(false);

  const toggleChatBot = () => {
    setShowChatBot((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <Outlet />
      <div className="chatbot-container">
        {/* ChatBot is always in the DOM */}
        <div className={`chatbot ${showChatBot ? 'visible' : 'hidden'}`}>
          <ChatBot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
            placeholderText='Hãy nhập tin nhắn của bạn'
          />
        </div>
        <button className="chatbot-toggle" onClick={toggleChatBot}>
          <i className="bi bi-robot"></i>
        </button>
      </div>
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/san-pham",
        element: <AllProducts />
      },
      {
        path: "/:motorcycleTypeId",
        element: <ProductCategory />
      },
      {
        path: "/:motorcycleTypeId/:productCode",
        element: <ProductDetail />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
