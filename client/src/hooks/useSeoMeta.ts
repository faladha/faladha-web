import { useEffect } from "react";

interface SeoMetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
}

export function useSeoMeta({ title, description, canonical, ogType }: SeoMetaProps) {
  useEffect(() => {
    document.title = title;
    
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = selector.match(/\[(.+?)="(.+?)"\]/)?.slice(1) || [];
        if (attrName && attrVal) el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    if (ogType) setMeta('meta[property="og:type"]', "content", ogType);
    if (canonical) {
      setMeta('meta[property="og:url"]', "content", `https://faladha.com${canonical}`);
      const link = document.querySelector('link[rel="canonical"]');
      if (link) link.setAttribute("href", `https://faladha.com${canonical}`);
    }
  }, [title, description, canonical, ogType]);
}
