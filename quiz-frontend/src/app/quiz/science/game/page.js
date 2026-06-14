"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useTheme } from "@/components/ThemeProvider";

export default function ScienceGamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const difficulty = searchParams.get("difficulty") || "easy";
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptingAnswers, setAcceptingAnswers] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [feedbackClass, setFeedbackClass] = useState("");

  const MAX_QUESTIONS = 10;
  const CORRECT_BONUS = 10;
  const CATEGORY_SCIENCE = 17; // Static connection mapping out your layout rule parameter

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    fetch(
      `https://opentdb.com{MAX_QUESTIONS}&category=${CATEGORY_SCIENCE}&difficulty=${difficulty}&type=multiple`,
    )
      .then((res) => res.json())
      .then((loadedData) => {
        const formatted = loadedData.results.map((item) => {
          const formattedQuestion = { question: item.question };
          const answerChoices = [...item.incorrect_answers];
          formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
          answerChoices.splice(
            formattedQuestion.answer - 1,
            0,
            item.correct_answer,
          );

          answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
          });
          return formattedQuestion;
        });

        setQuestions(formatted);
        if (formatted.length > 0) {
          setCurrentQuestion(formatted[0]);
          setQuestionCounter(1);
        }
        setIsLoading(false);
        setAcceptingAnswers(true);
      })
      .catch((err) => console.error("Science API Fetch Error:", err));
  }, [difficulty, user]);

  const moveToNextQuestion = async (updatedScore) => {
    const nextIndex = questionCounter;
    if (nextIndex >= MAX_QUESTIONS || nextIndex >= questions.length) {
      setIsLoading(true);
      localStorage.setItem("mostRecentScore", updatedScore);

      try {
        const token = localStorage.getItem("qwizzy_token");
        await fetch("http://localhost:5000/api/quiz/save-score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            score: updatedScore,
            totalQuestions: MAX_QUESTIONS,
            category: "Science",
            difficulty: difficulty,
          }),
        });
      } catch (err) {
        console.error("Score metrics tracking failed:", err);
      }

      router.push("/quiz/result");
      return;
    }

    setCurrentQuestion(questions[nextIndex]);
    setQuestionCounter(nextIndex + 1);
    setSelectedAnswerIndex(null);
    setFeedbackClass("");
    setAcceptingAnswers(true);
  };

  const handleChoiceClick = (choiceNum) => {
    if (!acceptingAnswers) return;
    setAcceptingAnswers(false);
    setSelectedAnswerIndex(choiceNum);

    const isCorrect = choiceNum === currentQuestion.answer;
    const classToApply = isCorrect ? "correct" : "incorrect";
    setFeedbackClass(classToApply);

    let currentUpdatedScore = score;
    if (isCorrect) {
      currentUpdatedScore = score + CORRECT_BONUS;
      setScore(currentUpdatedScore);
    }

    setTimeout(() => {
      moveToNextQuestion(currentUpdatedScore);
    }, 1200);
  };

  if (loading || isLoading || !currentQuestion) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-body">
        <div
          className="spinner-border text-primary mb-3"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        ></div>
        <h5 className="text-muted fw-semibold">Loading Science Arena...</h5>
      </div>
    );
  }

  const progressPercentage = (questionCounter / MAX_QUESTIONS) * 100;

  return (
    <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="w-100" style={{ maxWidth: "850px" }}>
        <div className="row mb-4 align-items-center w-100">
          <div className="col-6">
            <p className="text-uppercase mb-2 small tracking-wider text-muted fw-bold">
              Question {questionCounter} / {MAX_QUESTIONS}
            </p>
            <div
              className="progress"
              style={{ height: "1.5rem", borderRadius: "50px" }}
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: "#534ad3",
                }}
              ></div>
            </div>
          </div>
          <div className="col-6 text-end">
            <p className="text-uppercase mb-1 small tracking-wider text-muted fw-bold">
              Score
            </p>
            <h1 className="fw-black display-5 m-0" style={{ color: "#534ad3" }}>
              {score}
            </h1>
          </div>
        </div>

        <div className="card border-0 shadow p-4 p-md-5 mb-4 bg-body-tertiary">
          <h2
            className="fw-bold mb-4 h3 lh-base text-body-emphasis"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          ></h2>

          <div className="d-flex flex-column gap-3 w-100">
            {[1, 2, 3, 4].map((num) => {
              const choiceText = currentQuestion["choice" + num];
              if (!choiceText) return null;

              let buttonStyleClass = "choice-container-btn";
              if (selectedAnswerIndex === num)
                buttonStyleClass += ` ${feedbackClass}`;

              return (
                <button
                  key={num}
                  className={`${buttonStyleClass} text-start p-3 border d-flex align-items-center bg-body w-100`}
                  onClick={() => handleChoiceClick(num)}
                  disabled={!acceptingAnswers}
                >
                  <span className="prefix-box me-3 fw-bold">
                    {String.fromCharCode(64 + num)}
                  </span>
                  <span
                    className="choice-text fw-medium text-body"
                    dangerouslySetInnerHTML={{ __html: choiceText }}
                  ></span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .choice-container-btn {
          border-radius: 8px;
          border-color: var(--bs-border-color) !important;
          transition:
            transform 0.2s,
            background-color 0.2s;
        }
        .choice-container-btn:hover:not(:disabled) {
          transform: scale(1.01);
          background-color: rgba(83, 74, 211, 0.05) !important;
          border-color: #534ad3 !important;
        }
        .prefix-box {
          background-color: rgba(83, 74, 211, 0.1);
          color: #534ad3;
          padding: 6px 12px;
          border-radius: 4px;
        }
        .correct {
          background-color: #28a745 !important;
          border-color: #28a745 !important;
        }
        .correct .choice-text,
        .correct .prefix-box {
          color: white !important;
        }
        .incorrect {
          background-color: #dc3545 !important;
          border-color: #dc3545 !important;
        }
        .incorrect .choice-text,
        .incorrect .prefix-box {
          color: white !important;
        }
      `}</style>
    </div>
  );
}
