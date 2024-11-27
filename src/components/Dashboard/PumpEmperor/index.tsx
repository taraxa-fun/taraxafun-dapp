import { UserEmperor } from "./userEmperor";

export const PumpEmperor = () => {
  return (
    <section className=" pt-24 lg:w-6/12 w-12/12 md:w-8/12  flex flex-col items-center justify-center mx-auto">
      <h2 className="knewave text-[40px] text-center mb-8 bg-gradient-to-b from-[#D6C8FF] to-[#8100FB] text-transparent bg-clip-text title-shadow">
        Pump Emperor
      </h2>
      <UserEmperor />
    </section>
  );
};
