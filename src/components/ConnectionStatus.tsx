
import React from 'react';
import { Shield, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ConnectionStatusProps {
  connected: boolean;
  onToggleConnection: () => void;
  location?: string;
  ip?: string;
  latency?: number;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  connected,
  onToggleConnection,
  location = 'Not connected',
  ip = '—',
  latency = 0,
}) => {
  return (
    <Card className={cn("glass-card overflow-hidden", connected && "border-primary/40")}>
      <CardHeader className={cn(
        "bg-gradient-to-r from-secondary to-secondary/50 pb-8",
        connected && "from-primary/20 to-primary/5"
      )}>
        <CardTitle className="flex justify-between items-center">
          <span>Connection Status</span>
          <Button 
            onClick={onToggleConnection}
            variant={connected ? "destructive" : "default"}
            className={cn(connected && "bg-primary hover:bg-primary/90")}
          >
            {connected ? "Disconnect" : "Connect"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-4">
        <div className="flex flex-col items-center pt-4 pb-6">
          <div className={cn(
            "h-20 w-20 rounded-full flex items-center justify-center mb-4",
            connected ? "animate-pulse-glow bg-primary/10" : "bg-destructive/10"
          )}>
            {connected ? (
              <Shield className="h-10 w-10 text-primary" />
            ) : (
              <ShieldOff className="h-10 w-10 text-destructive" />
            )}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">
              {connected ? "Protected" : "Not Protected"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {connected ? `Connected to ${location}` : "Your connection is not secure"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">IP Address</p>
            <p className="font-medium">{ip}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">Latency</p>
            <p className="font-medium">
              {connected ? `${latency} ms` : "—"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionStatus;
