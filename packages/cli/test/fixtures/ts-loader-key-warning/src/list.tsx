export default function List() {
  const props = { key: "a" };
  return (
    <div>
      <div {...props}>a</div>
    </div>
  );
}
