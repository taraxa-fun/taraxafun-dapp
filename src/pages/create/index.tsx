import { CreateToken } from "@/components/Create/createToken";
import { Navbar } from "@/components/Navbar/navbar";
import { NextPage } from "next";

const Create: NextPage = () => {
  return (
<div className="relative min-h-screen ">
  <Navbar />
  <CreateToken />
</div>
  );
};

export default Create;
