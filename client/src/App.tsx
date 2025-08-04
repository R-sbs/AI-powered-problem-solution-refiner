import { ConfigProvider } from "antd";
import "./App.css";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="w-full flex flex-col items-center text-center px-4 py-8 max-w-4xl mx-auto">
        <a
          href="https://predictgrowth.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/pg.png"
            alt="PredictGrowth Logo"
            className="w-20 h-20 mb-4"
          />
        </a>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          AI-Powered Problem–Solution Refiner
        </h1>
        <p className="text-gray-500 text-sm max-w-2xl">
          This app helps you improve how you describe a problem and its solution
          — whether you're building a startup, pitching an idea, or working on a
          project. Simply write your statements, choose a point of view
          (Investor, Customer, or Market), and the AI will refine your writing.
          Perfect for founders, students, freelancers — anyone who wants to
          explain their ideas more clearly.
        </p>
      </header>

      {/* Main */}
      <main className="flex-grow flex justify-center px-4 py-8">
        <div className="w-full max-w-xl">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "rgb(55 46 229)",
              },
            }}
          >
            <Outlet />
          </ConfigProvider>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black p-3 text-white text-sm flex justify-between items-center">
        <a
          href="https://github.com/R-sbs/AI-powered-problem-solution-refiner"
          className="hover:underline"
        >
          See On Github
        </a>
        <p className="text-sm cursor-none">
          Predict Growth AI{" "}
          <span className="px-4">{new Date().getFullYear()}</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
