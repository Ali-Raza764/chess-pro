import dynamic from "next/dynamic";
const Analysis = dynamic(() => import("./Analysis"), {
  loading: () => <p>Loading Analysis Board</p>,
  ssr: false,
});
const AnalysisPage = () => {
  return (
    <main className="min-h-screen w-full p-6">
      <Analysis />
    </main>
  );
};

export default AnalysisPage;
