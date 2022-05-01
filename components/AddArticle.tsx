import type { NextPage } from "next";
import { useRouter } from "next/router";
import { articlesApi, revalidateApi } from "../Api/Api";
import styles from "../styles/Technology.module.scss";

interface Props {
  topic: {
    _id: string;
    technology: string;
    header: string;
    list: {
      name: string;
      ref: string;
    }[];
  };
}
export const AddArticle: NextPage<Props> = ({ topic }) => {
  const router = useRouter();
  return (
    <div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          const req = async () => {
            try {
              const response = await articlesApi.addArticle(`${topic._id}`, {
                name: e.target[0].value,
                ref: e.target[1].value,
              });
              console.log(response.data);
              const res2 = await revalidateApi.revalidate(`/${topic.technology}`);
              console.log(res2.data);
              router.reload();
            } catch (error: any) {
              console.log(error.response.data.message);
              alert(error);
            }
          };
          req();
        }}
      >
        <input required type="text" placeholder="name" />
        <input required type="text" placeholder="ref" />
        <button type="submit">add one article</button>
      </form>
    </div>
  );
};
