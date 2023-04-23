import { ResponsivePie } from '@nivo/pie'
import { useTheme } from '@mui/material'; 
import { tokens } from '../theme';
import { useState, useEffect } from 'react'
//import { mockPieData as data } from '../scenes/data/mockData';

const PieChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/api/sendFront/pizza");
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
    return (
        <ResponsivePie
        data={data}
        theme={{
            tooltip: {
                container: {
                    background: colors.primary[400],
                    color: "#fff",
                    fontSize: 14
                }
            },

            axis: {
                domain: {
                    line: {
                        stroke: colors.grey[100]
                    }
                },
                legend: {
                    text: {
                        fill: colors.grey[100]
                    }
                },
                ticks: {
                    line: {
                        stroke: colors.grey[100],
                        strokeWdith: 1
                        },
                    text: {
                        fill: colors.grey[100]
                        }
                    }
                },
                legends: {
                    text: {
                        fill: colors.grey[100]
                    }
                }
            }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
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
        legends={isDashboard ? [] : [
          {
            anchor: 'right',
            direction: 'column',
            justify: true,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: colors.grey[100],
            itemDirection: 'right-to-left',
            itemOpacity: 1,
            symbolSize: 20,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
    />
        )

};

export default PieChart;