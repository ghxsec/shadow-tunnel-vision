
import React, { useState, useEffect } from 'react';
import ConnectionStatus from '@/components/ConnectionStatus';
import ServerSelection, { Server } from '@/components/ServerSelection';
import NetworkStats from '@/components/NetworkStats';
import SpeedChart from '@/components/SpeedChart';
import { toast } from 'sonner';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [connectionTime, setConnectionTime] = useState(0);
  const [dataUsed, setDataUsed] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [speedHistory, setSpeedHistory] = useState<Array<{time: string, download: number, upload: number}>>([]);

  // Mock servers data
  const servers: Server[] = [
    {
      id: "1",
      name: "Tokyo",
      location: "Japan",
      latency: 78,
      load: 42
    },
    {
      id: "2",
      name: "New York",
      location: "United States",
      latency: 105,
      load: 35
    },
    {
      id: "3",
      name: "London",
      location: "United Kingdom",
      latency: 92,
      load: 28
    }
  ];

  // Handle connection toggle
  const handleConnectionToggle = () => {
    if (!isConnected && !selectedServer) {
      // If trying to connect without a selected server, select the first one
      handleServerSelect(servers[0]);
      setTimeout(() => setIsConnected(true), 300);
    } else {
      setIsConnected(!isConnected);
      if (isConnected) {
        // Disconnecting
        toast.info("Disconnected from VPN server");
        setConnectionTime(0);
        setDataUsed(0);
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setSpeedHistory([]);
      } else {
        // Connecting
        toast.success(`Connected to ${selectedServer?.name}`);
      }
    }
  };

  // Handle server selection
  const handleServerSelect = (server: Server) => {
    if (server.id === selectedServer?.id) return;
    
    setSelectedServer(server);
    
    if (isConnected) {
      // Switch servers if already connected
      setIsConnected(false);
      toast.info(`Switching to ${server.name} server...`);
      setTimeout(() => {
        setIsConnected(true);
        toast.success(`Connected to ${server.name} server`);
      }, 1000);
    } else {
      toast.info(`Selected ${server.name} server`);
    }
  };

  // Update connection time and generate random network stats when connected
  useEffect(() => {
    let timer: number;
    if (isConnected) {
      timer = window.setInterval(() => {
        setConnectionTime(prev => prev + 1);
        setDataUsed(prev => prev + Math.floor(Math.random() * 100000));
        
        // Generate random speed values
        const newDownload = Math.floor(50 + Math.random() * 100);
        const newUpload = Math.floor(20 + Math.random() * 40);
        
        setDownloadSpeed(newDownload);
        setUploadSpeed(newUpload);
        
        // Update speed history
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        setSpeedHistory(prev => {
          const newHistory = [...prev, { time: timeString, download: newDownload, upload: newUpload }];
          if (newHistory.length > 10) {
            return newHistory.slice(1); // Keep only the last 10 records
          }
          return newHistory;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isConnected]);

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 text-gradient">VPN Dashboard</h1>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-6">
            <ConnectionStatus 
              connected={isConnected}
              onToggleConnection={handleConnectionToggle}
              location={selectedServer?.location}
              ip={isConnected ? "192.168.x.x" : undefined}
              latency={selectedServer?.latency}
            />
            <ServerSelection 
              servers={servers}
              onSelectServer={handleServerSelect}
              connectedServer={isConnected ? selectedServer : null}
            />
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6">
            <NetworkStats 
              download={downloadSpeed}
              upload={uploadSpeed}
              connectionTime={connectionTime}
              dataUsed={dataUsed}
              isConnected={isConnected}
            />
            <SpeedChart 
              data={speedHistory}
              isConnected={isConnected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
