import Article from '@/components/blog/article';

interface IArticle {
  id: string;
  headline: string;
  subtitle?: string;
  shortText: string;
  publishDate: string;
}

const articles: IArticle[] = [
  {
    id: '1',
    headline: "The Future of Web Development",
    subtitle: "Exploring upcoming trends and technologies",
    shortText: "As we move into a new era of web development, exciting technologies are emerging that promise to revolutionize how we build and interact with websites...",
    publishDate: "2023-07-15"
  },
  {
    id: '2',
    headline: "Mastering React Hooks",
    shortText: "React Hooks have changed the way we write components. In this article, we dive deep into advanced use cases and best practices for React Hooks...",
    publishDate: "2023-07-10"
  },
  {
    id: '3',
    headline: "Building Scalable APIs with Node.js",
    subtitle: "Best practices for large-scale applications",
    shortText: "Creating APIs that can handle millions of requests requires careful planning and implementation. Learn how to build robust and scalable APIs using Node.js...",
    publishDate: "2023-07-05"
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">The blog</h1>
      <div className="space-y-8">
        {articles.map(article => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
