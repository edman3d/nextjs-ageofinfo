import { fetchData } from "@/lib/fetchData";
import { UnitType } from "@/models/Unit";
import { Metadata } from "next";
import UnitCard from "@/components/UnitCard/UnitCard";

/**
 * Server-side rendered page for displaying a single Unit based on the dynamic route parameter.
 * e.g. /units/Archer. <UnitCard> is a client component
 */

interface PageProps {
  params: Promise<{ unit: string }>, // unit refers to the units/[unit] dynamic route
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
    <UnitCard unitData={unitData} key={unitData._id?.toString()} />
  );
}
