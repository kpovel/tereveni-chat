import Introduce from "./introduce";

export default function IntroduceYourself() {
  return (
    <div className="container mx-auto max-w-md px-6">
      <h2 className="mt-20 text-center text-lg font-medium text-neutral-50 ">
        Introduce yourself to the community
      </h2>
      <p className="mt-5 text-center font-main text-sm font-normal leading-tight text-neutral-50">
        Craft a friendly and genuine introduction that reflects your personality
        and interests
      </p>
      <Introduce />
    </div>
  );
}
