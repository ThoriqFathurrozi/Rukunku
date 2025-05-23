export default function SimpleCard({ children, ...props }) {
  return (
    <div
      className="bg-white shadow-lg rounded-xl px-6 min-w-[24rem] py-4 my-4 hover:shadow-2xl transition-shadow duration-300"
      {...props}
    >
      {children}
    </div>
  );
}
