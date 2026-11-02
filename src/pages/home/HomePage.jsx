import { useEffect } from "react";
import { Avatar, Collapse } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { useNaqlah } from "../../shared/context/NaqlahContext.jsx";
import Button from "../../shared/components/Button.jsx";
import Icon from "../../shared/components/Icon.jsx";
import JourneyPreview from "./components/JourneyPreview.jsx";
import { careerPaths } from "../careers/services/careerCatalog.js";
import { benefits, faqs, steps } from "./services/homeContent.js";

export default function HomePage() {
  const { state } = useNaqlah();
  const [search] = useSearchParams();
  const section = search.get("section");
  useEffect(() => {
    if (!section) return;
    const frame = requestAnimationFrame(() =>
      document
        .getElementById(section)
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
    return () => cancelAnimationFrame(frame);
  }, [section]);
  return (
    <div className="landing-page">
      {state.logged && (
        <div className="home-return">
          <div className="row">
            <Avatar
              src={state.avatar || undefined}
              style={{ background: "#dbeafe", color: "var(--blue)" }}
            >
              {state.name?.[0] || "ن"}
            </Avatar>
            <div>
              <strong>
                أهلًا بعودتك، {state.name?.split(" ")[0] || "طالبنا"}.
              </strong>
              <p className="small">مسارك وإنجازك محفوظان. تابع من حيث توقفت.</p>
            </div>
          </div>
          <Button to="/dashboard" icon="grid">
            الذهاب إلى لوحة التحكم
          </Button>
        </div>
      )}
      <section className="landing-hero landing-wrap" id="home-hero">
        <div className="landing-hero-copy">
          <div className="eyebrow">من دراستك، إلى اتجاه مهني أوضح</div>
          <h1>
            كل مهارة بداية.
            <br />
            <span>وكل بداية، نَقلة.</span>
          </h1>
          <p>
            افهم ما تعرفه، واكتشف ما تحتاجه، واختر مسارك التقني بخطة تعلم تجعل
            خطوتك القادمة أوضح.
          </p>
          <div className="row wrap mt32">
            <Button to={state.logged ? "/dashboard" : "/auth"}>
              {state.logged ? "متابعة رحلتي" : "ابدأ نَقلتك"}
            </Button>
            <Button
              to="/?section=how-it-works"
              variant="secondary"
              icon="chevron"
            >
              كيف تعمل نَقلة؟
            </Button>
          </div>
          <div className="hero-footnote">
            <span>
              <Icon name="check" size={15} />
              لطلاب تخصصات الحاسب
            </span>
            <span>
              <Icon name="check" size={15} />
              من مهاراتك، إلى خطة تناسبك
            </span>
          </div>
        </div>
        <JourneyPreview />
      </section>
      <div className="landing-strip">
        <div className="landing-wrap">
          <span>
            <strong className="ltr">07</strong>مسارات تقنية لاستكشافها
          </span>
          <span>
            <Icon name="target" />
            مؤشرا مهارات واهتمامات مستقلان
          </span>
          <span>
            <Icon name="route" />
            خطة تعلم تتطور معك
          </span>
        </div>
      </div>
      <section
        className="landing-wrap landing-section about-section"
        id="about"
      >
        <div>
          <div className="eyebrow">عن نَقلة</div>
          <h2>
            تعلمت الكثير.
            <br />
            لكن من أين تبدأ مهنيًا؟
          </h2>
          <p className="mt24">
            نَقلة منصة إرشاد مهني لطلاب تخصصات الحاسب في السعودية. تساعدك على
            ربط ما تعلمته بالمسارات التقنية، ورؤية مهاراتك الحالية، وتحديد ما
            تحتاج إلى تعلمه في الاتجاه الذي تختاره.
          </p>
          <p className="mt16">
            هدفنا أن تصبح الخطوة التالية واضحة: مسار تستكشفه، ومهارة تبنيها،
            وعمل تطبيقي تتقدم به.
          </p>
        </div>
        <div className="about-questions">
          {[
            ["ما الذي أعرفه بالفعل؟", "ملف مهارات تراجعه وتؤكده بنفسك."],
            ["ما الذي يحتاجه مساري؟", "مهارات متطابقة وأخرى تعمل على بنائها."],
            ["ما الخطوة التي تلي؟", "خارطة تعلم متدرجة، ثم تطبيق عملي."],
          ].map(([title, description], index) => (
            <div key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="benefits-section" id="benefits">
        <div className="landing-wrap landing-section">
          <div className="landing-section-head">
            <div>
              <div className="eyebrow">لماذا نَقلة؟</div>
              <h2>
                أقل حيرة.
                <br />
                ومساحة أكبر للتقدم.
              </h2>
            </div>
            <p>
              بدل أن تبقى أسئلتك متفرقة، اجمع مهاراتك واختياراتك وخطتك في مكان
              واحد.
            </p>
          </div>
          <div className="benefits-grid">
            {benefits.map(([icon, title, description], index) => (
              <article key={title}>
                <span className="benefit-count ltr">0{index + 1}</span>
                <span
                  className={`float-icon ${index === 1 ? "purple" : index === 3 ? "teal" : ""}`}
                >
                  <Icon name={icon} size={23} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="landing-wrap landing-section" id="paths">
        <div className="landing-section-head">
          <div>
            <div className="eyebrow">أي اتجاه يثير فضولك؟</div>
            <h2>
              مسارات مختلفة.
              <br />
              والقرار يبدأ منك.
            </h2>
          </div>
          <div>
            <p>
              تعرّف على مجالات تقنية تستطيع استكشافها. اختيارك قابل للتغيير،
              وخطتك تتحرك معه.
            </p>
            <div className="mt16">
              <Button to="/careers" variant="secondary" small>
                استعراض جميع المسارات
              </Button>
            </div>
          </div>
        </div>
        <div className="landing-paths">
          {careerPaths.map((career, index) => (
            <Link
              key={career.id}
              to={`/careers/${career.id}`}
              className="landing-path"
            >
              <div className="spread">
                <span
                  className={`float-icon ${index === 1 ? "purple" : index === 2 ? "teal" : ""}`}
                >
                  <Icon name={career.icon} size={21} />
                </span>
                <Icon name="arrow" size={18} />
              </div>
              <h3>{career.name}</h3>
              <span className="career-en">{career.en}</span>
              <p>{career.desc}</p>
              <span className="text-link">
                تعرّف على المسار <Icon name="chevron" size={14} />
              </span>
            </Link>
          ))}
          <article className="landing-path path-invitation">
            <span className="float-icon">
              <Icon name="spark" size={22} />
            </span>
            <h3>لم تحدد مجالك بعد؟</h3>
            <p>أكمل استبيان الاهتمامات بعد التسجيل، وقارن خياراتك بوضوح.</p>
            <Button to={state.logged ? "/careers" : "/auth"} small>
              ابدأ الاستكشاف
            </Button>
          </article>
        </div>
      </section>
      <section className="how-section" id="how-it-works">
        <div className="landing-wrap landing-section">
          <div className="landing-section-head">
            <div>
              <div className="eyebrow">كيف تعمل نَقلة؟</div>
              <h2>
                من «أين أبدأ؟»
                <br />
                إلى خطوة تعرفها.
              </h2>
            </div>
            <p>
              لا تحتاج أن تعرف مسارك مسبقًا. ابدأ بما لديك، وامنح نفسك مساحة
              للاستكشاف.
            </p>
          </div>
          <div className="how-steps">
            {steps.map(([icon, title, description], index) => (
              <article key={title}>
                <div className="how-step-number">
                  <span className="ltr">0{index + 1}</span>
                  <Icon name={icon} size={22} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="how-branch">
            <span className="float-icon purple">
              <Icon name="target" size={23} />
            </span>
            <div>
              <h3>هل تعرف المجال الذي تريده؟</h3>
              <p>
                <strong>نعم:</strong> اختر المسار ثم راجع فجوة مهاراتك.{" "}
                <strong>لا:</strong> أكمل الاستبيان أولًا، ثم قارن المسارات
                بمؤشري المهارات والاهتمامات.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="landing-wrap landing-section faq-section" id="faq">
        <div>
          <div className="eyebrow">أسئلة شائعة</div>
          <h2>
            قبل أن تخطو،
            <br />
            قد تسأل.
          </h2>
          <p className="mt16">إجابات تساعدك على فهم رحلتك في نَقلة.</p>
        </div>
        <Collapse
          className="faq-collapse"
          ghost
          defaultActiveKey={["0"]}
          expandIconPlacement="end"
          items={faqs.map(([label, text], index) => ({
            key: String(index),
            label,
            children: <p>{text}</p>,
          }))}
        />
      </section>
      <section className="landing-wrap landing-final">
        <div>
          <div className="eyebrow">خطوة صغيرة، باتجاه أوضح</div>
          <h2>
            ابدأ بما تعرفه.
            <br />
            وابنِ ما تحتاجه.
          </h2>
          <p>سيرتك، مهاراتك، وفضولك؛ نقطة بداية تكفي.</p>
        </div>
        <div>
          <Button to={state.logged ? "/dashboard" : "/auth"}>
            {state.logged ? "الذهاب إلى لوحة التحكم" : "أنشئ حسابك وابدأ"}
          </Button>
          <p className="small mt16">
            خطة تأسيسية أو مخصصة، حسب مهاراتك المؤكدة.
          </p>
        </div>
      </section>
    </div>
  );
}
