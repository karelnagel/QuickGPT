import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { getServerUrl } from "../helpers";
import { useStore } from "../hooks/useStore";

export type NotificationType = {
  message: string;
  color?: string;
  id: string;
  hide?: boolean;
};
export const Notification = () => {
  const notification = useStore((state) => state.notification);
  const set = useStore((state) => state.setNotification);
  const hide = useStore((state) => state.hideNotification);

  useEffect(() => {
    fetch(`${getServerUrl()}/notification`)
      .then((res) => res.json())
      .then((res) => {
        if (res.id !== notification?.id) set(res);
      });
  }, []);
  if (!notification || notification.hide) return null;
  return (
    <div
      className="absolute top-0 left-0 p-2 text-white w-full text-center flex items-center justify-between text-sm opacity-90 cursor-pointer"
      style={{ background: notification.color }}
      onClick={hide}
    >
      <p>{notification.message}</p>
      <button>
        <IoIosClose className="text-xl" />
      </button>
    </div>
  );
};
