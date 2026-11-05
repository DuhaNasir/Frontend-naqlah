
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { careerPaths } from "../../careers/services/careerCatalog.js";
import { useNaqlah } from "../../../shared/context/NaqlahContext.jsx";

const questions = careerPaths.flatMap((path) => path.questions);

const isAnswered = (value) =>
  Number.isInteger(value) && value >= 0 && value <= 5;

export default function useInterestQuestionnaire() {
  const { state, patch } = useNaqlah();
  const [missing, setMissing] = useState([]);
  const navigate = useNavigate();

  const setAnswer = (id, value) => {
    patch((previous) => ({
      interests: { ...previous.interests, [id]: value },
      interestSubmitted: false,
    }));

    setMissing((previous) =>
      previous.filter((item) => item !== id),
    );
  };

  const submit = () => {
    const ids = questions
      .filter((question) => !isAnswered(state.interests?.[question.id]))
      .map((question) => question.id);

    if (ids.length > 0) {
      setMissing(ids);
      return ids[0];
    }

    setMissing([]);
    patch({ pathMode: "interest", interestSubmitted: true });
    navigate("/careers");

    return null;
  };

  return {
    interests: state.interests ?? {},
    setAnswer,
    submit,
    missing,
    answered: questions.filter((question) =>
      isAnswered(state.interests?.[question.id]),
    ).length,
  };
}
