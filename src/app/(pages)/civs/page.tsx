import CivsPage from "./CivsPage";

export const metadata = {
  title: "Civs | Age of Info",
}

export const revalidate = 0; // Must be 0 here because we are fetching from our own internal API

export default async function Page() {
  return (
    <CivsPage />
  );
}
