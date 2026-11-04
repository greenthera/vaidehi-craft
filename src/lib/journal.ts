import articles from "@/data/journal.json";

export const journalArticles = articles;
export const articlePath = (slug: string) => `/blog/${slug}`;
