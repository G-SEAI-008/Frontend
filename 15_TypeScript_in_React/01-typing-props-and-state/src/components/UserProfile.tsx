// oxlint-disable typescript/strict-boolean-expressions
type UserProfileProps = {
  username: string;
  img: string;
  info?: string;
  status: boolean;
};

const UserProfile = ({ username, img, info, status }: UserProfileProps) => {
  return (
    <article>
      <h2>{username}</h2>
      <img src={img} alt='' />
      {info && <p>{info}</p>}
      {status ? <p>Online</p> : <p>Offline</p>}
    </article>
  );
};

// const UserProfile = (props: { username: string; img: string }) => {
//   const { username, img } = props;

//   return (
//     <article>
//       <h2>{username}</h2>
//       <img src={img} alt='' />
//     </article>
//   );
// };

export default UserProfile;
export type { UserProfileProps };
