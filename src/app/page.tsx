
export const metadata = {
  title: "Age of Info | Homepage",
}

export const revalidate = 0; // Must be 0 here because we are fetching from our own internal API

export default async function Home() {
  return (
    <div>Home Page</div>
  );
}
