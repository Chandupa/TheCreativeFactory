/*
 * Google reviews of "The Creative Factory | Digital Øxide" (Homagama), copied
 * verbatim — reviewer display names and text exactly as shown publicly on
 * Google, typos included. Captured 8 October 2026 from the business profile
 * (5.0 average from 6 reviews, so every rating is 5 stars). Owner replies and
 * Google's relative dates ("2 years ago") are deliberately not reproduced.
 * One review (nalaka chaminda) is omitted at the owner's request.
 *
 * To update: copy new reviews from the profile and add them here.
 */

export interface Review {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export const googleReviewsUrl = "https://share.google/vZbK1yUXnenQ4qhig";

export const reviews: Review[] = [
  {
    author: "Onella Mudalige",
    rating: 5,
    text: "We recently worked with him for our company profile video and honestly, he did an amazing job. From start to finish he was calm, professional and easy to work with. I requested quite a few revisions along the way and he was always patient and ready to make the changes without any hesitation.\n\nWe’re very happy with how our corporate video turned out. Highly recommend him if you’re looking for someone reliable and talented!",
  },
  {
    author: "Himesh De Ruberu",
    rating: 5,
    text: "Always can expect on time amazing work from them. What I love the most is the eagerness of the team to add something more than expected. Great work. Keep it up.",
  },
  {
    author: "ienethlu sadbhashith",
    rating: 5,
    text: "They are the best in making the customer ultimate satisfied. Keep up the good work. That malli was super friendly and supportive, help me throughout the whole event. keep it up !!",
  },
  {
    author: "Kavindu Viraj",
    rating: 5,
    text: "A true professional who knows how to make a visual impact!",
  },
  {
    author: "Ashen Kularathna",
    rating: 5,
    text: "Great work. One of the best in the town. They are the best in making the customer ultimaty satisfied. Keep up the good work. Brilliant!",
  },
];

/**
 * Rating and count as shown on the Google profile (not derived from the list
 * above, since not every review is displayed). Update when the profile changes.
 */
export const reviewSummary = { average: 5.0, count: 6 };
