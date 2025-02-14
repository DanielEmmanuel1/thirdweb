import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, useConnectedWallets } from "thirdweb/react";
import ForwardButton from "../assets/images/ForwardButton.png";
import BackButton from "../assets/images/GoBack.png";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "ac5301b4a9f0d66408525061d8dd3145",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
  createWallet("app.phantom"),
];

const questions = [
  {
    id: 1,
    question: "Do you support the new company policy?",
    answers: ["Yes", "No"],
  },
  {
    id: 2,
    question: "Are you satisfied with the current work environment?",
    answers: ["Yes", "No"],
  },
  {
    id: 3,
    question: "Would you recommend our services to others?",
    answers: ["Yes", "No"],
  },
  {
    id: 4,
    question: "Do you feel valued at work?",
    answers: ["Yes", "No"],
  },
  {
    id: 5,
    question: "Is the management responsive to your concerns?",
    answers: ["Yes", "No"],
  },
];

const Content = () => {
  const connectedWallets = useConnectedWallets();
  const [votes, setVotes] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleVote = (questionId, answer) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col text-center h-[70vh] mb-[2%] mt-[2%]">
      <div className="flex justify-between px-32 border mx-32 h-[90%] items-center">
        <div className="">
          <img className="mx-auto" src={Logo} alt="logo" width={80} />
          <p className="text-white">Vote using Thirdweb integrated tool</p>
          {connectedWallets.length > 0 ? (
            <>
              <div className="text-white mt-4">
                <p>{currentQuestion.question}</p>
                {currentQuestion.answers.map((answer) => (
                  <label key={answer} className="block m-2">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={answer}
                      checked={votes[currentQuestion.id] === answer}
                      onChange={() => handleVote(currentQuestion.id, answer)}
                      className="mr-2"
                    />
                    {answer}
                  </label>
                ))}
              </div>
              <div className="flex gap-6 mt-8 mr-20">
                <img
                  width={70}
                  src={BackButton}
                  alt="Back Button"
                  onClick={handlePreviousQuestion}
                  className="cursor-pointer"
                />
                <img
                  width={70}
                  src={ForwardButton}
                  alt="Forward Button"
                  onClick={handleNextQuestion}
                  className="cursor-pointer"
                />
              </div>
              <div className="text-white mt-8">
                <p>Your Total Vote is:</p>
                <p>
                  Yes(
                  {Object.values(votes).filter((vote) => vote === "Yes").length}
                  )
                </p>
                <p>
                  No(
                  {Object.values(votes).filter((vote) => vote === "No").length})
                </p>
              </div>
            </>
          ) : (
            <div className="text-white mt-4">
              <p>Please connect your wallet to view and answer questions.</p>
            </div>
          )}
        </div>
        <div className="border rounded-lg border-slate-600 w-[50%] h-[70%] bg-[#222831] leading-10 py-6">
          <p className="text-white text-4xl text-center">Connect your wallet</p>
          <p className="text-white text-center">Vote for proposals</p>
          <div className="flex justify-center my-8">
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={"dark"}
              connectModal={{ size: "wide" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;