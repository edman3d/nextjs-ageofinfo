import { fetchData } from "@/lib/fetchData";
import { UnitType } from "@/models/Unit";
import { Metadata } from "next";

/**
 * Server-side rendered page for displaying a single Unit based on the dynamic route parameter.
 */

interface PageProps {
  params: { unit: string }, // unit refers to the units/[unit] dynamic route
}

export const revalidate = 0; // Must be 0 here because we are fetching from our own internal API during build time

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { unit } = await params; // https://nextjs.org/docs/messages/sync-dynamic-apis
  return {
    title: unit + " | Age of Info",
  }
}

export default async function Page({ params }: PageProps) {
  const { unit } = await params; // https://nextjs.org/docs/messages/sync-dynamic-apis
  const unitData: UnitType = await fetchData(`/api/units?name=${unit}`);

  return (
    <div>
      <p>Single Unit Page</p>
      <p>Dynamic Slug: {unit}</p>

      {unitData ? <p>{unitData.name}</p> : <p>Unit not found (we dont reach this because server returns 404 if name is wrong)</p>}

    </div>
  );
}
