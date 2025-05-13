
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SpeedData {
  time: string;
  download: number;
  upload: number;
}

interface SpeedChartProps {
  data: SpeedData[];
  isConnected: boolean;
}

const SpeedChart: React.FC<SpeedChartProps> = ({ data, isConnected }) => {
  return (
    <Card className="glass-card">
      <CardHeader className="bg-gradient-to-r from-secondary to-secondary/50">
        <CardTitle>Connection Speed</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isConnected ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} 
                  unit=" Mbps"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))' 
                  }}
                  labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="download" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorDownload)" 
                  name="Download"
                />
                <Area 
                  type="monotone" 
                  dataKey="upload" 
                  stroke="hsl(var(--accent))" 
                  fillOpacity={1} 
                  fill="url(#colorUpload)" 
                  name="Upload"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">Connect to view speed statistics</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpeedChart;
