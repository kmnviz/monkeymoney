import Image from 'next/image';
import Link from 'next/link';

interface IArticle {
  id: string;
  headline: string;
  subtitle?: string;
  shortText: string;
  publishDate: string;
}

export default function Article({ article }: { article: IArticle }) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md flex flex-col md:flex-row">
      <div className="md:w-1/3 relative h-48 md:h-auto">
        {/*<Image*/}
        {/*  src={`https://source.unsplash.com/random/800x600?sig=${article.id}`}*/}
        {/*  alt={article.headline}*/}
        {/*  layout="fill"*/}
        {/*  objectFit="cover"*/}
        {/*/>*/}
      </div>
      <div className="p-6 md:w-2/3">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{article.headline}</h2>
        {article.subtitle && (
          <h3 className="text-lg text-gray-600 mb-2">{article.subtitle}</h3>
        )}
        <p className="text-gray-700 mb-4">{article.shortText}</p>
        <div className="flex justify-between items-center">
          <Link
            href={`/blog/${article.id}`}
            className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-300"
          >
            Read More →
          </Link>
          <time className="text-gray-500 text-sm" dateTime={article.publishDate}>
            {article.publishDate}
          </time>
        </div>
      </div>
    </article>
  )
}
