import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ImagePreviewProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export default function ImagePreview({ src, alt, caption, className = "" }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!src) return null;

  return (
    <>
      <Card className={`cursor-pointer hover:shadow-md transition-shadow ${className}`}>
        <CardContent className="p-2">
          <div className="relative group">
            <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
              {!imageError ? (
                <img 
                  src={src} 
                  alt={alt}
                  className={`w-full h-full object-cover transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  onClick={() => setIsOpen(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Eye className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Image not found</p>
                  </div>
                </div>
              )}
              
              {!imageError && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsOpen(true)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              )}
            </div>
            
            {caption && (
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                {caption}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{alt}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center justify-center max-h-[70vh] overflow-hidden">
            <img 
              src={src} 
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
          
          {caption && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <p className="text-sm">{caption}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}