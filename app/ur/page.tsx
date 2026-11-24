import Link from "next/link";
import type { Metadata } from "next";
import {
  Captions,
  Check,
  FileText,
  FileVideo,
  Languages,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { CaptionStudioDemo } from "@/components/caption-studio-demo";
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
import "../landing.css";
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
    icon: Languages,
    title: "اصل نستعلیق، سادہ فونٹ نہیں",
    text: "اردو کیپشن Noto Nastaliq Urdu میں بنتے ہیں، اس لیے ہر لفظ اسکرین پر صاف اور خوبصورت دکھائی دیتا ہے۔",
  },
  {
    icon: Captions,
    title: "ایک ریکارڈنگ، چار انداز",
    text: "اپنے ناظرین کے مطابق اردو، رومن اردو، انگریزی ترجمہ یا اردو اور انگریزی ایک ساتھ چنیں۔",
  },
  {
    icon: FileText,
    title: "نام اور وقت خود درست کریں",
    text: "ایکسپورٹ سے پہلے نام، نمبر اور الفاظ ٹھیک کریں، اور ہر کیپشن کے آنے اور جانے کا وقت آگے پیچھے کریں۔",
  },
  {
    icon: FileVideo,
    title: "ویڈیو پر کیپشن تیار",
    text: "صاف، نمایاں یا باکس والے انداز میں کیپشن کے ساتھ MP4 بنائیں، یا SRT اور VTT اپنے ایڈیٹر میں لے جائیں۔",
  },
  {
    icon: ShieldCheck,
    title: "آپ کی ریکارڈنگ محفوظ",
    text: "فائلیں آپ کے پلان کی مدت کے بعد خود ختم ہو جاتی ہیں، کسی ماڈل کی تربیت میں استعمال نہیں ہوتیں، اور آپ جب چاہیں حذف کر سکتے ہیں۔",
  },
  {
    icon: Wallet,
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
        className="home-site urdu-home"
        lang="ur"
        dir="rtl"
        tabIndex={-1}
      >
        <section className="landing-hero" aria-labelledby="ur-hero-title">
          <div className="public-container landing-hero-stage">
            <div className="landing-hero-intro">
              <h1 id="ur-hero-title">اردو کیپشن، شائع کرنے کے لیے تیار۔</h1>
              <div className="landing-hero-copy">
                <p>
                  اپنی اردو ریکارڈنگ کو نستعلیق، رومن اردو، انگریزی اور دو لسانی
                  کیپشن میں بدلیں۔
                </p>
                <div className="landing-hero-actions">
                  <Link className="button" href="/auth/register?source=ur_home">
                    10 منٹ مفت آزمائیں
                  </Link>
                  <Link className="button secondary" href="/demo">
                    نمونہ ایڈیٹ کریں
                  </Link>
                </div>
                <small className="landing-hero-note">
                  <Check size={15} aria-hidden="true" /> 10 منٹ مفت، کارڈ کی
                  ضرورت نہیں۔
                </small>
              </div>
            </div>
            {/* The editor itself is an English, left-to-right interface. */}
            <div lang="en" dir="ltr" className="urdu-home-demo">
              <CaptionStudioDemo compact />
            </div>
          </div>
        </section>

        <section
          className="landing-proof-band"
          aria-label="UrduSpeech کی خصوصیات"
        >
          <div className="public-container">
            <ul className="landing-proof" role="list">
              {proof.map(({ value, label }) => (
                <li key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="landing-section landing-section--spacious"
          aria-labelledby="ur-features-title"
        >
          <div className="public-container">
            <div className="landing-section-heading">
              <h2 id="ur-features-title">پہلے لفظ سے اردو کے لیے بنایا گیا</h2>
              <p>
                نستعلیق، دائیں سے بائیں پڑھائی، اور اردو انگریزی ملی جلی زبان جو
                پاکستانی کریئیٹرز بولتے ہیں، سب کو ذہن میں رکھ کر۔
              </p>
            </div>
            <ul className="urdu-feature-grid" role="list">
              {features.map(({ icon: Icon, title: heading, text }) => (
                <li key={heading}>
                  <Icon size={22} aria-hidden="true" />
                  <h3>{heading}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="landing-section landing-workflow"
          aria-labelledby="ur-steps-title"
        >
          <div className="public-container">
            <div className="landing-section-heading">
              <h2 id="ur-steps-title">ریکارڈنگ سے کیپشن تک، تین قدم</h2>
            </div>
            <ol className="landing-steps urdu-steps" role="list">
              {steps.map(({ title: heading, text }, index) => (
                <li key={heading}>
                  <span aria-hidden="true">{index + 1}</span>
                  <div>
                    <h3>{heading}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="landing-section landing-section--spacious landing-pricing"
          aria-labelledby="ur-pricing-title"
        >
          <div className="public-container">
            <div className="landing-section-heading landing-heading-row">
              <div>
                <h2 id="ur-pricing-title">10 مفت منٹ سے شروع کریں</h2>
                <p>
                  منٹ، ویڈیو کوالٹی اور فائل محفوظ رہنے کی مدت دیکھ کر پلان
                  چنیں۔
                </p>
              </div>
              <Link className="public-inline-link" href="/pricing">
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
          className="landing-section landing-questions"
          aria-labelledby="ur-questions-title"
        >
          <div className="public-container landing-questions-grid">
            <div className="landing-section-heading">
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
          <div className="landing-close urdu-close" lang="ur" dir="rtl">
            <div>
              <h2>اپنی اگلی ویڈیو کو اردو کیپشن دیں</h2>
              <p>
                ریکارڈنگ اپ لوڈ کریں، اور اسٹوڈیو میں کیپشن اپنے مطابق بنائیں۔
              </p>
            </div>
            <Link className="button" href="/auth/register?source=ur_close">
              10 منٹ مفت آزمائیں
            </Link>
          </div>
        }
      />
    </>
  );
}
