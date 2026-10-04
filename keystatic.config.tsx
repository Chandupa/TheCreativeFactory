import { collection, config, fields } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";
import { services } from "@/data/services";

/*
 * TCF Journal content model, edited at /keystatic.
 *
 * Content lives in the repo (content/journal/*, images in public/media/journal/*):
 *  - Locally (`npm run dev`) the admin reads and writes those files directly.
 *  - In production, editors sign in with GitHub and every save is a commit to
 *    the repo, which Vercel deploys — no database or extra hosting.
 * Set NEXT_PUBLIC_KEYSTATIC_STORAGE=github locally to run the one-time GitHub
 * App setup (see lib/journal/cms.ts).
 */

/** Paths under /journal that an article slug must not shadow. */
const RESERVED_SLUGS = ["latest", "search", "category", "rss.xml", "page", "tag", "author"];
const SLUG_PATTERN = new RegExp(`^(?!(?:${RESERVED_SLUGS.join("|").replace(".", "\\.")})$)[a-z0-9]+(?:-[a-z0-9]+)*$`);

const useGitHub = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

export default config({
  storage: useGitHub
    ? { kind: "github", repo: { owner: "Chandupa", name: "TheCreativeFactory" } }
    : { kind: "local" },
  ui: {
    brand: { name: "TCF Journal" },
    navigation: { Journal: ["articles", "categories", "authors"] },
  },
  collections: {
    articles: collection({
      label: "Articles",
      slugField: "title",
      path: "content/journal/articles/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "status", "publishedAt"],
      schema: {
        title: fields.slug({
          name: { label: "Headline", validation: { isRequired: true, length: { max: 120 } } },
          slug: {
            label: "URL slug",
            description: "thecreativefactory.lk/journal/<slug>. Lowercase words joined by hyphens. Don't change it after publishing.",
            validation: { pattern: { regex: SLUG_PATTERN, message: "Lowercase letters, numbers and hyphens only (and not a reserved word like 'latest' or 'search')." } },
          },
        }),
        excerpt: fields.text({
          label: "Standfirst / excerpt",
          description: "One or two sentences shown under the headline and on cards. Also the default meta description.",
          multiline: true,
          validation: { isRequired: true, length: { max: 300 } },
        }),
        status: fields.select({
          label: "Status",
          description: "Drafts are never public. Scheduled articles go live automatically at their publish date.",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Published", value: "published" },
          ],
          defaultValue: "draft",
        }),
        publishedAt: fields.datetime({
          label: "Publish date",
          description: "Sri Lanka time. For scheduled articles, the moment it goes live.",
          defaultValue: { kind: "now" },
          validation: { isRequired: true },
        }),
        updatedAt: fields.datetime({
          label: "Last meaningful update",
          description: "Optional. Set only when the content changed substantially (shown as 'Updated' and used as dateModified).",
        }),
        articleType: fields.select({
          label: "Content type",
          description: "Use 'News' only for genuinely time-sensitive reporting. Guides, opinion and analysis are 'Article'.",
          options: [
            { label: "Article", value: "article" },
            { label: "News", value: "news" },
          ],
          defaultValue: "article",
        }),
        category: fields.relationship({ label: "Category", collection: "categories", validation: { isRequired: true } }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        author: fields.relationship({ label: "Author", collection: "authors", validation: { isRequired: true } }),
        featuredImage: fields.image({
          label: "Featured image",
          description: "Landscape, at least 1600px wide. Shown at 16:9.",
          directory: "public/media/journal/articles",
          publicPath: "/media/journal/articles/",
          validation: { isRequired: true },
        }),
        featuredImageAlt: fields.text({
          label: "Featured image alt text",
          description: "Describe what the image shows, for screen readers and search engines.",
          validation: { isRequired: true },
        }),
        featuredImageCaption: fields.text({ label: "Featured image caption / credit", description: "Optional." }),
        featured: fields.checkbox({ label: "Featured", description: "Candidate for the lead story on /journal." }),
        editorPick: fields.checkbox({ label: "Editor's pick" }),
        breakingNews: fields.checkbox({ label: "Breaking news", description: "Shows the breaking strip on /journal. Untick once it's no longer breaking." }),
        relatedServices: fields.multiselect({
          label: "Related TCF services",
          description: "Optional. Adds a short service call-to-action under the article and lists it on that service's page. Pick only what is genuinely relevant.",
          options: services.map((service) => ({ label: service.name, value: service.slug })),
        }),
        seoTitle: fields.text({ label: "SEO title", description: "Optional. Defaults to the headline. Keep under ~60 characters." }),
        seoDescription: fields.text({
          label: "Meta description",
          description: "Optional. Defaults to the excerpt. Aim for 140–160 characters.",
          multiline: true,
          validation: { length: { max: 200 } },
        }),
        canonicalUrl: fields.url({
          label: "Canonical URL override",
          description: "Leave empty. Only set when this article was first published elsewhere.",
        }),
        ogImage: fields.image({
          label: "Social share image",
          description: "Optional, 1200×630. Defaults to the featured image.",
          directory: "public/media/journal/articles",
          publicPath: "/media/journal/articles/",
        }),
        content: fields.markdoc({
          label: "Article body",
          description: "Start sections with Heading 2 — the headline is the page's only H1.",
          options: {
            heading: [2, 3, 4],
            image: { directory: "public/media/journal/articles", publicPath: "/media/journal/articles/" },
            table: false,
            codeBlock: false,
            strikethrough: false,
          },
          components: {
            embed: block({
              label: "Video embed",
              description: "YouTube or Vimeo video.",
              schema: {
                url: fields.url({ label: "Video URL", validation: { isRequired: true } }),
                caption: fields.text({ label: "Caption" }),
              },
            }),
          },
        }),
      },
    }),

    categories: collection({
      label: "Categories",
      slugField: "name",
      path: "content/journal/categories/*",
      format: "yaml",
      columns: ["name", "order"],
      schema: {
        name: fields.slug({ name: { label: "Name", validation: { isRequired: true } } }),
        description: fields.text({
          label: "Description",
          description: "Shown at the top of the category page and used as its meta description.",
          multiline: true,
          validation: { isRequired: true },
        }),
        order: fields.integer({ label: "Order", description: "Lower numbers come first in navigation.", defaultValue: 100 }),
        showInNav: fields.checkbox({ label: "Show in Journal navigation", defaultValue: true }),
      },
    }),

    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "content/journal/authors/*",
      format: "yaml",
      schema: {
        name: fields.slug({ name: { label: "Name", validation: { isRequired: true } } }),
        role: fields.text({ label: "Role" }),
        bio: fields.text({ label: "Short bio", multiline: true }),
        avatar: fields.image({
          label: "Photo",
          directory: "public/media/journal/authors",
          publicPath: "/media/journal/authors/",
        }),
        url: fields.url({ label: "Profile URL", description: "Optional, e.g. LinkedIn." }),
      },
    }),
  },
});
