import { site, type Video, videos as configuredVideos } from "@/content/site";

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${site.youtubeChannelId}`;

function decodeXml(value: string) {
  return value.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
}

function tag(entry: string, name: string) {
  const match = entry.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`));
  return match ? decodeXml(match[1].replace(/^<!\[CDATA\[|\]\]>$/g, "").trim()) : "";
}

export async function getYouTubeVideos(): Promise<Video[]> {
  try {
    const response = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`YouTube feed responded ${response.status}`);
    const entries = (await response.text()).match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
    const feedVideos = entries.map((entry, index): Video => {
      const id = tag(entry, "yt:videoId");
      return { id, title: tag(entry, "title"), description: tag(entry, "media:description"), category: "Últimos videos", publishedAt: tag(entry, "published"), youtubeUrl: `https://www.youtube.com/watch?v=${id}`, thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, featured: index === 0 };
    }).filter(video => video.id && video.title);
    return feedVideos.length ? feedVideos : configuredVideos;
  } catch (error) {
    console.error("No fue posible actualizar el feed de YouTube", error);
    return configuredVideos;
  }
}
