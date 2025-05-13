
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Settings = () => {
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };
  
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 text-gradient">Settings</h1>
        <Button onClick={handleSaveSettings}>Save Changes</Button>
      </div>

      <div className="grid gap-6 grid-cols-1">
        <Card className="glass-card">
          <CardHeader className="bg-gradient-to-r from-secondary to-secondary/50">
            <CardTitle>Connection Settings</CardTitle>
            <CardDescription>Configure how your VPN connects to the internet</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Auto-connect on startup</h3>
                  <p className="text-sm text-muted-foreground">Automatically connect to VPN when app starts</p>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Kill Switch</h3>
                  <p className="text-sm text-muted-foreground">Block all internet traffic if VPN unexpectedly disconnects</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">DNS Leak Protection</h3>
                  <p className="text-sm text-muted-foreground">Prevent DNS requests from leaking outside the VPN tunnel</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">VPN Protocol</h3>
                <p className="text-sm text-muted-foreground mb-2">Select which protocol to use for VPN connections</p>
                <Select defaultValue="wireguard">
                  <SelectTrigger className="w-full md:w-[250px]">
                    <SelectValue placeholder="Select protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wireguard">WireGuard</SelectItem>
                    <SelectItem value="openvpn">OpenVPN</SelectItem>
                    <SelectItem value="ikev2">IKEv2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="bg-gradient-to-r from-secondary to-secondary/50">
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Control your data and privacy preferences</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Block Trackers</h3>
                  <p className="text-sm text-muted-foreground">Block known trackers and malicious websites</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Split Tunneling</h3>
                  <p className="text-sm text-muted-foreground">Choose which apps use the VPN connection</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Usage Statistics</h3>
                  <p className="text-sm text-muted-foreground">Share anonymous usage data to improve our service</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="bg-gradient-to-r from-secondary to-secondary/50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your subscription and account details</CardDescription>
              </div>
              <Badge className="bg-primary/80">Pro Plan</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-1">Email Address</h3>
                <p className="text-sm">user@example.com</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Subscription</h3>
                <div className="flex items-center">
                  <p className="text-sm">Pro Plan · Renews on May 13, 2026</p>
                  <Button variant="link" size="sm" className="text-primary ml-2">Manage</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mb-2">Add an extra layer of security to your account</p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
