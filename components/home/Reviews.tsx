import { RevealGroup, RevealText } from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { googleReviewsUrl, reviewSummary, reviews } from "@/data/reviews";

function Stars({ rating, className = "review-stars" }: { rating: number; className?: string }) {
  return (
    <span className={className} role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" data-filled={i < Math.round(rating)}>
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

/** Homepage testimonials: genuine Google reviews (data/reviews.ts), shown after the client logos. */
export default function Reviews() {
  return (
    <section className="section reviews-section" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section-head section-head--center">
          <SectionLabel center>CLIENT REVIEWS</SectionLabel>
          <RevealText className="section-title" id="reviews-title">
            WHAT CLIENTS <span className="accent">SAY</span>
          </RevealText>
          <p className="reviews-summary" data-reveal="fade">
            <Stars rating={reviewSummary.average} className="review-stars review-stars--summary" />
            <span>
              <strong>{reviewSummary.average.toFixed(1)}</strong> from {reviewSummary.count} Google reviews
            </span>
          </p>
        </div>

        <RevealGroup as="ul" variant="card" className="reviews-grid">
          {reviews.map((review) => (
            <li key={review.author} className="review-card">
              <figure>
                <Stars rating={review.rating} />
                <blockquote>
                  {review.text.split("\n\n").map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </blockquote>
                <figcaption>
                  <span className="review-author">{review.author}</span>
                  <span className="review-source">Google review</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </RevealGroup>

        <p className="reviews-cta" data-reveal="fade">
          <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            READ ALL REVIEWS ON GOOGLE
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </section>
  );
}
