import { Typography } from '@/components/mui/index';
import { ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode;
}
const Paragraph:React.FC<ParagraphProps> = ({ children, ...props }) => {
  return (
    <Typography paragraph {...props}>
      {children}
    </Typography>
  );
};

export default Paragraph;