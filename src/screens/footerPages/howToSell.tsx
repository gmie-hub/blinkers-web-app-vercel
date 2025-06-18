import RouteIndicator from "../../customs/routeIndicator/index.tsx";
import { useCms } from "../../hooks/getCms.tsx";
import DOMPurify from "dompurify";

const HowToSell = () => {
  const { data } = useCms();

  const cmsItem = data?.data?.data?.find((item: any) => item.id === 10);

  const cmsData = cmsItem?.description;
  const cmsDataTitle = cmsItem?.title;

  const Description = ({ description }: { description: string }) => {
    // Sanitize the HTML to prevent XSS attacks
    const sanitizedDescription = DOMPurify.sanitize(description);

    return (
      <div
        style={{ paddingInlineStart: "1rem" }}
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    );
  };

  return (
    <div className="wrapper">
      <RouteIndicator showBack />
      <h3>{cmsDataTitle}</h3>
      <br />
      <p>{<Description description={cmsData || ""} />}</p>
    </div>
  );
};
export default HowToSell;
