import UnitsPage from "./UnitsPage";

export const metadata = {
  title: "Units | Age of Info",
}

export const revalidate = 0; // Must be 0 here because we are fetching from our own internal API at build time

export default async function Page() {

  return (
    <UnitsPage />
  );
}
