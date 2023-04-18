import { signOut } from "next-auth/react";

type Props = {};
const Profiles = (props: Props) => {
  return (
    <div>
      Profiles
      <button
        onClick={() => {
          signOut({ callbackUrl: "/auth" });
        }}
      >
        Sign out
      </button>
    </div>
  );
};
export default Profiles;
