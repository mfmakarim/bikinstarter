import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  return [
    {
      url: "https://starter.bikinsaas.id/",
      lastModified: new Date()
    },
  ];
}
