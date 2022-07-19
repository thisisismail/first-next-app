import { useRouter } from "next/router";
import Layout from "../../components/layout/index";

export default function AllUsers(props) {
  const { jsonData } = props;
  const router = useRouter();
  console.log(jsonData);
  return (
    <Layout>
      <p className="mt-4">AllUsers</p>
      {jsonData.map((data) => {
        return (
          <div
            key={data.id}
            onClick={() => router.push(`/users/${data.id}`)}
            className="my-4 border-2 mx-2 p-2 border-red-200 rounded-xl"
          >
            <p>{data.name}</p>
            <p>{data.email}</p>
          </div>
        );
      })}
    </Layout>
  );
}

// getStaticProps => static generation
// terbatas: ketika data bersifat dinamis maka harus direfresh
// supya server melakukn build ulang untuk dapat mengupdatenya
export async function getStaticProps() {
  const data = await fetch("https://gorest.co.in/public/v2/users");
  const jsonData = await data.json();
  return {
    props: {
      jsonData,
    },
  };
}
