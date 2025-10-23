import Image from "next/image";
// import styles from "./page.module.css";
import { HydratedDocument } from 'mongoose';
import { CivType } from "@/models/Civ";
import { fetchData } from "@/lib/fetchData";
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
