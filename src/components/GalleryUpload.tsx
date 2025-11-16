import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload, Image as ImageIcon, Plus } from 'lucide-react';

interface GalleryImage {
  url: string;
  caption: string;
  file?: File; // Store file for later upload
}

interface GalleryUploadProps {
  label: string;
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
}

export default function GalleryUpload({ label, images, onChange }: GalleryUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages: GalleryImage[] = [];
    
    // Create previews for each file
    files.forEach(file => {
      const previewUrl = URL.createObjectURL(file);
      newImages.push({ 
        url: previewUrl, 
        caption: '',
        file: file // Store file for later upload
      });
    });
    
    // Add previews to existing images
    onChange([...images, ...newImages]);
    
    // Clear input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateCaption = (index: number, caption: string) => {
    const updated = [...images];
    updated[index].caption = caption;
    onChange(updated);
  };

  const removeImage = (index: number) => {
    const imageToRemove = images[index];
    if (imageToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.url);
    }
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {label && <Label>{label}</Label>}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Images
        </Button>
      </div>

      {images.length === 0 ? (
        <div 
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-4">
            No gallery images yet. Click to add images.
          </p>
          <Button type="button" variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Select Images
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="relative">
                    <div className="aspect-video rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
                      <img 
                        src={image.url} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    {image.url.startsWith('blob:') && (
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Preview
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-xs">Image Caption</Label>
                    <Textarea
                      value={image.caption}
                      onChange={(e) => updateCaption(index, e.target.value)}
                      placeholder="Add a caption for this image..."
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}