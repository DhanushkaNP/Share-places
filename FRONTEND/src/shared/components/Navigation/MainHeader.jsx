import "./MainHeader.css";

function MainHeader(props) {
  return (
    <header className="bg-secondary h-20 z-10 flex flex-initial">
      {props.children}
    </header>
  );
}

export default MainHeader;
