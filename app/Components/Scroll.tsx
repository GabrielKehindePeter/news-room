"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPosts } from "./Allposts";

interface Post {
  id: string | number;
  title?: string;
  image_url?: string;
  // add other fields you expect
}

export default function MarqueeText() {
  const [news, setNews] = useState<Post[]>([]); // typed here
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(); // if fetchPosts is typed, even better
        if (!mounted) return;
        setNews(Array.isArray(data) ? (data as Post[]) : []);
        // don't console.log(news) here — it's stale within this closure
      } catch (err) {
        console.error("fetchPosts error:", err);
        if (!mounted) return;
        setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // simple UI fallbacks
  if (loading) {
    return (
      <div className="marquee">
        <div className="marquee-content">
          <span className="mx-8 text-gray-300 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="marquee">
        <div className="marquee-content">
          <span className="mx-8 text-red-400 text-sm">Error loading news</span>
        </div>
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="marquee">
        <div className="marquee-content">
          <span className="mx-8 text-gray-300 text-sm">No news available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="marquee">
      <div className="marquee-content">
        {news.map((alert, idx) => {
          const title = alert.title ?? "Untitled";
          const href = `details/${alert.id ?? idx}`;

          return (
            <Link href={href} key={alert.id ?? idx} className="mx-8 text-gray-300 text-sm hover:text-orange-400">
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
