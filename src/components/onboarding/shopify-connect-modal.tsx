import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ShoppingBag } from 'lucide-react';
import { trpc } from '@/app/_providers/trpc-provider';

interface ShopifyConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
}

interface ShopifyConnectResponse {
  authUrl: string;
  platform: string;
}

export function ShopifyConnectModal({ isOpen, onClose, workspaceId }: ShopifyConnectModalProps) {
  const [shopUrl, setShopUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // @ts-ignore
  const initShopifyConnect = trpc.initShopifyConnect.useMutation({
    onSuccess: (data: ShopifyConnectResponse) => {
      setIsLoading(false);
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        setError('Failed to generate authentication URL');
      }
    },
    onError: (error: { message: string }) => {
      setIsLoading(false);
      setError(error.message);
    }
  });
  
  const handleConnect = () => {
    setError(null);
    
    // Basic validation
    if (!shopUrl) {
      setError('Please enter your shop URL');
      return;
    }
    
    // Format the shop URL if needed
    let formattedUrl = shopUrl.trim();
    if (!formattedUrl.endsWith('.myshopify.com')) {
      // If they just entered the shop name, add the domain
      if (!formattedUrl.includes('.')) {
        formattedUrl = `${formattedUrl}.myshopify.com`;
      } else {
        setError('Please enter a valid Shopify URL (e.g., your-shop.myshopify.com)');
        return;
      }
    }
    
    // Remove https:// or http:// if included
    formattedUrl = formattedUrl.replace(/^https?:\/\//, '');
    
    setIsLoading(true);
    initShopifyConnect.mutate({
      shopUrl: formattedUrl,
      workspaceId
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-orange-100 p-3">
              <ShoppingBag className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <DialogTitle className="text-center">Connect Your Shopify Store</DialogTitle>
          <DialogDescription className="text-center">
            Enter your Shopify store URL to connect and import your sales data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shop-url">Shop URL</Label>
              <Input
                id="shop-url"
                placeholder="your-store.myshopify.com"
                value={shopUrl}
                onChange={(e) => setShopUrl(e.target.value)}
                disabled={isLoading}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            onClick={handleConnect}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Shopify'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 