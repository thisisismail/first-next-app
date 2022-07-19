export default function UserInfo(props) {
  const { jsonData } = props;
  // since we fetch data from API, which is it's time-consuming
  // don't forget to return null when the data is not ready yet
  // if not, it will give an error as we build our project later
  if (!jsonData) return null;
  return (
    <div>
      <p>{jsonData.name}</p>
      <p>{jsonData.email}</p>
      <p>{jsonData.gender}</p>
      <p>Hello</p>
    </div>
  );
}

export async function getStaticPaths() {
  const data = await fetch("https://gorest.co.in/public/v2/users");
  const jsonData = await data.json();
  const paths = jsonData.map((user) => ({
    params: {
      id: `${user.id}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

// should use params name it can't be done by another name
export async function getStaticProps(whatever) {
  const { id } = whatever.params;
  const data = await fetch(`https://gorest.co.in/public/v2/users/${id}`);
  const jsonData = await data.json();

  return {
    props: {
      jsonData,
    },
  };
}
