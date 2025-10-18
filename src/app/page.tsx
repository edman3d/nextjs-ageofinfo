import Image from "next/image";
import styles from "./page.module.css";
import { HydratedDocument } from 'mongoose';
import { CivType } from "@/models/Civ";

// export const metadata = {
//   title: "Incremental Static Regeneration - NextJS 13.4 Image Gallery",
// }

export const revalidate = 3600;

// For more granular control, you can implement on-demand revalidation. This involves creating an API Route 
// (now called Route Handlers in the App Router) that triggers revalidation for a specific path or cache tag
//  using revalidatePath or revalidateTag from next/cache.

export default async function Home() {
  const civResponse = await fetch('http://localhost:3000/api/civs');
  // const civResponse = await fetch('/api/civs');
  const civData: CivType[] = await civResponse.json();
  console.log(civData[0].army_type);

  return (
    <div>yo</div>
  );
}
