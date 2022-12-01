import React from 'react';
import Box from '@mui/material/Box';
interface FinanceProps {
  property: string;
}

const Finance: React.FC<FinanceProps> = ({ property }) => {
  return (
    <React.Fragment>
      <Box><img src={property}/></Box>
    </React.Fragment>
  );
};

export default Finance;
