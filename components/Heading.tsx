import { Typography } from "@/components/mui/index";
import { ReactNode } from "react";

interface HeadingProps {
  component?: React.ElementType;
  children: ReactNode;
  variant:any;
}

const Heading:React.FC<HeadingProps> = ({ component = "h1", variant, children, ...props }) => {
  return (
    <Typography component={component} variant={variant || component} {...props}>
      {children}
    </Typography>
  );
};

export default Heading;