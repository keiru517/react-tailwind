import Nav from "../../Nav";

export default function Layout(props) {
  return (
    <>
      <Nav></Nav>
      <div className="p-[20px_26px_51px_26px] flex flex-col flex-grow">
        {props.children}
      </div>
    </>
  );
}
