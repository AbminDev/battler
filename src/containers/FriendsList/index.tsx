import { useTelegram } from "../../hooks/useTelegram";
import { Friend } from "./components";
import { RefreshFriends } from "./components/RefreshFriends";

const friends = [
  {
    name: "Andrey",
    description: "Text description of what we got",
    imgSrc: "https://via.placeholder.com/48x48",
  },
  {
    name: "Maria",
    description: "Another description",
    imgSrc: "https://via.placeholder.com/48x48",
  },
  {
    name: "Maria",
    description: "Another description",
    imgSrc: "https://via.placeholder.com/48x48",
  },
  {
    name: "Maria",
    description: "Another description",
    imgSrc: "https://via.placeholder.com/48x48",
  },
  {
    name: "Maria",
    description: "Another description",
    imgSrc: "https://via.placeholder.com/48x48",
  },
  {
    name: "Maria",
    description: "Another description",
    imgSrc: "https://via.placeholder.com/48x48",
  },
  {
    name: "Maria",
    description: "Another description",
    imgSrc: "https://via.placeholder.com/48x48",
  },
  {
    name: "Maria",
    description: "Another description",
    imgSrc: "https://via.placeholder.com/48x48",
  },
  {
    name: "Maria",
    description: "Another description",
    imgSrc: "https://via.placeholder.com/48x48",
  },
  // ...інші друзі
];

export const FriendsList = () => {
  const { userId } = useTelegram();


  return (
    <div className="flex flex-col gap-4 h-screen flex-1 overflow-y-auto rounded pb-[88px]">
      {friends.length > 0 ? (
        friends.map((friend, index) => (
          <Friend
            key={index}
            name={friend.name}
            description={friend.description}
            imgSrc={friend.imgSrc}
          />
        ))
      ) : (
        <div className="w-full h-16 bg-slate-100 rounded-lg border border-slate-400 p-4">
          <div className="flex h-full justify-center items-center text-center text-slate-400 text-sm font-semibold leading-4 tracking-tight">
            You haven't invited anyone yet
          </div>
        </div>
      )}
    </div>
  );
};
