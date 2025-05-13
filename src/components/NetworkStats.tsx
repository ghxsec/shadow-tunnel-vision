
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Clock } from 'lucide-react';

interface NetworkStatsProps {
  download: number;
  upload: number;
  connectionTime: number;
  dataUsed: number;
  isConnected: boolean;
}

const NetworkStats: React.FC<NetworkStatsProps> = ({
  download,
  upload,
  connectionTime,
  dataUsed,
  isConnected
}) => {
  // Format connection time (seconds to HH:MM:SS)
  const formatTime = (seconds: number): string => {
    if (!isConnected) return '--:--:--';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format data (bytes to appropriate unit)
  const formatData = (bytes: number): string => {
    if (!isConnected) return '0 KB';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <Card className="glass-card">
      <CardHeader className="bg-gradient-to-r from-secondary to-secondary/50">
        <CardTitle>Network Statistics</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-secondary/50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <ArrowDown className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm text-muted-foreground">Download</span>
            </div>
            <p className="text-lg font-medium">{isConnected ? `${download} Mbps` : "-- Mbps"}</p>
          </div>
          <div className="bg-secondary/50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <ArrowUp className="h-4 w-4 mr-2 text-accent" />
              <span className="text-sm text-muted-foreground">Upload</span>
            </div>
            <p className="text-lg font-medium">{isConnected ? `${upload} Mbps` : "-- Mbps"}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary/50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Connection Time</span>
            </div>
            <p className="text-lg font-medium">{formatTime(connectionTime)}</p>
          </div>
          <div className="bg-secondary/50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <span className="h-4 w-4 mr-2 text-muted-foreground">📊</span>
              <span className="text-sm text-muted-foreground">Data Used</span>
            </div>
            <p className="text-lg font-medium">{formatData(dataUsed)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStats;
