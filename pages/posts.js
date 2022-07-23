import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { GoComment } from "react-icons/go";
import Layout from "../components/layout/index";

export default function posts({ dataPosts, dataUsers, dataComments }) {
  if (!dataPosts) {
    return null;
  }

  console.log(dataPosts);
  console.log(dataUsers);

  const postsList = dataPosts?.map((item) => {
    const userId = item.user_id;
    const postId = item.id;
    const userInfo = dataUsers?.find((user) => {
      return user.id === userId;
    });
    const commentInfo = dataComments?.find((comment) => {
      return comment.find((nComment) => {
        return nComment.post_id === postId;
      });
    });
    // console.log(dataComments);
    // console.log("S =======================");
    // console.log(commentInfo);
    // console.log("F =======================");
    const comments = commentInfo?.map((comment) => {
      return (
        <div key={comment.email} className="mt-2">
          <h1 className="font-bold">{comment.name}</h1>
          <h1>{comment.body}</h1>
        </div>
      );
    });
    // console.log(dataComments);

    return (
      <Card
        key={item.id}
        style={{ width: 300 }}
        className="border-0 rounded-xl w-full flex flex-col justify-center"
      >
        <CardBody className="gap-3 flex flex-col">
          <h1 className="font-bold text-2xl line-clamp-2 overflow-hidden">
            {item.title}
          </h1>
          <h6 className="overflow-hidden line-clamp-2 text-md">{item.body}</h6>
        </CardBody>
        <CardFooter divider className="flex justify-between items-center">
          <h1 className="border-0">{userInfo?.name}</h1>
          <div className="border-0">
            <GoComment size={24} className=" w-full text-black" />
          </div>
        </CardFooter>
        <div>Comments</div>
        <div>{comments}</div>
        {/* <div>{comments}</div> */}
      </Card>
    );
  });

  return (
    <Layout>
      <div>Posts</div>
      <div
        className="border-0 gap-4 flex flex-wrap justify-center mx-auto px-4"
        style={{ maxWidth: 1200 }}
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

  const dataComments = await Promise.all(
    dataPosts.map((result) =>
      fetch(`https://gorest.co.in/public/v2/posts/${result.id}/comments`).then(
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
      dataComments,
    },
  };
};
