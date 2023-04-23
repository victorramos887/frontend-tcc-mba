import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import PieChart from '../../components/PieChart';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TCC" subtitle="Consumos(m³) Anual" />

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >

          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Consumo por categoria
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
        </Box>

        {/* Pie Chart */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Typography variant="h4" fontWeight="600" color={colors.grey[100]}>
                Consumos
              </Typography>
            </Box>
          </Box>

          <Box height="300px" mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;