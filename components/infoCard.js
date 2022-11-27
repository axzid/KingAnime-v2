export default function InfoCard({ title, value }) {
  return (
    <>
      <h2>
        <span className="font-bold">{title}</span> {value}
      </h2>
    </>
  );
}
