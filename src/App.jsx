import { Suspense, lazy } from "react";
// import LazyLol from "./components/LazyLol";
const LazyLol = lazy(() => import("./components/LazyLol"));

const App = () => {
  return (
    <>
      <section>
        <Suspense fallback={<p>Loading Page! Please Wait</p>}>
          <LazyLol />
        </Suspense>
      </section>
    </>
  );
};

export default App;
