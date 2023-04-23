import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useState, useEffect } from 'react';
//import { mockBarData as data } from "../scenes/data/mockData";

// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);

    useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch("http://127.0.0.1:5000/api/sendFront/consumoBarChartByYear");
              let data = await response.text();
              data = JSON.parse(data);
              setData(data);
              return data;
            } catch (error) {
              console.log(error);
              return null;
            }
          };
          fetchData();
        }, []);
    return(
      <ResponsiveBar
        data={data}
        theme={{
          // added
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              background: "#16263D",
              color: '#fff',
            },
          },
        }}
        keys={[
          'COMERCIAL',
          'DOMESTICO BAJA',
          'DOMESTICO MEDIO',
          'DOMESTICO RESIDENCIAL',
          'ESPECIAL',
          'INDUSTRIAL',
          'SOCIAL'
        ]}
        indexBy="ANO"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  5
              ]
          ]
      }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: 'COMERCIAL'
            },
            id: data.find(d => d['COMERCIAL' + 'color'])
          },
          {
            match: {
              id: 'DOMESTICO BAJA'
            },
            id: data.find(d => d['DOMESTICO BAJA' + 'color'])
          },
          {
            match: {
              id: 'DOMESTICO MEDIO'
            },
            id: data.find(d => d['DOMESTICO MEDIO' + 'color'])
          },
          {
            match: {
              id: 'DOMESTICO RESIDENCIAL'
            },
            id: data.find(d => d['DOMESTICO RESIDENCIAL' + 'color'])
          },
          {
            match: {
              id: 'ESPECIAL'
            },
            id: data.find(d => d['ESPECIAL' + 'color'])
          },
          {
            match: {
              id: 'INDUSTRIAL'
            },
            id: data.find(d => d['INDUSTRIAL' + 'color'])
          },
          {
            match: {
              id: 'SOCIAL'
            },
            id: data.find(d => d['SOCIAL' + 'color'])
          }
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'ANO',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        role="application"
        ariaLabel="TCC sobre ETL e GCP"
        barAriaLabel={function(e){return e.data+":"+e.formattedValue+"Ano: "+e.value}}
        />
    )

}


export default BarChart;