import HeaderSection from "../header/index";
import FooterSection from "../footer/index";

export default function index(props) {
  const { children } = props;
  return (
    <div className="flex flex-col h-screen border-2 border-black">
      <HeaderSection />
      <div className="h-full">{children}</div>
      <FooterSection />
    </div>
  );
}
