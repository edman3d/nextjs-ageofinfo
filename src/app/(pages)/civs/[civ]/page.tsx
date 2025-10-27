import { fetchData } from "@/lib/fetchData";
import { CivType } from "@/models/Civ";
import { Metadata } from "next";
import UnitCard from "@/components/UnitCard/UnitCard";
/**
 * Server-side rendered page for displaying a single Civilization based on the dynamic route parameter.
 */

interface PageProps {
  params: Promise<{ civ: string }>, // unit refers to the civs/[civ] dynamic route
}

export const revalidate = 0; // Must be 0 here because we are fetching from our own internal API during build time

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { civ } = await params; // https://nextjs.org/docs/messages/sync-dynamic-apis
  return {
    title: civ + " | Age of Info",
  }
}

export default async function Page({ params }: PageProps) {
  const { civ } = await params; // https://nextjs.org/docs/messages/sync-dynamic-apis
  const civData: CivType = await fetchData(`/api/civs?name=${civ}`);

  const { unique_unit } = civData;

  const uniqueUnitNames: string[] = unique_unit.split(';');

  return (
    <>
      {uniqueUnitNames?.map(name => (
        <UnitCard unitName={name} key={name} />
      ))}
    </>

  );
}
