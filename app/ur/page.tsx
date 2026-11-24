import Link from "next/link";
import type { Metadata } from "next";
import { StampHero } from "@/components/stamp-hero";
import { SiteHeader } from "@/components/site-header";
import { QuestionList, type QuestionItem } from "@/components/marketing";
import { PublicFooter } from "@/components/public-site";
import { StructuredData } from "@/components/structured-data";
import { PLANS } from "@/lib/plans";
import {
  buildGraphJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  publicMetadata,
} from "@/lib/seo";
import "../home-ajrak.css";
import "./urdu.css";

const title = "اردو کیپشن اور ٹرانسکرپٹ | UrduSpeech";
const description =
  "اپنی اردو آڈیو یا ویڈیو اپ لوڈ کریں اور نستعلیق، رومن اردو، انگریزی یا دو لسانی کیپشن حاصل کریں۔ TXT، SRT، VTT یا MP4 میں ایکسپورٹ کریں۔";

export const metadata: Metadata = publicMetadata({
  title,
  absoluteTitle: title,
  description,
  path: "/ur",
  ogImage: "default",
  locale: "ur_PK",
});

const proof = [
  { value: "4 انداز", label: "اردو نستعلیق، رومن اردو، انگریزی، دو لسانی" },
  { value: "4 فائلیں", label: "TXT، SRT، VTT اور کیپشن والی MP4" },
  { value: "10 منٹ مفت", label: "ایک بار، کارڈ کی ضرورت نہیں" },
  { value: "روپے میں قیمت", label: "پاکستانی کریئیٹرز کے لیے مقامی پلان" },
];

const features = [
  {
    title: "اصل نستعلیق، سادہ فونٹ نہیں",
    text: "اردو کیپشن Noto Nastaliq Urdu میں بنتے ہیں، اس لیے ہر لفظ اسکرین پر صاف اور خوبصورت دکھائی دیتا ہے۔",
  },
  {
    title: "ایک ریکارڈنگ، چار انداز",
    text: "اپنے ناظرین کے مطابق اردو، رومن اردو، انگریزی ترجمہ یا اردو اور انگریزی ایک ساتھ چنیں۔",
  },
  {
    title: "نام اور وقت خود درست کریں",
    text: "ایکسپورٹ سے پہلے نام، نمبر اور الفاظ ٹھیک کریں، اور ہر کیپشن کے آنے اور جانے کا وقت آگے پیچھے کریں۔",
  },
  {
    title: "ویڈیو پر کیپشن تیار",
    text: "صاف، نمایاں یا باکس والے انداز میں کیپشن کے ساتھ MP4 بنائیں، یا SRT اور VTT اپنے ایڈیٹر میں لے جائیں۔",
  },
  {
    title: "آپ کی ریکارڈنگ محفوظ",
    text: "فائلیں آپ کے پلان کی مدت کے بعد خود ختم ہو جاتی ہیں، کسی ماڈل کی تربیت میں استعمال نہیں ہوتیں، اور آپ جب چاہیں حذف کر سکتے ہیں۔",
  },
  {
    title: "قیمت پاکستانی روپوں میں",
    text: "کارڈ کے علاوہ بینک ٹرانسفر، JazzCash، Easypaisa، SadaPay اور NayaPay سے بھی ادائیگی ممکن ہے۔",
  },
];

const steps = [
  {
    title: "ریکارڈنگ اپ لوڈ کریں",
    text: "اردو بولی گئی آڈیو یا ویڈیو فائل شامل کریں۔",
  },
  {
    title: "ڈرافٹ دیکھیں اور درست کریں",
    text: "الفاظ اور نام ٹھیک کریں، اور کیپشن کا وقت سیٹ کریں۔",
  },
  {
    title: "ایکسپورٹ کریں",
    text: "ٹرانسکرپٹ، سب ٹائٹل فائل یا کیپشن والی ویڈیو ڈاؤن لوڈ کریں۔",
  },
];

const planNames: Record<string, string> = {
  free: "مفت",
  starter: "اسٹارٹر",
  creator: "کریئیٹر",
  studio: "اسٹوڈیو",
};

const questions: readonly QuestionItem[] = [
  {
    question: "کیا یہ خودکار AI ٹول ہے یا انسان ٹرانسکرپشن کرتے ہیں؟",
    answer: (
      <p>
        UrduSpeech مکمل طور پر خودکار AI اسٹوڈیو ہے جسے MoonSys Ltd چلاتی ہے۔
        ڈرافٹ AI بناتا ہے، پھر آپ خود اسے دیکھ کر درست کرتے ہیں۔
      </p>
    ),
  },
  {
    question: "مفت میں کیا آزما سکتے ہیں؟",
    answer: (
      <p>
        ہر نئے اکاؤنٹ کو ایک بار 10 منٹ مفت ملتے ہیں، کارڈ کی ضرورت نہیں۔ مفت
        پلان میں 10 منٹ تک کی ایک فائل اور واٹر مارک والی 720p ویڈیو شامل ہے۔
      </p>
    ),
  },
  {
    question: "کون سی فائلیں اپ لوڈ کر سکتے ہیں؟",
    answer: (
      <p>
        MP3، FLAC، WAV، M4A، MP4 اور MOV فائلیں۔ تفصیل کے لیے{" "}
        <Link href="/supported-formats" lang="en" dir="ltr">
          Supported formats
        </Link>{" "}
        دیکھیں۔
      </p>
    ),
  },
  {
    question: "کیا میں ٹرانسکرپٹ اور کیپشن کا وقت بدل سکتا ہوں؟",
    answer: (
      <p>
        جی ہاں۔ اسٹوڈیو میں ہر لفظ، نام اور کیپشن کے شروع اور ختم ہونے کا وقت
        ایکسپورٹ سے پہلے بدلا جا سکتا ہے۔
      </p>
    ),
  },
  {
    question: "پاکستان میں ادائیگی کیسے ہوتی ہے؟",
    answer: (
      <p>
        کارڈ کے ذریعے، یا بینک ٹرانسفر، JazzCash، Easypaisa، SadaPay اور NayaPay
        سے ادائیگی کر کے اسٹوڈیو میں اس کی تصدیق جمع کروائیں۔
      </p>
    ),
  },
];

const formatNumber = (value: number) => value.toLocaleString("en-PK");

export default function UrduHome() {
  const jsonLd = buildGraphJsonLd([
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: title,
      description,
      path: "/ur",
      primaryImage: "/og/default.png",
      hasBreadcrumb: false,
      dateModified: "2026-11-24",
      inLanguage: "ur-PK",
    }),
  ]);

  return (
    <>
      <StructuredData data={jsonLd} />
      <SiteHeader />
      <main
        id="main"
        className="home-site ajrak-home urdu-home"
        lang="ur"
        dir="rtl"
        tabIndex={-1}
      >
        <section
          className="ajrak-field home-hero"
          aria-labelledby="ur-hero-title"
        >
          <div className="public-container home-hero-copy">
            <h1 id="ur-hero-title">اردو کیپشن، شائع کرنے کے لیے تیار۔</h1>
            <p className="home-hero-lead">
              اپنی اردو ریکارڈنگ کو نستعلیق، رومن اردو، انگریزی اور دو لسانی
              کیپشن میں بدلیں، پھر درست کر کے ایکسپورٹ کریں۔
            </p>
            <div className="home-hero-actions">
              <Link
                className="button home-cta"
                href="/auth/register?source=ur_home"
              >
                10 منٹ مفت آزمائیں
              </Link>
              <Link className="home-hero-link" href="/demo">
                نمونہ ایڈیٹ کریں
              </Link>
            </div>
            <p className="home-hero-note">
              کارڈ کی ضرورت نہیں۔ بعد میں روپوں میں پلان۔
            </p>
          </div>
          {/* The sample editor itself is an English, left-to-right interface. */}
          <div className="public-container home-hero-stage" lang="en" dir="ltr">
            <StampHero />
          </div>
        </section>

        <section className="home-manifest" aria-label="UrduSpeech کی خصوصیات">
          <span className="ajrak-band" aria-hidden="true" />
          <div className="public-container">
            <p>
              {proof.map(({ value }, index) => (
                <span key={value} className="urdu-manifest-item">
                  {index > 0 && (
                    <span className="home-manifest-dot" aria-hidden="true" />
                  )}
                  <span>{value}</span>
                </span>
              ))}
            </p>
          </div>
        </section>

        <section
          className="home-section home-promises"
          aria-labelledby="ur-features-title"
        >
          <div className="public-container home-promises-layout">
            <div className="home-heading">
              <h2 id="ur-features-title">پہلے لفظ سے اردو کے لیے بنایا گیا</h2>
              <p>
                نستعلیق، دائیں سے بائیں پڑھائی، اور اردو انگریزی ملی جلی زبان جو
                پاکستانی کریئیٹرز بولتے ہیں، سب کو ذہن میں رکھ کر۔
              </p>
            </div>
            <dl className="home-promise-list">
              {features.map(({ title: heading, text }) => (
                <div key={heading}>
                  <dt>{heading}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className="home-section home-workflow"
          aria-labelledby="ur-steps-title"
        >
          <span className="ajrak-band" aria-hidden="true" />
          <div className="public-container">
            <div className="home-heading">
              <h2 id="ur-steps-title">ریکارڈنگ سے کیپشن تک، تین قدم</h2>
            </div>
            <ol className="home-steps" role="list">
              {steps.map(({ title: heading, text }, index) => (
                <li key={heading}>
                  <span className="home-step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{heading}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
          <span className="ajrak-band" aria-hidden="true" />
        </section>

        <section
          className="home-section home-pricing"
          aria-labelledby="ur-pricing-title"
        >
          <div className="public-container">
            <div className="home-heading home-heading-row">
              <div>
                <h2 id="ur-pricing-title">10 مفت منٹ سے شروع کریں</h2>
                <p>
                  منٹ، ویڈیو کوالٹی اور فائل محفوظ رہنے کی مدت دیکھ کر پلان
                  چنیں۔
                </p>
              </div>
              <Link className="home-inline-link" href="/pricing">
                قیمتوں کی مکمل تفصیل
              </Link>
            </div>
            <ul className="public-pricing" role="list" aria-label="پلان">
              {PLANS.map((plan) => (
                <li
                  key={plan.id}
                  data-recommended={plan.recommended || undefined}
                >
                  <div className="plan-name">
                    <h3>{planNames[plan.id]}</h3>
                    {plan.recommended && (
                      <span className="plan-badge">تجویز کردہ</span>
                    )}
                  </div>
                  <p className="public-price">
                    <span>روپے</span> {plan.priceDisplay}
                  </p>
                  <p className="price-period">
                    {plan.pricePkr === 0 ? "ایک بار" : "ماہانہ"}
                  </p>
                  <dl>
                    <div>
                      <dt>ٹرانسکرپشن</dt>
                      <dd>{formatNumber(plan.minutes)} منٹ</dd>
                    </div>
                    <div>
                      <dt>ایک فائل کی زیادہ سے زیادہ لمبائی</dt>
                      <dd>{formatNumber(plan.maxDurationMinutes)} منٹ</dd>
                    </div>
                    <div>
                      <dt>ویڈیو</dt>
                      <dd>
                        {plan.watermark
                          ? "720p، واٹر مارک کے ساتھ"
                          : "1080p، بغیر واٹر مارک"}
                      </dd>
                    </div>
                    <div>
                      <dt>فائلیں محفوظ</dt>
                      <dd>{formatNumber(plan.retentionDays)} دن</dd>
                    </div>
                  </dl>
                  <Link
                    href={
                      plan.pricePkr === 0
                        ? "/auth/register?source=ur_pricing"
                        : `/auth/register?plan=${plan.id}&source=ur_pricing`
                    }
                    className={
                      plan.recommended
                        ? "button plan-cta"
                        : "button secondary plan-cta"
                    }
                  >
                    {plan.pricePkr === 0
                      ? "مفت آزمائیں"
                      : `${planNames[plan.id]} چنیں`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="home-section home-questions"
          aria-labelledby="ur-questions-title"
        >
          <div className="public-container home-questions-layout">
            <div className="home-heading">
              <h2 id="ur-questions-title">عام سوالات</h2>
              <p>
                مزید تفصیل انگریزی میں{" "}
                <Link href="/faq" lang="en" dir="ltr">
                  FAQ
                </Link>{" "}
                پر موجود ہے۔
              </p>
            </div>
            <QuestionList questions={questions} openFirst />
          </div>
        </section>
      </main>
      <PublicFooter
        intro={
          <div
            className="ajrak-field home-close urdu-close"
            lang="ur"
            dir="rtl"
          >
            <span className="ajrak-band home-close-band" aria-hidden="true" />
            <div className="home-close-copy">
              <h2>اپنی اگلی ویڈیو کو اردو کیپشن دیں</h2>
              <p>
                ریکارڈنگ اپ لوڈ کریں، اور اسٹوڈیو میں کیپشن اپنے مطابق بنائیں۔
              </p>
              <Link
                className="button home-cta"
                href="/auth/register?source=ur_close"
              >
                10 منٹ مفت آزمائیں
              </Link>
            </div>
            <span className="ajrak-band home-close-band" aria-hidden="true" />
          </div>
        }
      />
    </>
  );
}
