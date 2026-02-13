import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className={className} data-testid="faq-accordion">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} data-testid={`faq-item-${i}`}>
          <AccordionTrigger className="text-start text-sm font-medium" data-testid={`faq-trigger-${i}`}>
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed" data-testid={`faq-content-${i}`}>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
