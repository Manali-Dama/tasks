

import Image from "next/image";
import styles from "./page.module.scss";
import InputJson from "./components/InputJson";
import DisplayJson from "./components/DisplayJson";

export default function Home() {
  return (
      <main className="container">
        <InputJson />
        <DisplayJson />
      </main>
    
  );
}
