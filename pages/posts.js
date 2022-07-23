import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { GrClose } from "react-icons/gr";
import Layout from "../components/layout/index";
import CardPost from "../components/CardPost/index";
import PopUpPost from "../components/PopUpPost/index";

export default function posts({ dataPosts, dataUsers, dataComments }) {
  const [popUp, setPopUp] = useState();

  if (!dataPosts) {
    return null;
  }

  console.log(dataPosts);
  console.log(dataUsers);
  console.log(dataComments);

  const postsList = dataPosts?.map((item) => {
    const userId = item.user_id;
    const postId = item.id;

    const userInfo = dataUsers?.find((user) => {
      return user.id === userId;
    });

    const commentInfo = dataComments?.find((comment) => {
      return comment.find((nestedComment) => {
        return nestedComment.post_id === postId;
      });
    });

    const comments = commentInfo?.map((comment) => {
      return (
        <div key={comment.email} className="mt-4">
          <h1 className="font-bold">{comment.name}</h1>
          <h1 className="border-0 line-clamp-1 text-xs">{comment.email}</h1>
          <h1 className="text-md">{comment.body}</h1>
        </div>
      );
    });

    const sayGoodbye = () => {
      console.log("clicked");
      setPopUp();
    };

    const sayHello = (title, body) => {
      console.log("clicked");
      setPopUp(
        <PopUpPost
          postComments={comments}
          postUser={userInfo?.name}
          postEmail={userInfo?.email}
          postTitle={title}
          postBody={body}
          closeButton={
            <Button
              onClick={sayGoodbye}
              className="h-full bg-transparent shadow-none drop-shadow-none hover:drop-shadow-none hover:shadow-none"
            >
              <GrClose size={24} />
            </Button>
          }
        />
      );
    };

    return (
      <div
        key={item.id}
        style={{ width: 400 }}
        onClick={() => sayHello(item.title, item.body)}
        className="cursor-pointer"
      >
        <CardPost
          postTitle={item.title}
          postBody={item.body}
          postUser={userInfo?.name}
          postEmail={userInfo?.email}
        />
      </div>
    );
  });

  // const renderFramePlayer = () => {
  //   return <div>{playedVideo !== "" ? <PopUpPost /> : null}</div>;
  // };

  return (
    <Layout>
      <div>Posts</div>
      {/* {renderFramePlayer()} */}
      {/* {renderPopUp()} */}
      {popUp}
      <div
        className="border-0 gap-4 flex flex-wrap justify-center mx-auto px-4"
        style={{ maxWidth: 1400 }}
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
