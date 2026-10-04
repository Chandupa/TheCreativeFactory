import { RevealGroup } from "@/components/motion/Reveal";
import type { ServiceFaq } from "@/types/service";

/** Native <details> disclosure list: keyboard accessible, and every answer is in the HTML. */
export default function Faq({ items }: { items: ServiceFaq[] }) {
  return (
    <RevealGroup variant="copy" className="faq">
      {items.map((item) => (
        <details key={item.question} className="faq-item">
          <summary>
            <h3>{item.question}</h3>
            <span className="faq-toggle" aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </RevealGroup>
  );
}
