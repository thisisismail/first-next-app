import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import Layout from "../components/layout/index";

export default function posts({ dataPosts, dataUsers }) {
  if (!dataPosts) {
    return null;
  }

  console.log(dataPosts);
  console.log(dataUsers);

  const postsList = dataPosts?.map((item) => {
    const userId = item.user_id;
    const userInfo = dataUsers?.find((user) => {
      return user.id === userId;
    });
    return (
      <Card
        key={item.id}
        className="border-2 rounded-xl w-full flex flex-col justify-center"
      >
        <CardBody>
          <h1 className="font-bold text-2xl line-clamp-2 overflow-hidden">
            {item.title}
          </h1>
          <h6 className="overflow-hidden line-clamp-2 text-md">{item.body}</h6>
        </CardBody>
        <CardFooter divider className="">
          <h1>{userInfo?.name}</h1>
          <h1>{userInfo?.email}</h1>
        </CardFooter>
      </Card>
    );
  });

  return (
    <Layout>
      <div>Posts</div>
      <div
        className="border-0 mx-4 flex flex-col gap-4"
        style={{ maxWidth: 500 }}
      >
        {postsList}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const dataPosts = await fetch("https://gorest.co.in/public/v2/posts").then(
    (res) => {
      return res.json();
    }
  );

  const dataUsers = await Promise.all(
    dataPosts.map((result) =>
      fetch(`https://gorest.co.in/public/v2/users/${result.user_id}`).then(
        (res) => {
          return res.json();
        }
      )
    )
  );

  return {
    props: {
      dataPosts,
      dataUsers,
    },
  };
};
