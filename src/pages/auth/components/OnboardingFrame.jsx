import Badge from "../../../shared/components/Badge.jsx";
import Stepper from "../../../shared/components/Stepper.jsx";
import Icon from "../../../shared/components/Icon.jsx";
export default function OnboardingFrame({ step, title, subtitle, children }) {
  return (
    <div className="onboard">
      <div className="onboard-top">
        <span className="prototype-pill">
          <Icon name="spark" size={14} />
          بداية تناسبك
        </span>
        <Badge color="blue">الخطوة {step} من 5</Badge>
      </div>
      <Stepper step={step} />
      <div className="onboard-heading">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
