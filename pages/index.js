import Link from "next/link";
// import styles from "../styles/Home.module.css";
import Layout from "../components/layout/index";

export default function Home() {
  return (
    <Layout>
      <h1>Welcome Ismail</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </Layout>
  );
}
