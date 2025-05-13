
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Wifi, ArrowDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Server } from '@/components/ServerSelection';
import { toast } from 'sonner';

const Servers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [connectedServer, setConnectedServer] = useState<Server | null>(null);
  
  // Mock servers data - extended list
  const allServers: Server[] = [
    { id: "1", name: "Tokyo", location: "Japan", latency: 78, load: 42 },
    { id: "2", name: "New York", location: "United States", latency: 105, load: 35 },
    { id: "3", name: "London", location: "United Kingdom", latency: 92, load: 28 },
    { id: "4", name: "Sydney", location: "Australia", latency: 145, load: 22 },
    { id: "5", name: "Singapore", location: "Singapore", latency: 65, load: 47 },
    { id: "6", name: "Paris", location: "France", latency: 88, load: 39 },
    { id: "7", name: "Toronto", location: "Canada", latency: 110, load: 31 },
    { id: "8", name: "Berlin", location: "Germany", latency: 97, load: 43 },
    { id: "9", name: "Seoul", location: "South Korea", latency: 85, load: 50 }
  ];

  // Filter servers based on search term
  const filteredServers = allServers.filter(server => 
    server.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    server.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle connect to server
  const handleConnect = (server: Server) => {
    if (connectedServer && connectedServer.id === server.id) {
      // Disconnect
      setConnectedServer(null);
      toast.info(`Disconnected from ${server.name} server`);
    } else {
      // Connect to new server
      if (connectedServer) {
        toast.info(`Switching from ${connectedServer.name} to ${server.name}...`);
      } else {
        toast.info(`Connecting to ${server.name}...`);
      }
      
      setTimeout(() => {
        setConnectedServer(server);
        toast.success(`Connected to ${server.name} server`);
      }, 800);
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 text-gradient">Server Locations</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search servers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader className="bg-gradient-to-r from-secondary to-secondary/50">
          <CardTitle className="flex justify-between items-center">
            <span>Available Servers</span>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="mr-2">Sort by:</span>
              <Button variant="outline" size="sm" className="mr-2">Latency</Button>
              <Button variant="ghost" size="sm">Location</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServers.length > 0 ? (
              filteredServers.map(server => {
                const isConnected = connectedServer && connectedServer.id === server.id;
                return (
                  <div
                    key={server.id}
                    className={cn(
                      "p-4 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors",
                      isConnected && "border-primary/50 bg-primary/5"
                    )}
                  >
                    <div className="flex justify-between items-start mb-3">
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
                          <p className="text-sm text-muted-foreground">{server.location}</p>
                        </div>
                      </div>
                      <Button 
                        variant={isConnected ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleConnect(server)}
                        className={cn(isConnected && "border-primary text-primary hover:bg-primary/5")}
                      >
                        {isConnected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center text-sm">
                        <ArrowDown className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">Latency:</span>
                        <span>{server.latency} ms</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Wifi className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground mr-1">Load:</span>
                        <span>{server.load}%</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 py-10 text-center text-muted-foreground">
                No servers found matching "{searchTerm}"
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Servers;
