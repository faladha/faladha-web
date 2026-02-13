interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "فلذة",
      "url": "https://faladha.com",
      "logo": "https://faladha.com/favicon.png",
      "description": "تطبيق متابعة الحمل الشامل في العالم العربي",
      "sameAs": []
    }} />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "فلذة",
      "url": "https://faladha.com",
      "description": "فلذة - تطبيق متابعة الحمل أسبوعًا بأسبوع",
      "inLanguage": "ar",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://faladha.com/pregnancy/{search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name,
        "item": `https://faladha.com${item.url}`
      }))
    }} />
  );
}

export function ArticleJsonLd({ title, description, url, datePublished }: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
}) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "url": `https://faladha.com${url}`,
      "datePublished": datePublished || new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "فريق فلذة الطبي"
      },
      "publisher": {
        "@type": "Organization",
        "name": "فلذة",
        "logo": { "@type": "ImageObject", "url": "https://faladha.com/favicon.png" }
      },
      "inLanguage": "ar"
    }} />
  );
}

export function FAQJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": items.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    }} />
  );
}

export function MobileAppJsonLd() {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      "name": "فلذة - متابعة الحمل",
      "operatingSystem": "iOS, Android",
      "applicationCategory": "HealthApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SAR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "5200"
      },
      "description": "تطبيق متابعة الحمل الشامل - أسبوعًا بأسبوع مع معلومات طبية موثوقة"
    }} />
  );
}

export function MedicalWebPageJsonLd({ title, description, url }: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": title,
      "description": description,
      "url": `https://faladha.com${url}`,
      "lastReviewed": new Date().toISOString().split("T")[0],
      "reviewedBy": {
        "@type": "Organization",
        "name": "فريق فلذة الطبي"
      },
      "inLanguage": "ar",
      "about": {
        "@type": "MedicalCondition",
        "name": "الحمل"
      }
    }} />
  );
}
