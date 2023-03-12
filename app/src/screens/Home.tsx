import { MessageType, useMessages, usePerson, usePrompt, useStore } from "../hooks/useStore";
import { Markdown } from "../components/Markdown";
import { Input } from "../components/Input";
import { IoIosMenu } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import { defaultPersonImage } from "../config";
import { Settings } from "./Settings";

export const Home = () => {
  const personId = useStore((s) => s.personId);
  return (
    <div className="h-screen w-screen flex bg-base-100 ">
      <SidePanel />
      <div className="flex flex-col w-full h-full">
        <TopBar />
        {personId === "new" ? <New /> : <Messages />}
      </div>
    </div>
  );
};

const SidePanel = () => {
  const allPersons = useStore((s) => s.allPersons);
  const personId = useStore((s) => s.personId);
  const setPersonId = useStore((s) => s.setPersonId);
  return (
    <div
      className={`bg-base-300 ${
        personId ? "hidden" : "flex"
      } md:flex w-full md:w-[300px] absolute md:relative h-full flex flex-col justify-between overflow-hidden `}
    >
      <div className="flex flex-col overflow-auto">
        <div className="h-12 w-full p-2">
          <button
            onClick={() => setPersonId("new")}
            className="shadow-sm bg-base-100 rounded-lg text-center hover:scale-105 duration-150 h-full w-full"
          >
            Add New Chat
          </button>
        </div>

        {allPersons.map((p) => (
          <OnePerson key={p} id={p} />
        ))}
      </div>
      <Settings />
    </div>
  );
};

const TopBar = () => {
  const person = usePerson();
  const clearChat = useStore((s) => s.clearMessages);
  const setPerson = useStore((s) => s.setPersonId);
  const personId = useStore((s) => s.personId);
  return (
    <div className=" bg-base-300 flex justify-between items-center px-3 h-12">
      <IoIosMenu className="h-[24px] w-[24px] md:invisible cursor-pointer" onClick={() => setPerson()} />
      <p className="text-xl">{personId !== "new" ? person?.name : "Add New Chat"}</p>
      <VscDebugRestart onClick={clearChat} className={`h-[24px] w-[24px] cursor-pointer ${personId === "new" ? "invisible" : ""}`} />
    </div>
  );
};

const OnePerson = ({ id }: { id: string }) => {
  const person = usePerson(id);
  const setPersonId = useStore((s) => s.setPersonId);
  const personId = useStore((s) => s.personId);
  if (!person) return null;
  return (
    <li
      key={person.id}
      onClick={() => setPersonId(person.id)}
      className={`cursor-pointer flex space-x-2 p-2 ${person.id === personId ? "bg-primary" : "hover:bg-primary hover:bg-opacity-40"}`}
    >
      <img src={person.image || defaultPersonImage} alt={person.name} className="h-10 w-10 object-cover rounded-full" />
      <div className="flex flex-col overflow-hidden justify-between">
        <p className="whitespace-nowrap">{person.name}</p>
        <p className="whitespace-nowrap text-sm">{[...person.messages].pop()?.content}</p>
      </div>
    </li>
  );
};
const New = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <h1 className="text-2xl text-center">Add New Chat</h1>
    </div>
  );
};
const Messages = () => {
  const messages = useMessages();
  const prompt = usePrompt();

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden p-2">
      {!!messages.length && (
        <div className="h-full overflow-auto flex flex-col-reverse no-scrollbar">
          {[...messages].reverse().map((m) => (
            <Message key={m.id} {...m} />
          ))}
        </div>
      )}
      {!messages.length && (
        <div className=" h-full flex items-center justify-center">
          <textarea value={prompt} className="textarea mx-[10%] h-[50%] resize-none" readOnly />
        </div>
      )}

      <Input />
    </div>
  );
};

const Message = ({ content, role }: MessageType) => {
  return (
    <div className={`p-2 rounded-lg my-1 ${role === "user" ? "text-right bg-primary text-primary-content" : "text-left bg-base-300"}`}>
      {content ? <Markdown>{content}</Markdown> : <div>...</div>}
    </div>
  );
};
