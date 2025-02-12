import { Helmet } from "react-helmet-async";

type MetaProps = {
  title: string;
  content: string;
};

const MetaData = ({ title, content }: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
  );
};
export default MetaData;
