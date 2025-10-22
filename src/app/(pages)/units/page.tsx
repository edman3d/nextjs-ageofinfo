import Image from "next/image";
// import styles from "./page.module.css";
import { HydratedDocument } from 'mongoose';
import { CivType } from "@/models/Civ";
import { fetchData } from "@/lib/fetchData";

export const metadata = {
  title: "Age of Info | Units Page",
}

export const revalidate = 0; // Must be 0 here because we are fetching from our own internal API


export default async function Page() {

  return (
    <div>Units Page</div>
  );
}
