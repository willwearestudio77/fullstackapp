import { Typography } from '@/components/mui/index';

const Paragraph = ({ children, ...props }) => {
  return (
    <Typography paragraph {...props}>
      {children}
    </Typography>
  );
};

export default Paragraph;