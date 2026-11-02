import Icon from "./Icon.jsx";
export default function Stepper({ step }) {
  return (
    <nav className="stepper" aria-label="خطوات البداية">
      {["الحساب", "المهارات", "المراجعة", "المسار", "الخطة"].map(
        (label, index) => (
          <div className="step-wrapper" key={label}>
            {index > 0 && <span className="step-line" />}
            <div
              className={`step ${index + 1 === step ? "active" : index + 1 < step ? "done" : ""}`}
              aria-current={index + 1 === step ? "step" : undefined}
            >
              <b>
                {index + 1 < step ? <Icon name="check" size={14} /> : index + 1}
              </b>
              <span>{label}</span>
            </div>
          </div>
        ),
      )}
    </nav>
  );
}
