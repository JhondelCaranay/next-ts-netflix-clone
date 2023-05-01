import dynamic from "next/dynamic";
import Image from "next/image";

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

type UserCardProps = {
  name: string;
};

const UserCard = ({ name }: UserCardProps) => {
  const imgSrc = images[Math.floor(Math.random() * 4)];

  return (
    <div className="group flex-row w-44 mx-auto">
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        {/* <img draggable={false} className="w-max h-max object-contain" src={imgSrc || ""} alt="" /> */}
        <Image src={imgSrc} className="object-contain" alt="" width={180} height={180} />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
    </div>
  );
};

// export default UserCard;

export default dynamic(() => Promise.resolve(UserCard), {
  ssr: false,
});
