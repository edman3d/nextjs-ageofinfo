import Image from "next/image";
import styles from "./page.module.css";
import { HydratedDocument } from 'mongoose';
import { CivType } from "@/models/Civ";
import { fetchData } from "@/lib/fetchData";

export const metadata = {
  title: "Age of Info | Homepage",
}

export const revalidate = 0; // Must be 0 here because we are fetching from our own internal API

// For more granular control, you can implement on-demand revalidation. This involves creating an API Route 
// (now called Route Handlers in the App Router) that triggers revalidation for a specific path or cache tag
//  using revalidatePath or revalidateTag from next/cache.

export default async function Home() {
  // const civResponse = await fetch('http://localhost:3000/api/civs');
  // console.log('originmain testing');
  // console.log('NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL); // undefined in preview build
  // console.log('VERCEL_ENV :>> ', process.env.VERCEL_ENV);
  // console.log('VERCEL_URL :>> ', process.env.VERCEL_URL);
  // console.log('VERCEL_PROJECT_PRODUCTION_URL :>> ', process.env.VERCEL_PROJECT_PRODUCTION_URL);
  // console.log('VERCEL_BRANCH_URL :>> ', process.env.VERCEL_BRANCH_URL);
  // console.log('VERCEL_AUTOMATION_BYPASS_SECRET :>> ', process.env.VERCEL_AUTOMATION_BYPASS_SECRET);

  const civResponse = await fetchData(`${process.env.VERCEL_URL}/api/civs`);
  const civData: CivType[] = await civResponse.json();
  console.log(civData[0].army_type);

  return (
    <div>yo</div>
  );
}
