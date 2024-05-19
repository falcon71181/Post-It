import { FormPostCard } from "@/components/community-form/FormPostCard";
import { PlusIcon } from "@radix-ui/react-icons";

type FormPostCardProps = {
  title: string,
  description: string
}

const dumy: FormPostCardProps = {
  title: "dummy title",
  description: "fdummmy description kffkkfkfk fk",
}

export default function Home() {
  return (
    <main className="text-2xl p-5 flex justify-center items-center">
      <div className="w-10/12 flex flex-col gap-5 items-center">
        <div className="w-2/3 flex justify-between font-caveat text-center text-4xl px-5 py-8 tracking-wide">
          <h1>Community Forum</h1>
          <CreatePost />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <FormPostCard PostData={dumy} />
        </div>
      </div>
    </main>
  );
}

const CreatePost = () => {
  return (
    <div className="font-semibold cursor-pointer font-sans tracking-normal text-lg flex justify-center items-center rounded-md px-3 gap-2 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground border border-accent">
      <PlusIcon className="text-xl" />
      <h1 className="text-sm">Create Post</h1>
    </div>
  )
}
