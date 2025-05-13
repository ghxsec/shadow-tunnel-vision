
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, ArrowRight, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Server {
  id: string;
  name: string;
  location: string;
  latency: number;
  load: number;
}

interface ServerSelectionProps {
  servers: Server[];
  onSelectServer: (server: Server) => void;
  connectedServer?: Server | null;
}

const ServerSelection: React.FC<ServerSelectionProps> = ({
  servers,
  onSelectServer,
  connectedServer = null,
}) => {
  const topServers = servers.slice(0, 3);

  return (
    <Card className="glass-card">
      <CardHeader className="bg-gradient-to-r from-secondary to-secondary/50">
        <CardTitle className="flex justify-between items-center">
          <span>Quick Connect</span>
          <Button variant="outline" size="sm" asChild>
            <a href="/servers">View All <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {topServers.map(server => {
            const isConnected = connectedServer && connectedServer.id === server.id;
            return (
              <li 
                key={server.id}
                className={cn(
                  "p-3 rounded-lg border border-border/50 flex items-center justify-between hover:bg-secondary/30 transition-colors",
                  isConnected && "border-primary/50 bg-primary/5"
                )}
              >
                <div className="flex items-center">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center mr-3",
                    isConnected ? "bg-primary/10" : "bg-secondary"
                  )}>
                    <Globe className={cn(
                      "h-5 w-5",
                      isConnected ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <p className="font-medium">{server.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{server.location}</span>
                      <span className="mx-2">•</span>
                      <span>{server.latency} ms</span>
                      <span className="mx-2">•</span>
                      <Wifi className="h-3 w-3 mr-1" />
                      <span>{server.load}%</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant={isConnected ? "outline" : "default"} 
                  size="sm" 
                  onClick={() => onSelectServer(server)}
                  className={cn(isConnected && "border-primary text-primary hover:bg-primary/5")}
                >
                  {isConnected ? "Connected" : "Connect"}
                </Button>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ServerSelection;
