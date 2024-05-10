import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="h-screen bg-gray-50">
      <div className="grid place-items-center h-full">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl text-primary">
            Welcome to our Feedback System
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga
            ducimus numquam ea!
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <Link to="/reviews" className="">
              <Button className="text-md w-full">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant={"outline"} className="text-md w-full">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
