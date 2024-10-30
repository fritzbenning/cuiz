import styles from "./page.module.css";
import SignOutButton from "@/components/SignOutButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <SignOutButton />
    </div>
  );
}
