import Image from "next/image";
import styles from "./page.module.css";
import { HydratedDocument } from 'mongoose';
import { CivType } from "@/models/Civ";

// export const metadata = {
//   title: "Incremental Static Regeneration - NextJS 13.4 Image Gallery",
// }

export const revalidate = 0;

// For more granular control, you can implement on-demand revalidation. This involves creating an API Route 
// (now called Route Handlers in the App Router) that triggers revalidation for a specific path or cache tag
//  using revalidatePath or revalidateTag from next/cache.

export default async function Home() {
  // const civResponse = await fetch('http://localhost:3000/api/civs');
  console.log('check if using preview mongodb_uri now');
  console.log('NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL); // undefined in preview build

  console.log('VERCEL_ENV :>> ', process.env.VERCEL_ENV);
  console.log('VERCEL_URL :>> ', process.env.VERCEL_URL);
  console.log('VERCEL_PROJECT_PRODUCTION_URL :>> ', process.env.VERCEL_PROJECT_PRODUCTION_URL);
  console.log('VERCEL_BRANCH_URL :>> ', process.env.VERCEL_BRANCH_URL);
  console.log('VERCEL_AUTOMATION_BYPASS_SECRET :>> ', process.env.VERCEL_AUTOMATION_BYPASS_SECRET);
  const civResponse = await fetch(`https://${process.env.VERCEL_URL}/api/civs?x-vercel-protection-bypass=${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`);
  // const civResponse = await fetch('/api/civs');
  const civData: CivType[] = await civResponse.json();
  console.log(civData[0].army_type);

  return (
    <div>yo</div>
  );
}
