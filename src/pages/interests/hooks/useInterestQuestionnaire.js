import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { careerPaths } from "../../careers/services/careerCatalog.js";
import { questionnaireComplete } from "../../careers/services/careerMatching.js";
import { useNaqlah } from "../../../shared/context/NaqlahContext.jsx";

export default function useInterestQuestionnaire() {
  const { state, patch } = useNaqlah();
  const [missing, setMissing] = useState([]);
  const navigate = useNavigate();
  const setAnswer = (id, value) => {
    patch((previous) => ({
      interests: { ...previous.interests, [id]: value },
      interestSubmitted: false,
    }));
    setMissing((previous) => previous.filter((item) => item !== id));
  };
  const submit = () => {
    if (!questionnaireComplete(state.interests)) {
      const ids = careerPaths
        .filter((path) => !Number.isInteger(state.interests[path.id]))
        .map((path) => path.id);
      setMissing(ids);
      return ids[0];
    }
    patch({ pathMode: "interest", interestSubmitted: true });
    navigate("/careers");
    return null;
  };
  return {
    interests: state.interests,
    setAnswer,
    submit,
    missing,
    answered: careerPaths.filter((path) =>
      Number.isInteger(state.interests[path.id]),
    ).length,
  };
}
