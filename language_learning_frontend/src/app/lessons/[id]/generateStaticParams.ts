export default async function generateStaticParams() {
  // Provide IDs matching our mock dataset to support output: export
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
