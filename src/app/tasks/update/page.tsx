import { GetTask } from "@/app/actions/action";
import { Suspense } from "react";
import UpdateForm from "../_components/update-form";

const Form = async ({ ID }: { ID: string }) => {
  const response = await GetTask(ID);
  const data = response.result;
  return data ? <UpdateForm ID={ID} data={data} /> : "No data found!";
};

const Page = ({ searchParams }: { searchParams: any }) => {
  return (
    <section className="container">
      <h3 className="pb-[32px]">Create new task</h3>
      <Suspense fallback={<>Loadding...</>}>
        <Form ID={searchParams.id} />
      </Suspense>
    </section>
  );
};

export default Page;
